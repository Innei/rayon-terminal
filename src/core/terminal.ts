import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { SearchAddon } from 'xterm-addon-search'
import { ITheme } from '../types/theme'
import { base64ToUint8Array } from '../utils'
import { changeDarkTheme } from './chanage-theme'
import { getTheme, storageTheme } from './storage'
import { registerOnWindow } from './webkit-window'

export const fitAddon = new FitAddon()
export const searchAddon = new SearchAddon()

Terminal.prototype.writeBase64 = function (this: Terminal, base64: string) {
  this.write(base64ToUint8Array(base64))
}

const storagesTheme = getTheme()

export const terminal = new Terminal({
  allowTransparency: true,
  theme: {
    background: 'transparent',
  },
  rendererType: 'dom',
  fontFamily: storagesTheme?.fontFamily || 'monospace',
  fontSize: storagesTheme?.fontSize || 16,
})

terminal.loadAddon(fitAddon)
terminal.loadAddon(searchAddon)

terminal.onTitleChange((title) => {
  const message = { magic: 'title', msg: title }

  window.webkit?.messageHandlers.callbackHandler.postMessage(message)
})
terminal.onData((data) => {
  const message = { magic: 'data', msg: data }

  window.webkit?.messageHandlers.callbackHandler.postMessage(message)
})

changeDarkTheme(
  terminal,
  window.matchMedia('(prefers-color-scheme: dark)').matches,
)

window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', (ev) => {
    if (ev.matches) {
      changeDarkTheme(terminal, true)
    } else {
      changeDarkTheme(terminal, false)
    }
  })

registerOnWindow()

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
}
