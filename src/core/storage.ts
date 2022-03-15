import { ITheme } from '../types/theme'

const storageKey = '__rayon__storage_key_theme__'

export const getTheme = (): ITheme | null => {
  const item = localStorage.getItem(storageKey)

  return JSONParse(item)
}

export const storageTheme = (theme: ITheme) => {
  localStorage.setItem(storageKey, JSON.stringify(theme))
}

const JSONParse = (d: any) => {
  try {
    return JSON.parse(d)
  } catch {
    return null
  }
}
