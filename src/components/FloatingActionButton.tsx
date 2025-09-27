import { FabConfig } from '@/lib/types'
import Link from 'next/link'

export default function FloatingActionButton({
  href,
  label,
  icon,
  bgColor,
  hoverBgColor,
}: FabConfig) {
  const buttonClasses = `${bgColor} ${hoverBgColor} text-white w-14 h-14 rounded-full shadow-xl 
                         flex items-center justify-center text-2xl font-bold 
                         transition-all duration-300 ease-in-out hover:scale-110`
  return (
    <div className="fixed bottom-20 right-12 z-50 group">
      <span
        className="absolute                        
                       bottom-full mb-2
                       left-1/2 -translate-x-1/2                        
                       p-2 bg-gray-800 text-white text-sm rounded-lg whitespace-nowrap 
                       opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                       pointer-events-none shadow-lg"
      >
        {label}
      </span>
      <Link href={href} className={buttonClasses} aria-label={label}>
        {icon}
      </Link>
    </div>
  )
}
