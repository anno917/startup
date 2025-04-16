"use client"

import { motion } from "framer-motion"
import { ArrowRight, Building, GraduationCap, User, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface HomePageProps {
  navigateTo: (page: string) => void
}

export default function HomePage({ navigateTo }: HomePageProps) {
  const userCards = [
    {
      title: "Parents",
      description: "Track academic progress, connect with teachers, and stay informed.",
      page: "parents",
      icon: Users,
    },
    {
      title: "Students",
      description: "Access resources, monitor performance, and build your future.",
      page: "students",
      icon: GraduationCap,
    },
    {
      title: "Teachers",
      description: "Manage classes, evaluate students, and engage with parents.",
      page: "teachers",
      icon: User,
    },
    {
      title: "Institutions",
      description: "Streamline operations, enhance communication, and grow your reach.",
      page: "institutions",
      icon: Building,
    },
  ]

  return (
    <>
      <section className="max-w-7xl mx-auto text-center py-20 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-blue-800 mb-4"
        >
          Welcome to Cumpass
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
        >
          Your all-in-one EdTech platform connecting parents, students, teachers, and institutions seamlessly.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center gap-4"
        >
          <Button
            size="lg"
            className="text-white bg-blue-600 hover:bg-blue-700"
            onClick={() => navigateTo("students")}
          >
            Get Started
          </Button>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </motion.div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mt-12 px-6 pb-20">
        {userCards.map((item, i) => (
          <motion.div
            key={item.page}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * i + 0.5 }}
            className="h-full"
          >
            <Card className="hover:shadow-xl transition duration-300 h-full flex flex-col">
              <CardHeader className="flex items-center gap-3 !pb-3">
                <item.icon className="w-6 h-6 text-blue-600" />
                <CardTitle className="text-xl !mb-0">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-6 flex flex-col flex-grow !pt-0">
                <p className="text-gray-600 mb-4 flex-grow">{item.description}</p>
                <Button
                  variant="link"
                  className="text-blue-600 flex items-center gap-1 mt-auto self-start px-0 h-auto"
                  onClick={() => navigateTo(item.page)}
                >
                  Explore <ArrowRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>
    </>
  )
}
