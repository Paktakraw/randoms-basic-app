import { Dices, RotateCcw } from 'lucide-react'
import type { Item } from '../../types'
import Button from '../ui/Button'

interface Props {
  result: Item | null
  spinning: boolean
  display: string | null
  poolCount: number
  excludedCount: number
  hasSelection: boolean
  onPick: () => void
  onReset: () => void
}

export default function PickPanel({ result, spinning, display, poolCount, excludedCount, hasSelection, onPick, onReset }: Props) {
  const exhausted = hasSelection && poolCount === 0

  return (
    <section className="border border-black rounded-2xl p-6 text-center space-y-5">
      <div className="min-h-24 flex items-center justify-center">
        {spinning ? (
          <p key={display} className="animate-tick text-3xl sm:text-5xl font-bold break-words text-neutral-400">
            {display}
          </p>
        ) : result ? (
          <p key={result.id} className="animate-pop text-3xl sm:text-5xl font-bold break-words">
            {result.name}
          </p>
        ) : (
          <p className="text-neutral-400">
            {hasSelection ? 'กดปุ่มเพื่อสุ่ม' : 'เลือกอย่างน้อย 1 กลุ่ม'}
          </p>
        )}
      </div>
      {exhausted && !spinning && <p className="text-sm text-neutral-600">สุ่มครบทุกรายการแล้ว กดรีเซ็ตเพื่อเริ่มใหม่</p>}
      <div className="flex flex-col sm:flex-row gap-2 justify-center">
        <Button onClick={onPick} disabled={poolCount === 0 || spinning} className="sm:min-w-40 text-base">
          <Dices size={20} className={spinning ? 'animate-spin' : ''} />
          {spinning ? 'กำลังสุ่ม…' : 'สุ่ม'}
        </Button>
        <Button variant="outline" onClick={onReset} disabled={(excludedCount === 0 && !result) && !spinning}>
          <RotateCcw size={16} />
          รีเซ็ต
        </Button>
      </div>
    </section>
  )
}
