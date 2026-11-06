import { useCallback, useEffect, useState } from 'react'
import { api } from '../lib/api'
import { ensureSession } from '../lib/auth'
import type { Group, Item } from '../types'

/** Loads groups & items from Supabase and exposes CRUD actions. */
export function useData() {
  const [groups, setGroups] = useState<Group[]>([])
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const run = useCallback(async <T,>(fn: () => Promise<T>): Promise<T | undefined> => {
    try {
      setError(null)
      return await fn()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'เกิดข้อผิดพลาด')
    }
  }, [])

  useEffect(() => {
    run(async () => {
      await ensureSession()
      const [g, i] = await Promise.all([api.listGroups(), api.listItems()])
      setGroups(g)
      setItems(i)
    }).finally(() => setLoading(false))
  }, [run])

  const addGroup = (name: string) =>
    run(async () => {
      const g = await api.createGroup(name)
      setGroups((p) => [...p, g])
      return g
    })

  const renameGroup = (id: string, name: string) =>
    run(async () => {
      await api.renameGroup(id, name)
      setGroups((p) => p.map((g) => (g.id === id ? { ...g, name } : g)))
    })

  const removeGroup = (id: string) =>
    run(async () => {
      await api.deleteGroup(id)
      setGroups((p) => p.filter((g) => g.id !== id))
      setItems((p) => p.filter((i) => i.group_id !== id))
    })

  const addItem = (groupId: string, name: string) =>
    run(async () => {
      const it = await api.createItem(groupId, name)
      setItems((p) => [...p, it])
    })

  const renameItem = (id: string, name: string) =>
    run(async () => {
      await api.renameItem(id, name)
      setItems((p) => p.map((i) => (i.id === id ? { ...i, name } : i)))
    })

  const removeItem = (id: string) =>
    run(async () => {
      await api.deleteItem(id)
      setItems((p) => p.filter((i) => i.id !== id))
    })

  return {
    groups, items, loading, error,
    addGroup, renameGroup, removeGroup, addItem, renameItem, removeItem,
  }
}
