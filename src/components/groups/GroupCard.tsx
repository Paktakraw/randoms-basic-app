import { useState } from 'react'
import { Check, Pencil, Trash2 } from 'lucide-react'
import ConfirmDialog from '../ui/ConfirmDialog'

interface Props {
  name: string
  count: number
  active: boolean
  onSelect: () => void
  onRename: (name: string) => void
  onDelete: () => void
}

/** Compact group card: name + item count on top, small actions below. */
export default function GroupCard({ name, count, active, onSelect, onRename, onDelete }: Props) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(name)
  const [confirming, setConfirming] = useState(false)

  const save = () => {
    const v = draft.trim()
    if (v && v !== name) onRename(v)
    setEditing(false)
  }

  return (
    <li
      className={`rounded-lg border px-2 py-1 flex flex-col ${
        active ? 'border-black bg-neutral-100' : 'border-neutral-200'
      }`}
    >
      {editing ? (
        <div className="flex items-center gap-1">
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') save()
              if (e.key === 'Escape') setEditing(false)
            }}
            className="flex-1 min-w-0 h-8 px-2 rounded border border-black text-sm focus:outline-none"
          />
          <button onClick={save} aria-label="บันทึก" className="h-8 w-8 grid place-items-center rounded bg-black text-white">
            <Check size={16} />
          </button>
        </div>
      ) : (
        <button onClick={onSelect} className="text-left min-h-8 px-0.5">
          <span className="block font-medium text-sm truncate">{name}</span>
        </button>
      )}
      <div className="flex items-center justify-between">
        <span className="px-0.5 text-xs text-neutral-500">{count} รายการ</span>
        <div className="flex">
          <button
            onClick={() => { setDraft(name); setEditing(true) }}
            aria-label="แก้ไขกลุ่ม"
            title="แก้ไข"
            className="h-8 w-8 grid place-items-center rounded text-neutral-500 hover:text-black hover:bg-neutral-200"
          >
            <Pencil size={15} />
          </button>
          <button
            onClick={() => setConfirming(true)}
            aria-label="ลบกลุ่ม"
            title="ลบ"
            className="h-8 w-8 grid place-items-center rounded text-neutral-500 hover:text-black hover:bg-neutral-200"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
      <ConfirmDialog
        open={confirming}
        title={`ลบกลุ่ม "${name}" ?`}
        message={`รายการทั้งหมดในกลุ่ม (${count} รายการ) จะถูกลบด้วย และกู้คืนไม่ได้`}
        onCancel={() => setConfirming(false)}
        onConfirm={() => { setConfirming(false); onDelete() }}
      />
    </li>
  )
}
