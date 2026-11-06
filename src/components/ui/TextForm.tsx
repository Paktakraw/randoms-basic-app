import { useState, type FormEvent } from 'react'
import type { ReactNode } from 'react'
import Button from './Button'

interface Props {
  placeholder: string
  submitLabel: string
  icon?: ReactNode
  onSubmit: (value: string) => void | Promise<unknown>
}

/** Single text input + submit button, reused for adding groups and items. */
export default function TextForm({ placeholder, submitLabel, icon, onSubmit }: Props) {
  const [value, setValue] = useState('')

  const handle = async (e: FormEvent) => {
    e.preventDefault()
    const v = value.trim()
    if (!v) return
    setValue('')
    await onSubmit(v)
  }

  return (
    <form onSubmit={handle} className="flex gap-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="flex-1 min-w-0 min-h-11 px-3 rounded-lg border border-neutral-300 focus:border-black focus:outline-none"
      />
      <Button type="submit" disabled={!value.trim()}>
        {icon}
        {submitLabel}
      </Button>
    </form>
  )
}
