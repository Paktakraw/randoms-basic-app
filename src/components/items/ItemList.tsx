import { List, Plus } from 'lucide-react'
import type { Group, Item } from '../../types'
import TextForm from '../ui/TextForm'
import ItemChip from './ItemChip'

interface Props {
  group: Group | undefined
  items: Item[]
  onAdd: (name: string) => void
  onRename: (id: string, name: string) => void
  onRemove: (id: string) => void
}

export default function ItemList({ group, items, onAdd, onRename, onRemove }: Props) {
  if (!group) {
    return (
      <section className="space-y-3">
        <h2 className="flex items-center gap-2 font-semibold">
          <List size={18} />
          รายการ
        </h2>
        <p className="text-sm text-neutral-500">เลือกกลุ่มทางซ้ายเพื่อเพิ่ม/แก้ไขรายการ</p>
      </section>
    )
  }

  return (
    <section className="space-y-3">
      <h2 className="flex items-center gap-2 font-semibold">
        <List size={18} />
        รายการใน “{group.name}” <span className="text-neutral-500 font-normal">({items.length})</span>
      </h2>
      <TextForm placeholder="เพิ่มรายการทีละอัน" submitLabel="เพิ่ม" icon={<Plus size={16} />} onSubmit={onAdd} />
      {items.length === 0 ? (
        <p className="text-sm text-neutral-500">กลุ่มนี้ยังไม่มีรายการ</p>
      ) : (
        <ul className="flex flex-wrap gap-2">
          {items.map((i) => (
            <ItemChip
              key={i.id}
              name={i.name}
              onRename={(n) => onRename(i.id, n)}
              onDelete={() => onRemove(i.id)}
            />
          ))}
        </ul>
      )}
    </section>
  )
}
