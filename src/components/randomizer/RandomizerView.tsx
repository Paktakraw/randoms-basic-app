import { CheckSquare } from 'lucide-react'
import type { Group, Item } from '../../types'
import { useRandomizer } from '../../hooks/useRandomizer'
import GroupSelector from './GroupSelector'
import PickPanel from './PickPanel'
import PoolLists from './PoolLists'

interface Props {
  groups: Group[]
  items: Item[]
}

export default function RandomizerView({ groups, items }: Props) {
  const r = useRandomizer(items)

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h2 className="flex items-center gap-2 font-semibold">
          <CheckSquare size={18} />
          เลือกกลุ่ม (เลือกได้หลายกลุ่ม)
        </h2>
        <GroupSelector groups={groups} items={items} selectedIds={r.selectedGroupIds} onToggle={r.toggleGroup} />
      </section>
      <PickPanel
        result={r.result}
        spinning={r.spinning}
        display={r.display}
        poolCount={r.pool.length}
        excludedCount={r.excluded.length}
        hasSelection={r.selectedGroupIds.length > 0}
        onPick={r.pick}
        onReset={r.reset}
      />
      <PoolLists pool={r.pool} excluded={r.excluded} />
    </div>
  )
}
