"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedListProps {
  children: React.ReactNode
  className?: string
  delay?: number
  stagger?: number
  animation?: "fadeIn" | "slideUp" | "slideLeft" | "scale"
}

export function AnimatedList({
  children,
  className,
  delay = 0,
  stagger = 0.1,
  animation = "fadeIn",
}: AnimatedListProps) {
  const animations = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    slideUp: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
    slideLeft: {
      hidden: { opacity: 0, x: 20 },
      visible: { opacity: 1, x: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  }

  const itemVariants = animations[animation]

  return (
    <motion.div
      className={cn("space-y-4", className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      viewport={{ once: true }}
    >
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <motion.div key={index} variants={itemVariants}>
            {child as React.ReactNode}
          </motion.div>
        ))
      ) : (
        <motion.div variants={itemVariants}>{children}</motion.div>
      )}
    </motion.div>
  )
}
