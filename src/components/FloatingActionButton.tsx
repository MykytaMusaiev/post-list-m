import Link from 'next/link'

interface FABProps {
  href: string
  label?: string
  children: React.ReactNode
}

export default function FloatingActionButton({
  href,
  label = 'Додати новий елемент',
  children,
}: FABProps) {
  return (
    <Link
      href={href}
      className="fixed bottom-6 right-6 bg-blue-600 text-white 
                 w-14 h-14 rounded-full shadow-xl 
                 flex items-center justify-center text-3xl font-bold 
                 hover:bg-blue-700  z-50
                 transition-all duration-300 ease-in-out hover:scale-110
                 "
      aria-label={label}
    >
      {children}
    </Link>
  )
}
