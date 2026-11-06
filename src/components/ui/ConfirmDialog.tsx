import { useEffect } from 'react'
import { Trash2 } from 'lucide-react'
import Button from './Button'

interface Props {
  open: boolean
  title: string
  message?: string
  confirmLabel?: string
  onConfirm: () => void
  onCancel: () => void
}

/** Modal that asks the user to confirm a destructive action. */
export default function ConfirmDialog({
  open, title, message, confirmLabel = 'ลบ', onConfirm, onCancel,
}: Props) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onCancel()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onCancel])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4"
      onClick={onCancel}
      role="presentation"
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-2xl bg-white border border-black p-5 space-y-4"
      >
        <div className="space-y-1">
          <h2 id="confirm-title" className="flex items-center gap-2 font-semibold break-words">
            <Trash2 size={18} className="shrink-0" />
            {title}
          </h2>
          {message && <p className="text-sm text-neutral-600 break-words">{message}</p>}
        </div>
        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={onCancel} autoFocus>ยกเลิก</Button>
          <Button onClick={onConfirm}>{confirmLabel}</Button>
        </div>
      </div>
    </div>
  )
}
