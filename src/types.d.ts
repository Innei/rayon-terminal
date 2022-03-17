declare global {
  interface Window {
    webkit?: {
      messageHandlers: {
        callbackHandler: {
          postMessage(message: any): void
        }
      }
    }
    fit: () => void
    [key: string]: any
  }
}

declare module 'xterm' {
  export interface Terminal {
    writeBase64(str: string): void
  }
}

export {}
