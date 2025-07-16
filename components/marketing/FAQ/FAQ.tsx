"use client"

import { useState } from "react"
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text"
import { AnimatedList } from "@/components/magicui/animated-list"
import { MagicCard } from "@/components/magicui/magic-card"
import { TextAnimate } from "@/components/magicui/text-animate"

const faqData = [
  {
    question: "What is your refund policy?",
    answer: "We have a strict no refund policy. All purchases are final and non-refundable. Please consider your purchase carefully before proceeding. This service is provided as-is with no guarantees."
  },
  {
    question: "How long does setup take?",
    answer: "Setup typically takes 24 hours after payment confirmation. You'll receive an email with your GitHub access credentials and instructions once setup is complete."
  },
  {
    question: "Is there a trial period?",
    answer: "No, we do not offer trial periods. This is an early access service with limited availability for developers who need unlimited AI coding assistance."
  },
  {
    question: "What happens if the service doesn't work for me?",
    answer: "Due to our no refund policy, we cannot provide refunds if the service doesn't meet your expectations. We recommend carefully reviewing the service details before purchasing."
  },
  {
    question: "How do daily token resets work?",
    answer: "Your tokens reset automatically every 24 hours, giving you unlimited access to AI coding assistants like Cursor, Copilot, and Claude Code without hitting rate limits."
  },
  {
    question: "What GitHub access do I get?",
    answer: "You'll receive access to GitHub repositories through our email service, allowing you to bypass token limitations in popular AI coding tools."
  },
  {
    question: "Is there any guarantee the service will work?",
    answer: "No, we provide no guarantees. This is an early access service offered at your own risk. Please understand the terms before purchasing."
  },
  {
    question: "Can I cancel my subscription?",
    answer: "While you can cancel future billing, any payments already made are non-refundable according to our no refund policy."
  }
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 lg:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <TextAnimate
            animation="slideUp"
            by="word"
            delay={0.5}
            duration={1.5}
            className="text-foreground mb-6 text-4xl font-bold md:text-5xl"
          >
            Frequently Asked
          </TextAnimate>
          <AnimatedGradientText
            className="pb-2 text-4xl font-bold md:text-5xl"
            colorFrom="#3b82f6"
            colorTo="#8b5cf6"
            speed={2}
          >
            Questions
          </AnimatedGradientText>
          <TextAnimate
            animation="fadeIn"
            by="word"
            delay={1.5}
            duration={1.2}
            className="text-muted-foreground mx-auto mt-6 max-w-3xl text-xl"
          >
            Everything you need to know about our service, policies, and what to expect.
          </TextAnimate>
        </div>

        {/* FAQ Items */}
        <AnimatedList
          className="space-y-4"
          delay={0.8}
          stagger={0.1}
          animation="slideUp"
        >
          {faqData.map((faq, index) => (
            <MagicCard key={index} className="overflow-hidden">
              <div className="bg-card/50 backdrop-blur-sm">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left transition-all duration-200 hover:bg-muted/20 focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-foreground text-lg font-semibold pr-4">
                      {faq.question}
                    </h3>
                    <div className={`transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}>
                      <svg className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-6 pb-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                    {index === 0 && (
                      <div className="mt-4 inline-flex items-center rounded-full bg-orange-500/10 px-4 py-2 text-orange-600">
                        <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm font-medium">Purchase at your own risk</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </MagicCard>
          ))}
        </AnimatedList>

        {/* Important Notice */}
        <div className="mt-12 text-center">
          <MagicCard className="mx-auto max-w-2xl" gradientOpacity={0.1}>
            <div className="bg-card/50 p-6 backdrop-blur-sm">
              <div className="mb-4 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/20">
                  <svg className="h-6 w-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-foreground mb-2 text-lg font-semibold">Important Service Notice</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                This is an early access service with limited availability. No trial, no refund, no guarantee. 
                All sales are final. Please read our policies carefully before purchasing.
              </p>
            </div>
          </MagicCard>
        </div>
      </div>
    </section>
  )
}