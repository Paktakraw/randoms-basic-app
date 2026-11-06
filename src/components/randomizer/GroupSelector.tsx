import type { Group, Item } from '../../types'

interface Props {
  groups: Group[]
  items: Item[]
  selectedIds: string[]
  onToggle: (id: string) => void
}

/** Multi-select chips (checkbox behaviour) for choosing groups to merge. */
export default function GroupSelector({ groups, items, selectedIds, onToggle }: Props) {
  if (groups.length === 0) {
    return <p className="text-sm text-neutral-500">ยังไม่มีกลุ่ม ไปที่ “จัดการข้อมูล” เพื่อสร้างกลุ่มก่อน</p>
  }
  return (
    <div className="flex flex-wrap gap-2">
      {groups.map((g) => {
        const on = selectedIds.includes(g.id)
        const count = items.filter((i) => i.group_id === g.id).length
        return (
          <label
            key={g.id}
            className={`flex items-center gap-2 min-h-11 px-4 rounded-full border cursor-pointer select-none text-sm ${
              on ? 'bg-black text-white border-black' : 'bg-white border-neutral-300 hover:border-black'
            }`}
          >
            <input type="checkbox" checked={on} onChange={() => onToggle(g.id)} className="sr-only" />
            {g.name}
            <span className={on ? 'text-neutral-300' : 'text-neutral-500'}>{count}</span>
          </label>
        )
      })}
    </div>
  )
}
