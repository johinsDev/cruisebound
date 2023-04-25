import * as React from 'react'

import { cn } from '@/lib/tw'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm font-semibold ' +
            'ring-offset-neutral-50 file:border-0 file:bg-transparent file:text-sm file:font-medium ' +
            'placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 ' +
            'focus-visible:ring-neutral-200 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
