/* @refresh reload */
import '@unocss/reset/tailwind.css'
import { render } from 'solid-js/web'
import 'uno.css'
import App from './App'
import './main.css'

render(() => <App />, document.getElementById('root') as HTMLElement)
