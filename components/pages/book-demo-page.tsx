"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface BookDemoPageProps {
  navigateTo: (page: string) => void
}

export default function BookDemoPage({ navigateTo }: BookDemoPageProps) {
  return (
    <div className="container mx-auto py-12 px-4 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Book a Demo</CardTitle>
            <CardDescription>
              Schedule a personalized demo to learn how Cumpass can help you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              This feature is coming soon. Please check back later or contact us for more information.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => navigateTo("home")}>
              Back to Home
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
} 