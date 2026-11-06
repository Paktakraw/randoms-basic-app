import { supabase } from './supabase'
import type { Group, Item } from '../types'

function check<T>(res: { data: T | null; error: { message: string } | null }): T {
  if (res.error) throw new Error(res.error.message)
  return res.data as T
}

export const api = {
  async listGroups(): Promise<Group[]> {
    return check(await supabase.from('groups').select('*').order('created_at'))
  },
  async createGroup(name: string): Promise<Group> {
    return check(await supabase.from('groups').insert({ name }).select().single())
  },
  async renameGroup(id: string, name: string): Promise<void> {
    check(await supabase.from('groups').update({ name }).eq('id', id))
  },
  async deleteGroup(id: string): Promise<void> {
    check(await supabase.from('groups').delete().eq('id', id))
  },
  async listItems(): Promise<Item[]> {
    return check(await supabase.from('items').select('*').order('created_at'))
  },
  async createItem(group_id: string, name: string): Promise<Item> {
    return check(await supabase.from('items').insert({ group_id, name }).select().single())
  },
  async renameItem(id: string, name: string): Promise<void> {
    check(await supabase.from('items').update({ name }).eq('id', id))
  },
  async deleteItem(id: string): Promise<void> {
    check(await supabase.from('items').delete().eq('id', id))
  },
}
