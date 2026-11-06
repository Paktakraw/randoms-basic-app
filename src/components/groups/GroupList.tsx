import { FolderPlus, Layers } from 'lucide-react'
import type { Group, Item } from '../../types'
import TextForm from '../ui/TextForm'
import GroupCard from './GroupCard'

interface Props {
  groups: Group[]
  items: Item[]
  activeId: string | null
  onSelect: (id: string) => void
  onAdd: (name: string) => void
  onRename: (id: string, name: string) => void
  onRemove: (id: string) => void
}

export default function GroupList({ groups, items, activeId, onSelect, onAdd, onRename, onRemove }: Props) {
  return (
    <section className="space-y-3">
      <h2 className="flex items-center gap-2 font-semibold">
        <Layers size={18} />
        กลุ่ม
      </h2>
      <TextForm placeholder="ชื่อกลุ่มใหม่ เช่น อาหารเช้า" submitLabel="สร้าง" icon={<FolderPlus size={16} />} onSubmit={onAdd} />
      {groups.length === 0 ? (
        <p className="text-sm text-neutral-500">ยังไม่มีกลุ่ม</p>
      ) : (
        <ul className="grid grid-cols-2 gap-2">
          {groups.map((g) => (
            <GroupCard
              key={g.id}
              name={g.name}
              count={items.filter((i) => i.group_id === g.id).length}
              active={g.id === activeId}
              onSelect={() => onSelect(g.id)}
              onRename={(n) => onRename(g.id, n)}
              onDelete={() => onRemove(g.id)}
            />
          ))}
        </ul>
      )}
    </section>
  )
}
