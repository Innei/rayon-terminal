import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { SearchAddon } from 'xterm-addon-search'
import { base64ToUint8Array } from '../utils'
import { changeDarkTheme } from './chanage-theme'
import { registerOnWindow } from './webkit-window'

export const fitAddon = new FitAddon()
export const searchAddon = new SearchAddon()

Terminal.prototype.writeBase64 = function (this: Terminal, base64: string) {
  this.write(base64ToUint8Array(base64))
}

export const terminal = new Terminal({
  allowTransparency: true,
  theme: {
    background: 'transparent',
  },
  rendererType: 'dom',
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
