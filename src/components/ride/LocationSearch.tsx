'use client'

import { useState, useEffect, KeyboardEvent } from 'react'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete'

interface LocationSearchProps {
  placeholder: string
  value?: string
  onSelect: (location: { address: string; lat: number; lng: number }) => void
  onClear: () => void
}

export default function LocationSearch({ 
  placeholder, 
  value, 
  onSelect,
  onClear 
}: LocationSearchProps) {
  const [activeIndex, setActiveIndex] = useState<number>(-1)

  const {
    ready,
    value: searchValue,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    defaultValue: value
  })

  // Reset activeIndex when suggestions change
  useEffect(() => {
    setActiveIndex(-1)
  }, [data])

  const handleSelect = async (address: string) => {
    setValue(address, false)
    clearSuggestions()

    try {
      const results = await getGeocode({ address })
      const { lat, lng } = await getLatLng(results[0])
      onSelect({ address, lat, lng })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Return early if no suggestions
    if (status !== 'OK') return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault() // Prevent cursor from moving
        setActiveIndex(prev => 
          prev < data.length - 1 ? prev + 1 : prev
        )
        break

      case 'ArrowUp':
        e.preventDefault() // Prevent cursor from moving
        setActiveIndex(prev => 
          prev > -1 ? prev - 1 : prev
        )
        break

      case 'Enter':
        e.preventDefault()
        if (activeIndex > -1 && data[activeIndex]) {
          handleSelect(data[activeIndex].description)
        }
        break

      case 'Escape':
        clearSuggestions()
        setActiveIndex(-1)
        break
    }
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    setValue('')
    clearSuggestions()
    setActiveIndex(-1)
    onClear()
  }

  return (
    <div className="relative">
      <input
        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={!ready}
      />
      {searchValue && (
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          onClick={handleClear}
        >
          ×
        </button>
      )}
      {status === 'OK' && (
        <ul className="absolute z-10 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto">
          {data.map((suggestion, idx) => (
            <li
              key={suggestion.place_id}
              className={`cursor-pointer select-none relative py-2 px-4 ${
                idx === activeIndex
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => handleSelect(suggestion.description)}
              onMouseEnter={() => setActiveIndex(idx)}
            >
              {suggestion.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}