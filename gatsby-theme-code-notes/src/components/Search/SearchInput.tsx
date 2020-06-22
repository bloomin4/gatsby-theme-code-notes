/** @jsx jsx */
import { useContext, useEffect, useRef } from 'react'
import { jsx, Input, Box } from 'theme-ui'
import { SearchContext } from './SearchProvider'
import { GoSearch } from 'react-icons/go'

export const SearchInput = () => {
  const { query, setQuery } = useContext(SearchContext)
  const inputEl = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    window.addEventListener('keydown', (event) => {
      if (event.isComposing || event.keyCode === 191) {
        if (inputEl && inputEl.current) {
          event.preventDefault()
          inputEl.current.focus()
        }
      }
    })

    return () => {
      window.removeEventListener('keydown', () => {})
    }
  }, [])

  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <GoSearch
        sx={{
          position: 'absolute',
          top: '50%',
          left: 2,
          transform: 'translateY(-50%)',
          color: 'input',
          pointerEvents: 'none',
        }}
      />
      <Input
        value={query}
        onChange={(event) => {
          console.log('Search -> event.target.value', event.target.value)
          setQuery(event.target.value)
        }}
        aria-label="Search"
        placeholder="Search notes"
        ref={inputEl}
      />
      <Box
        sx={{
          border: '1px solid',
          color: 'input',
          borderRadius: 'default',
          position: 'absolute',
          top: '50%',
          right: 2,
          transform: 'translateY(-50%)',
          px: 1,
          lineHeight: '1.1rem',
          width: '1.2rem',
          height: '1.2rem',
          textAlign: 'center',
          fontFamily: 'mono',
          fontSize: 0,
          userSelect: 'none',
          pointerEvents: 'none',
          opacity: 0.7,
        }}
      >
        /
      </Box>
    </Box>
  )
}
