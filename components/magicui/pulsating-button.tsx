"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface PulsatingButtonProps {
  children: React.ReactNode
  className?: string
  pulseColor?: string
  duration?: string
  onClick?: () => void
}

export function PulsatingButton({
  children,
  className,
  pulseColor = "59, 130, 246", // blue-500 RGB
  duration = "1.5s",
  onClick,
}: PulsatingButtonProps) {
  return (
    <motion.button
      className={cn(
        "relative inline-flex items-center justify-center rounded-lg px-6 py-3 font-medium text-white transition-all duration-300",
        "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600",
        "shadow-lg hover:shadow-xl active:scale-95",
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>

      {/* Pulsating effect */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        style={{
          background: `rgba(${pulseColor}, 0.4)`,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: parseFloat(duration),
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Static background */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500" />
    </motion.button>
  )
}
