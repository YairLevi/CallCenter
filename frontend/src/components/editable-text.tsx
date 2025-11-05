import { useState, useRef, useEffect, useCallback } from "react"
import { Pencil, Check } from "lucide-react"

type EditableTextProps = {
  initialValue: string
  onSave: (newValue: string) => void
  onEdit: () => void
}

export function EditableText({ initialValue, onSave, onEdit }: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(initialValue)
  const [editValue, setEditValue] = useState(initialValue)

  const wrapperRef = useRef<HTMLDivElement>(null)

  const handleStartEdit = () => {
    onEdit()
    setEditValue(value)
    setIsEditing(true)
  }

  // a quick hack to force a rerender that depends on the update of the parent data.
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const handleSave = () => {
    const trimmed = editValue.trim()
    if (trimmed !== value) {
      onSave(trimmed)
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditValue(value)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSave()
    if (e.key === "Escape") handleCancel()
  }

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        handleCancel()
      }
    },
    [value]
  )

  useEffect(() => {
    if (isEditing) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isEditing, handleClickOutside])

  return (
    <div
      ref={wrapperRef}
      className="group flex items-center gap-2"
    >
      {isEditing ? (
        <>
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSave}
            className="p-1 text-green-600 hover:bg-gray-200 rounded transition-colors"
            title="Save"
          >
            <Check size={20} />
          </button>
        </>
      ) : (
        <>
          <span className="text-sm">
            {value || <em className="text-gray-400">empty</em>}
          </span>
          <button onClick={handleStartEdit} title="Edit">
            <Pencil size={14} />
          </button>
        </>
      )}
    </div>
  )
}
