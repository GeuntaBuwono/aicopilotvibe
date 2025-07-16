import { cva, type VariantProps } from "class-variance-authority"
import { twMerge } from "tailwind-merge"

const gradientTextVariants = cva("bg-clip-text text-transparent font-bold", {
  variants: {
    variant: {
      primary: "bg-gradient-to-r from-blue-600 to-purple-600",
      secondary: "bg-gradient-to-r from-purple-600 to-pink-600",
      success: "bg-gradient-to-r from-green-600 to-emerald-600",
      rainbow: "bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500",
      sunset: "bg-gradient-to-r from-orange-500 to-red-500",
      ocean: "bg-gradient-to-r from-blue-500 to-cyan-500",
      fire: "bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
      "6xl": "text-6xl",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
})

interface GradientTextProps extends VariantProps<typeof gradientTextVariants> {
  children: React.ReactNode
  className?: string
  animate?: boolean
}

export function GradientText({ children, className, variant, size, animate = false }: GradientTextProps) {
  return (
    <span
      className={twMerge(
        gradientTextVariants({ variant, size }),
        animate && "animate-gradient bg-[length:200%_200%]",
        className
      )}
    >
      {children}
    </span>
  )
}

// Animated gradient text component
export function AnimatedGradientText({
  children,
  className = "",
  direction = "right",
}: {
  children: React.ReactNode
  className?: string
  direction?: "left" | "right" | "up" | "down"
}) {
  const directionClasses = {
    right: "bg-gradient-to-r",
    left: "bg-gradient-to-l",
    up: "bg-gradient-to-t",
    down: "bg-gradient-to-b",
  }

  return (
    <span
      className={twMerge(
        "bg-clip-text font-bold text-transparent",
        directionClasses[direction],
        "from-blue-600 via-purple-600 to-pink-600",
        "animate-gradient bg-[length:200%_200%]",
        className
      )}
    >
      {children}
    </span>
  )
}

// Typing animation component
export function TypingText({
  text,
  className = "",
  speed = 100,
}: {
  text: string
  className?: string
  speed?: number
}) {
  return (
    <span
      className={twMerge("inline-block", className)}
      style={{
        animation: `typing ${text.length * speed}ms steps(${text.length}, end)`,
      }}
    >
      {text}
    </span>
  )
}

// Add this to your global CSS file (styles/globals.css)
export const gradientKeyframes = `
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient {
  animation: gradient 3s ease infinite;
}

@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}
`
