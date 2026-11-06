import { useState } from 'react'
import type { Group, Item } from '../types'
import GroupList from './groups/GroupList'
import ItemList from './items/ItemList'

interface Props {
  groups: Group[]
  items: Item[]
  actions: {
    addGroup: (name: string) => Promise<Group | undefined>
    renameGroup: (id: string, name: string) => unknown
    removeGroup: (id: string) => unknown
    addItem: (groupId: string, name: string) => unknown
    renameItem: (id: string, name: string) => unknown
    removeItem: (id: string) => unknown
  }
}

export default function ManageView({ groups, items, actions }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const activeGroup = groups.find((g) => g.id === activeId)

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <GroupList
        groups={groups}
        items={items}
        activeId={activeGroup?.id ?? null}
        onSelect={setActiveId}
        onAdd={async (n) => {
          const g = await actions.addGroup(n)
          if (g) setActiveId(g.id)
        }}
        onRename={actions.renameGroup}
        onRemove={actions.removeGroup}
      />
      <ItemList
        group={activeGroup}
        items={items.filter((i) => i.group_id === activeGroup?.id)}
        onAdd={(n) => activeGroup && actions.addItem(activeGroup.id, n)}
        onRename={actions.renameItem}
        onRemove={actions.removeItem}
      />
    </div>
  )
}
