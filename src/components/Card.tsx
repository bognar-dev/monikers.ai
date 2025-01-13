'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import TextRotate from '@/components/fancy/text-rotate'

interface CardProps {
  card: {
    text: string
    category: string
  }
}

export default function GameCard({ card }: CardProps) {
  return (
    <motion.div
      initial={{ rotateY: 180 }}
      animate={{ rotateY: 0 }}
      transition={{ duration: 0.6 }}
      className="perspective w-full"
    >
      <Card className=" shadow-lg border-2 border-primary/20 h-48">
        <CardContent className="p-6 flex flex-col justify-between h-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-accent font-medium"
          >
            {card.category}
          </motion.div>
          <TextRotate
            texts={[card.text]}
            mainClassName="text-3xl font-popfine text-primary text-center flex-grow flex items-center justify-center"
            staggerFrom="first"
            animatePresenceMode="sync"
            loop={false}
            auto={false}
            staggerDuration={0.05}
            splitBy="words"
          />
        </CardContent>
      </Card>
    </motion.div>
  )
}
