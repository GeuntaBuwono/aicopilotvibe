import { cva, type VariantProps } from "class-variance-authority"
import Link from "next/link"
import { twMerge } from "tailwind-merge"

const button = cva(
  [
    "justify-center",
    "inline-flex",
    "items-center",
    "rounded-xl",
    "text-center",
    "border",
    "border-blue-400",
    "transition-colors",
    "delay-50",
    "cursor-pointer",
  ],
  {
    variants: {
      intent: {
        primary: ["bg-blue-400", "text-white", "hover:enabled:bg-blue-700"],
        secondary: ["bg-transparent", "text-blue-400", "hover:enabled:bg-blue-400", "hover:enabled:text-white"],
      },
      size: {
        sm: ["min-w-20", "h-full", "min-h-10", "text-sm", "py-1.5", "px-4"],
        lg: ["min-w-32", "h-full", "min-h-12", "text-lg", "py-2.5", "px-6"],
      },
      underline: { true: ["underline"], false: [] },
    },
    defaultVariants: {
      intent: "primary",
      size: "lg",
    },
  }
)

export interface ButtonProps extends VariantProps<typeof button> {
  underline?: boolean
  href?: string
  onClick?: () => void
  children: React.ReactNode
  className?: string
  disabled?: boolean
}

export function Button({
  className,
  intent,
  size,
  underline,
  href,
  onClick,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const buttonClass = twMerge(button({ intent, size, className, underline }))

  if (href) {
    return (
      <Link href={href} className={buttonClass} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button className={buttonClass} onClick={onClick} disabled={disabled} {...props}>
      {children}
    </button>
  )
}
