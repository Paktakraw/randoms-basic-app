export interface Group {
  id: string
  name: string
  created_at: string
}

export interface Item {
  id: string
  group_id: string
  name: string
  created_at: string
}
