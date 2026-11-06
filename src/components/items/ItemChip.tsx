import { useState } from 'react'
import { Pencil, X } from 'lucide-react'
import ConfirmDialog from '../ui/ConfirmDialog'

interface Props {
  name: string
  onRename: (name: string) => void
  onDelete: () => void
}

/** Compact pill: tap the name to edit, tap × to delete. Wraps with siblings to save vertical space. */
export default function ItemChip({ name, onRename, onDelete }: Props) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(name)
  const [confirming, setConfirming] = useState(false)

  const save = () => {
    const v = draft.trim()
    if (v && v !== name) onRename(v)
    setEditing(false)
  }

  if (editing) {
    return (
      <li className="w-full">
        <input
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') save()
            if (e.key === 'Escape') setEditing(false)
          }}
          onBlur={save}
          className="w-full h-10 px-3 rounded-full border border-black text-sm focus:outline-none"
        />
      </li>
    )
  }

  return (
    <li className="flex items-center max-w-full rounded-full border border-neutral-300 pl-3 text-sm">
      <button
        onClick={() => { setDraft(name); setEditing(true) }}
        title="แตะเพื่อแก้ไข"
        className="flex items-center gap-1.5 min-h-10 min-w-0"
      >
        <span className="truncate">{name}</span>
        <Pencil size={12} className="shrink-0 text-neutral-400" />
      </button>
      <button
        onClick={() => setConfirming(true)}
        aria-label={`ลบ ${name}`}
        title="ลบ"
        className="h-10 w-10 shrink-0 grid place-items-center rounded-full text-neutral-500 hover:text-black"
      >
        <X size={16} />
      </button>
      <ConfirmDialog
        open={confirming}
        title={`ลบ "${name}" ?`}
        message="กู้คืนไม่ได้"
        onCancel={() => setConfirming(false)}
        onConfirm={() => { setConfirming(false); onDelete() }}
      />
    </li>
  )
}
