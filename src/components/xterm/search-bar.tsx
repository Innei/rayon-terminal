import { Component, createEffect, createSignal, onMount } from 'solid-js'
import { searchAddon } from '../../core/terminal'
import styles from './index.module.css'
// @ts-ignore
import FormatLetterCaseupperIcon from '~icons/mdi/format-letter-case-upper'

export const SearchBar: Component = () => {
  let $searchBarWrapperEl: HTMLDivElement
  let $searchBarInputEl: HTMLInputElement

  const [isActive, setIsActive] = createSignal(false)
  const [isComposition, setIsComposition] = createSignal(false)
  const [isFocus, setIsFocus] = createSignal(false)
  const [isCaseSensitive, setIsCaseSensitive] = createSignal(false)
  const [keywold, setKeywold] = createSignal('')

  onMount(() => {
    const documentElement = window.document.documentElement

    documentElement.onkeydown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'f') {
        setIsActive(true)
        requestAnimationFrame(() => {
          $searchBarInputEl.focus()
        })

        e.stopPropagation()
        e.preventDefault()
      }

      if (e.key === 'Escape') {
        if (!isComposition()) {
          setIsActive(false)
        }
      }
    }
  })

  const doSearch = (_keyword?: string) => {
    searchAddon.findNext(_keyword ?? keywold(), {
      caseSensitive: isCaseSensitive(),
    })
  }

  createEffect(() => {
    void keywold()
    void isCaseSensitive()
    doSearch()
  })

  return (
    <div
      ref={$searchBarWrapperEl}
      classList={{
        [styles['search-bar-wrapper']]: true,
        active: isActive(),
        [styles['focus']]: isFocus(),
      }}
    >
      <input
        value={keywold()}
        ref={$searchBarInputEl}
        type="text"
        class={'text-sm'}
        onFocus={() => {
          setIsFocus(true)
        }}
        onBlur={() => {
          setIsFocus(false)
        }}
        classList={{ [styles['bar']]: true }}
        onKeyDown={(e) => {
          const keywold = (e.target as HTMLInputElement).value

          if (e.key === 'Enter') {
            doSearch(keywold)
          }
        }}
        onCompositionStart={(e) => {
          setIsComposition(true)
        }}
        onCompositionEnd={(e) => {
          setIsComposition(false)
        }}
        onInput={(e) => {
          const keywold = (e.target as HTMLInputElement).value

          setKeywold(keywold)
        }}
      />
      <div class="ml-2 px-1 flex flex-shrink-0 items-center relative dark:text-light-300">
        <span
          class="flex cursor-pointer"
          classList={{
            [styles['icon']]: true,
            [styles['enable']]: isCaseSensitive(),
          }}
          onClick={() => {
            setIsCaseSensitive(!isCaseSensitive())
            $searchBarInputEl.focus()
          }}
        >
          <FormatLetterCaseupperIcon />
        </span>
      </div>
    </div>
  )
}
