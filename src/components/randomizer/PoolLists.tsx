import { Ban, Package } from 'lucide-react'
import type { Item } from '../../types'

interface ListProps {
  title: string
  items: Item[]
  muted?: boolean
}

function PoolList({ title, items, muted }: ListProps) {
  return (
    <div className="space-y-2">
      <h3 className="flex items-center gap-2 text-sm font-semibold">
        {muted ? <Ban size={16} /> : <Package size={16} />}
        {title} <span className="text-neutral-500 font-normal">({items.length})</span>
      </h3>
      {items.length === 0 ? (
        <p className="text-sm text-neutral-400">—</p>
      ) : (
        <ul className="flex flex-wrap gap-2">
          {items.map((i) => (
            <li
              key={i.id}
              className={`px-3 py-1 rounded-full border text-sm ${
                muted ? 'border-neutral-200 text-neutral-400 line-through' : 'border-neutral-400'
              }`}
            >
              {i.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

interface Props {
  pool: Item[]
  excluded: Item[]
}

/** Shows the Current Pool and the Excluded Pool side by side (stacked on mobile). */
export default function PoolLists({ pool, excluded }: Props) {
  return (
    <section className="grid gap-6 md:grid-cols-2">
      <PoolList title="ในกองสุ่ม" items={pool} />
      <PoolList title="ถูกตัดออกแล้ว" items={excluded} muted />
    </section>
  )
}
