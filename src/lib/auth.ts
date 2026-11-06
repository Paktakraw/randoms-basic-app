import { supabase } from './supabase'

/**
 * Makes sure there is a signed-in (anonymous) user.
 * The session is stored in the browser by supabase-js, so the same browser keeps the same data.
 */
export async function ensureSession(): Promise<void> {
  const { data } = await supabase.auth.getSession()
  if (data.session) return
  const { error } = await supabase.auth.signInAnonymously()
  if (error) throw new Error(`เปิดใช้งานบัญชีไม่สำเร็จ: ${error.message}`)
}
