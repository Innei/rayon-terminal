import { Component, onMount } from 'solid-js'
import 'xterm/css/xterm.css'
import { XTerm } from './components/xterm'
import { SearchBar } from './components/xterm/search-bar'
import { terminal } from './core/terminal'
import { isInWebkitView } from './utils'

const useDebug = () => {
  onMount(() => {
    if (isInWebkitView) {
      return
    }
    terminal.write('\x1b[31mHello world\x1b[0m\n')
    terminal.write(
      `\u001b[?1l\u001b>\u001b[?2004l\r\r\n\u001b]2;ls --color=tty\u0007\u001b]1;ls\u0007`,
    )
    terminal.write(
      `fisher.fish  install.sh  \u001b[0m\u001b[01;34mmx\u001b[0m  \u001b[01;34mnode_modules\u001b[0m  package.json  package-lock.json`,
    )
    terminal.write(
      `\r\u001b[0m\u001b[27m\u001b[24m\u001b[J\u001b[01;32m➜  \u001b[36m~\u001b[00m `,
    )
    // add bg

    document.body.classList.add('bg-light', 'dark:bg-dark')
  })
}

const App: Component = () => {
  useDebug()

  return (
    <>
      <XTerm />
      <SearchBar />
    </>
  )
}

export default App
