import { Dices, ListChecks, type LucideIcon } from 'lucide-react'

export type Tab = 'random' | 'manage'

interface Props {
  tab: Tab
  onChange: (t: Tab) => void
}

const tabs: { id: Tab; label: string; icon: LucideIcon }[] = [
  { id: 'random', label: 'สุ่ม', icon: Dices },
  { id: 'manage', label: 'จัดการข้อมูล', icon: ListChecks },
]

export default function Header({ tab, onChange }: Props) {
  return (
    <header className="border-b border-black">
      <div className="max-w-3xl mx-auto px-4 pt-5">
        <h1 className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <Dices size={24} />
          Randomizer
        </h1>
        <nav className="flex gap-6 mt-3">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              className={`flex items-center gap-2 pb-2 text-sm min-h-11 border-b-2 ${
                tab === t.id ? 'border-black font-semibold' : 'border-transparent text-neutral-500'
              }`}
            >
              <t.icon size={16} />
              {t.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
