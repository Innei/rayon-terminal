import { debounce } from 'lodash-es'
import { Component, onCleanup, onMount } from 'solid-js'
import { CanvasAddon } from 'xterm-addon-canvas'

import { fitAddon, terminal } from '../../core/terminal'
import styles from './index.module.css'

export const XTerm: Component = () => {
  let $terminalEl: HTMLDivElement
  onMount(() => {
    terminal.open($terminalEl)
    const addon = new CanvasAddon()

    terminal.loadAddon(addon)

    fitAddon.fit()
    terminal.focus()
  })

  let observe: ResizeObserver
  onMount(() => {
    observe = new ResizeObserver(
      debounce(() => {
        fitAddon.fit()
        const msg = { cols: terminal.cols, rows: terminal.rows }
        const message = { magic: 'size', msg: JSON.stringify(msg) }
        console.log('resize', message)
        window.webkit?.messageHandlers.callbackHandler.postMessage(message)
      }, 100),
    )

    observe.observe($terminalEl)
  })

  onCleanup(() => {
    observe.disconnect()
  })

  return <div id="xterm" ref={$terminalEl} class={styles['xterm']}></div>
}
