import { VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/tw'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      color: {
        primary: 'bg-primary text-white hover:bg-primary/90',
        secondary: 'bg-secondary text-white hover:bg-secondary/90',
        white:
          'bg-white text-secondary shadow-md border border-slate-200 hover:bg-gray-100/90',
        'secondary-light':
          'bg-secondary-light text-white hover:bg-secondary-light/80',
      },
      size: {
        default: 'h-10 py-2 px-2 min-w-[2.5rem]',
        sm: 'h-8 px-3 text-sm',
        lg: 'h-11 px-8 text-lg',
      },
    },
    defaultVariants: {
      size: 'default',
      color: 'primary',
    },
  }
)

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size, color, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ size, className, color }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
