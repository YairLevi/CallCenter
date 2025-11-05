import { X } from "lucide-react"
import type { Tag } from "@/api/types.tsx"

type Props = {
  tag: Tag
  onDelete?: () => void
}

export function Badge({ tag, onDelete }: Props) {
  return (
    <div
      className="group flex items-center gap-2 bg-gray-600 text-white border border-gray-500 rounded-xl px-4 py-1 text-sm whitespace-nowrap select-none"
    >
      <span>{tag.name}</span>

      {onDelete && (
        <button
          onClick={onDelete}
          className={`
            w-0 overflow-hidden
            transition-[width,opacity,transform] duration-200 ease-out
            group-hover:w-5 group-hover:opacity-100 group-hover:scale-100
            opacity-0 scale-0
            rounded-lg hover:bg-gray-400 flex items-center justify-center
          `}
        >
          <X size={14} strokeWidth={2} />
        </button>
      )}
    </div>
  )
}
