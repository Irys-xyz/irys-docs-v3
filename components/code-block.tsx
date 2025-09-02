'use client'

import { useState } from 'react'
import cn from 'clsx'
import type { ComponentProps, FC } from 'react'

// Copy icon SVG component
const CopyIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
)

// Check icon for success state
const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

export const CodeBlock: FC<ComponentProps<'pre'>> = ({ children, className, ...props }) => {
  const [copied, setCopied] = useState(false)

  const extractTextContent = (element: any): string => {
    if (typeof element === 'string') return element
    if (typeof element === 'number') return String(element)
    if (Array.isArray(element)) return element.map(extractTextContent).join('')
    if (element?.props?.children) return extractTextContent(element.props.children)
    return ''
  }

  const copyToClipboard = async () => {
    try {
      const textContent = extractTextContent(children)
      await navigator.clipboard.writeText(textContent)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  return (
    <div className="relative group">
      <pre
        className={cn(
          "!bg-[#0d0d0d] !text-base relative",
          className
        )}
        {...props}
      >
        {children}
      </pre>
      
      {/* Copy button */}
      <button
        onClick={copyToClipboard}
        className={cn(
          "absolute top-3 right-3 p-2 rounded-md transition-all duration-200",
          "bg-gray-700/80 hover:bg-gray-600/80 text-gray-300 hover:text-white",
          "opacity-0 group-hover:opacity-100 focus:opacity-100",
          "border border-gray-600/50 hover:border-gray-500",
          copied && "!bg-[#51ffd6] !text-black !border-[#51ffd6]"
        )}
        title={copied ? "Copied!" : "Copy code"}
        aria-label={copied ? "Code copied to clipboard" : "Copy code to clipboard"}
      >
        {copied ? (
          <CheckIcon className="w-4 h-4" />
        ) : (
          <CopyIcon className="w-4 h-4" />
        )}
      </button>
    </div>
  )
}
