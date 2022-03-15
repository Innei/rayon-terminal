import { Component, onMount } from 'solid-js'
import 'xterm/css/xterm.css'
import { XTerm } from './components/xterm'
import { SearchBar } from './components/xterm/search-bar'
import { terminal } from './core/terminal'

const useDebug = () => {
  onMount(() => {
    if (typeof window.webkit !== 'undefined') {
      return
    }
    terminal.write('\x1b[31mHello world\x1b[0m\n')
    terminal.write(`[90m›[39m  [[33mLoggingInterceptor[39m]  [95m+++ 收到请求：GET -> /master/check_logged?t=1647270933602[39m 
[90m›[39m  [[33mLoggingInterceptor[39m]  [95m--- 响应请求：GET -> /master/check_logged?t=1647270933602[33m +2ms[39m[95m[39m 
[90m›[39m  [[33mLoggingInterceptor[39m]  [95m+++ 收到请求：POST -> /snippets/aggregate?t=1647270934251[39m 
[90m›[39m  [[33mLoggingInterceptor[39m]  [95m+++ 收到请求：GET -> /snippets?t=1647270934251&page=1&size=20&select=-raw[39m 
[90m›[39m  [[33mLoggingInterceptor[39m]  [95m--- 响应请求：POST -> /snippets/aggregate?t=1647270934251[33m +10ms[39m[95m[39m 
[90m›[39m  [[33mLoggingInterceptor[39m]  [95m--- 响应请求：GET -> /snippets?t=1647270934251&page=1&size=20&select=-raw[33m +12ms[39m[95m[39m 
[90m›[39m  [[33mLoggingInterceptor[39m]  [95m+++ 收到请求：GET -> /master/check_logged?t=1647270937098[39m 
[90m›[39m  [[33mLoggingInterceptor[39m]  [95m--- 响应请求：GET -> /master/check_logged?t=1647270937098[33m +0ms[39m[95m[39m 
[90m›[39m  [[33mLoggingInterceptor[39m]  [95m+++ 收到请求：GET -> /snippets/61dd7ef337d294b211d2ec82?t=1647270937342[39m 
[90m›[39m  [[33mLoggingInterceptor[39m]  [95m--- 响应请求：GET -> /snippets/61dd7ef337d294b211d2ec82?t=1647270937342[33m +24ms[39m[95m[39m 
`)

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
