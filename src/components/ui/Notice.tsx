export default function Notice({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-black rounded-lg p-3 text-sm bg-neutral-100" role="alert">
      {children}
    </div>
  )
}
