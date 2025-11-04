import React, { type PropsWithChildren, useEffect, useState } from "react";
import { XIcon } from 'lucide-react'
import { cn } from "@/lib/utils.ts";

export interface DialogProps extends PropsWithChildren {
  open: boolean
  onClose: () => void
  title?: string
}

export function useDialogProps() {
  const [isOpen, setOpen] = useState(false)
  const open = () => setOpen(true)
  const close = () => setOpen(false)

  return { isOpen, open, close }
}

export function Group({ children, label }: PropsWithChildren & { label?: string }) {
  return (
    <div className="flex flex-col gap-1 my-5">
      {label && <label className="font-medium text-[0.8rem] text-gray-400">{label}:</label>}
      {children}
    </div>
  )
}

export function Footer({ children }: PropsWithChildren) {
  return (
    <footer className="flex justify-end items-center gap-3">
      {children}
    </footer>
  )
}

export function Dialog({ open, onClose, title, children }: DialogProps) {
  return (
    <div
      onClick={onClose}
      className={cn(
        'transition-all fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center',
        open ? 'scale-100 visible' : 'scale-90 invisible'
      )}
    >
      <div
        onClick={e => e.stopPropagation()}
        className={cn(
          'p-5 bg-neutral-800 shadow-xl rounded-lg w-1/4 min-w-[20rem] max-h-screen overflow-auto duration-150 ease-in-out',
          open ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
        )}
      >
        <header className="flex justify-between items-center [&_*]:text-gray-200">
          <h1 className="text-lg">{title}</h1>
          <XIcon
            width={32}
            height={32}
            className="rounded hover:bg-white !hover:bg-opacity-10 p-1"
            onClick={onClose}
          />
        </header>
        {children}
      </div>
    </div>
  )
}

Dialog.Group = Group
Dialog.Footer = Footer
