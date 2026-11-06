import type { ButtonHTMLAttributes } from 'react'

type Variant = 'solid' | 'outline' | 'ghost'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

const styles: Record<Variant, string> = {
  solid: 'bg-black text-white hover:bg-neutral-800 border border-black',
  outline: 'bg-white text-black border border-black hover:bg-neutral-100',
  ghost: 'bg-transparent text-neutral-600 border border-transparent hover:text-black hover:bg-neutral-100',
}

export default function Button({ variant = 'solid', className = '', ...rest }: Props) {
  return (
    <button
      {...rest}
      className={`inline-flex items-center justify-center gap-2 min-h-11 px-4 rounded-lg text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${styles[variant]} ${className}`}
    />
  )
}
