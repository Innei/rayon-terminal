import { fitAddon, terminal } from './terminal'

export function registerOnWindow() {
  window.fit = () => {
    fitAddon.fit()
  }
  window.term = terminal
  window.terminal = terminal

  window.send = (text: string) => {
    const message = { magic: 'command', msg: text }

    window.webkit?.messageHandlers.callbackHandler.postMessage(message)
  }
}
