import { Terminal } from 'xterm'
import { ITheme } from '../types/theme'
import { featureManager } from './feature-manager'
import { storageTheme } from './storage'
import { fitAddon, terminal } from './terminal'

export function registerOnWindow(terminal: Terminal) {
  window.fit = () => {
    fitAddon.fit()
  }
  window.term = terminal
  window.terminal = terminal

  window.send = (text: string) => {
    const message = { magic: 'command', msg: text }

    window.webkit?.messageHandlers.callbackHandler.postMessage(message)
  }

  let memoStyles: HTMLStyleElement | null = null

  window.setTheme = (theme: ITheme) => {
    const styles = document.createElement('style')

    const { fontFamily, fontSize, ...rest } = theme
    styles.innerHTML = `
  .xterm-rows {
    
  }`

    if (fontFamily) {
      terminal.options.fontFamily = fontFamily
    }
    if (fontSize) {
      terminal.options.fontSize = fontSize
    }

    document.head.appendChild(styles)

    if (memoStyles) {
      memoStyles.remove()
    }
    memoStyles = styles

    storageTheme(theme)
    terminal.refresh(0, terminal.rows - 1)
  }

  window.manager = featureManager
}

declare global {
  interface Window {
    manager: typeof featureManager
    webkit?: {
      messageHandlers: {
        callbackHandler: {
          postMessage(message: any): void
        }
      }
    }
    fit: () => void
  }
}
