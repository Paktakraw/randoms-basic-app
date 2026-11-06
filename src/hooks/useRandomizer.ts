import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Item } from '../types'

const STEPS = 13
// Delay grows each step so the roll starts fast and slows down before the reveal (~1s total).
const delayAt = (step: number) => 40 + step * step * 0.8

/**
 * Session logic:
 *  - pool     = items of selected groups, minus excluded ones (Current Pool)
 *  - excluded = items already picked this session (Excluded Pool)
 * Picking runs a short "slot machine" animation; the winner is only
 * committed (shown + moved to excluded) when the animation ends.
 */
export function useRandomizer(items: Item[]) {
  const [selectedGroupIds, setSelectedGroupIds] = useState<string[]>([])
  const [excludedIds, setExcludedIds] = useState<string[]>([])
  const [result, setResult] = useState<Item | null>(null)
  const [spinning, setSpinning] = useState(false)
  const [display, setDisplay] = useState<string | null>(null)
  const timer = useRef<number | undefined>(undefined)

  const stopTimer = () => window.clearTimeout(timer.current)
  useEffect(() => stopTimer, [])

  const merged = useMemo(
    () => items.filter((i) => selectedGroupIds.includes(i.group_id)),
    [items, selectedGroupIds],
  )
  const pool = useMemo(() => merged.filter((i) => !excludedIds.includes(i.id)), [merged, excludedIds])
  const excluded = useMemo(() => merged.filter((i) => excludedIds.includes(i.id)), [merged, excludedIds])

  const toggleGroup = (id: string) => {
    if (spinning) return
    setSelectedGroupIds((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))
  }

  const pick = useCallback(() => {
    if (spinning || pool.length === 0) return
    const candidates = pool
    const chosen = candidates[Math.floor(Math.random() * candidates.length)]

    const finish = () => {
      setResult(chosen)
      setExcludedIds((p) => [...p, chosen.id])
      setDisplay(null)
      setSpinning(false)
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finish()
      return
    }

    setSpinning(true)
    setResult(null)
    let step = 0
    let last = ''
    const tick = () => {
      step++
      if (step >= STEPS) return finish()
      let name = last
      do {
        name = candidates[Math.floor(Math.random() * candidates.length)].name
      } while (candidates.length > 1 && name === last)
      last = name
      setDisplay(name)
      timer.current = window.setTimeout(tick, delayAt(step))
    }
    tick()
  }, [spinning, pool])

  const reset = () => {
    stopTimer()
    setSpinning(false)
    setDisplay(null)
    setExcludedIds([])
    setResult(null)
  }

  return { selectedGroupIds, toggleGroup, pool, excluded, result, spinning, display, pick, reset }
}
