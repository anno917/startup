import type { LucideIcon } from "lucide-react"

interface PageTitleProps {
  title: string
  icon?: LucideIcon
}

export const PageTitle = ({ title, icon: Icon }: PageTitleProps) => (
  <div className="flex items-center gap-3 mb-6 md:mb-8">
    {Icon && <Icon className="w-7 h-7 md:w-8 md:h-8 text-blue-700" />}
    <h1 className="text-2xl md:text-3xl font-bold text-blue-800">{title}</h1>
  </div>
)
