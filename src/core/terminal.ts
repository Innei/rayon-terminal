import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { SearchAddon } from 'xterm-addon-search'
import { base64ToUint8Array, isInWebkitView } from '../utils'
import { changeDarkTheme } from './chanage-theme'
import { getTheme } from './storage'
import { registerOnWindow } from './webkit-window'
import { version } from '../../package.json'
export const fitAddon = new FitAddon()
export const searchAddon = new SearchAddon()

declare module 'xterm' {
  export interface Terminal {
    writeBase64(str: string): void
  }
}

Terminal.prototype.writeBase64 = function (this: Terminal, base64: string) {
  this.write(base64ToUint8Array(base64))
}

export const terminal: Terminal = (() => {
  const storagesTheme = getTheme()

  const terminal = new Terminal({
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
    if (!isInWebkitView) {
      terminal.write(data)
    }
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

  registerOnWindow(terminal)

  console.log(
    `%c Rayon Terminal v${version} %c https://innei.ren `,
    'color: #fff; margin: 1em 0; padding: 5px 0; background: #2ab;',
    'margin: 1em 0; padding: 5px 0; background: #efefef;',
  )

  return terminal
})()
