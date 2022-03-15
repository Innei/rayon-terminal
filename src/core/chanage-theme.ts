import { Terminal } from 'xterm'
import { Material, MaterialDark } from 'xterm-theme'

export function changeDarkTheme(term: Terminal, dark: boolean) {
  if (dark) {
    document.documentElement.classList.remove('light')
    document.documentElement.classList.add('dark')

    term.options.theme = {
      ...MaterialDark,
      selection: '#bbb',
      background: '#00000000',
    }
  } else {
    document.documentElement.classList.remove('dark')
    document.documentElement.classList.add('light')
    term.options.theme = {
      ...Material,
      background: '#FFFFFF00',
      selection: '#666',
    }
  }
}
