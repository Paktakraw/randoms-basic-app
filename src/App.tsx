import { useState } from 'react'
import { useData } from './hooks/useData'
import { isSupabaseConfigured } from './lib/supabase'
import Header, { type Tab } from './components/layout/Header'
import ManageView from './components/ManageView'
import RandomizerView from './components/randomizer/RandomizerView'
import Notice from './components/ui/Notice'

export default function App() {
  const [tab, setTab] = useState<Tab>('random')
  const { groups, items, loading, error, ...actions } = useData()

  return (
    <div className="min-h-screen">
      <Header tab={tab} onChange={setTab} />
      <main className="max-w-3xl mx-auto px-4 py-6 space-y-4">
        {!isSupabaseConfigured && (
          <Notice>
            ยังไม่ได้ตั้งค่า Supabase — ใส่ VITE_SUPABASE_URL และ VITE_SUPABASE_ANON_KEY ในไฟล์ .env.local แล้วรีสตาร์ท
          </Notice>
        )}
        {error && isSupabaseConfigured && <Notice>{error}</Notice>}
        {loading ? (
          <p className="text-neutral-500">กำลังโหลด…</p>
        ) : tab === 'random' ? (
          <RandomizerView groups={groups} items={items} />
        ) : (
          <ManageView groups={groups} items={items} actions={actions} />
        )}
      </main>
    </div>
  )
}
