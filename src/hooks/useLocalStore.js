import { useEffect, useState } from 'react'

const prefix = "html-editor-";

export default function useLocalStore(key, initialValue) {
  let newKey = prefix + key

  const [value, setValue] = useState(() => {
    let jsonValue = localStorage.getItem(newKey)
    if (jsonValue !== null) { return JSON.parse(jsonValue) }
    if (typeof initialValue === 'object') { return initialValue() }
    else { return initialValue }
  })

  useEffect(() => {
    localStorage.setItem(newKey, JSON.stringify(value))
  }, [newKey, value])

  return [value, setValue]
}
