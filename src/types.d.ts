declare global {
  interface Window {
    [key: string]: any
  }
  export const __DEV__: boolean
}

export {}
