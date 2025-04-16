"use client"

import { Building, GraduationCap, Users, BookOpen, Target, Lightbulb, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AboutUsPage() {
  return (
    <section className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">About Cumpass</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Empowering learners by connecting them with the right educational resources and services.
        </p>
      </div>

      {/* Who We Are Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Who We Are</h2>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 shadow-sm">
          <p className="text-gray-700 leading-relaxed">
            Cumpass is a digital platform designed to empower learners by connecting them with the right educational
            resources and services. Created by a team of service marketing and business students at the University of
            Tlemcen, Cumpass bridges the gap between knowledge seekers and providers through innovation and
            accessibility.
          </p>
        </div>
      </div>

      {/* Mission and Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <Card className="bg-blue-50 border-none shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-100 rounded-full mr-3">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Our Mission</h2>
            </div>
            <p className="text-gray-700">
              Our mission is to make learning more accessible, personalized, and efficient by leveraging digital tools
              to support students, educators, and lifelong learners.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-indigo-50 border-none shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-indigo-100 rounded-full mr-3">
                <Lightbulb className="h-6 w-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Our Vision</h2>
            </div>
            <p className="text-gray-700">
              We envision a future where every learner, regardless of background or location, has access to tailored
              educational content and services that support their personal and professional growth.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Our Story */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">The Idea Behind Cumpass</h2>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-gray-700 leading-relaxed mb-4">
            Cumpass was born from a final-year academic project at the University of Tlemcen, driven by the desire to
            solve real-world learning challenges. Inspired by personal experiences and market gaps, we transformed our
            idea into a growing digital initiative.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We noticed that students often struggled to find the right resources, tutors, and educational services that
            matched their specific needs. At the same time, qualified teachers and educational institutions lacked
            efficient ways to connect with potential students. Cumpass was created to bridge this gap, providing a
            comprehensive platform where education seekers and providers could connect seamlessly.
          </p>
        </div>
      </div>

      {/* Meet the Team */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Team Member 1 */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-center">
              <Users className="h-20 w-20 text-white opacity-50" />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">Team Member Name</h3>
              <p className="text-gray-600 text-sm mb-2">Co-Founder & Marketing Lead</p>
              <p className="text-gray-700 text-sm">
                "I believe education should be accessible to everyone, regardless of their background."
              </p>
            </div>
          </div>

          {/* Team Member 2 */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <div className="h-48 bg-gradient-to-r from-indigo-400 to-indigo-500 flex items-center justify-center">
              <Users className="h-20 w-20 text-white opacity-50" />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">Team Member Name</h3>
              <p className="text-gray-600 text-sm mb-2">Co-Founder & Product Lead</p>
              <p className="text-gray-700 text-sm">
                "Technology can transform education when it's designed with the learner in mind."
              </p>
            </div>
          </div>

          {/* Team Member 3 */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <div className="h-48 bg-gradient-to-r from-purple-400 to-purple-500 flex items-center justify-center">
              <Users className="h-20 w-20 text-white opacity-50" />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">Team Member Name</h3>
              <p className="text-gray-600 text-sm mb-2">Co-Founder & Technical Lead</p>
              <p className="text-gray-700 text-sm">
                "Creating connections between students and educators is the key to better learning outcomes."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Cumpass */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Why Choose Cumpass?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-none shadow-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-blue-100 rounded-full mb-4">
                  <Building className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-medium text-gray-800 mb-2">Accessibility</h3>
                <p className="text-gray-600 text-sm">
                  We make quality education accessible to all, breaking down geographical and socioeconomic barriers.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-indigo-100 rounded-full mb-4">
                  <GraduationCap className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="font-medium text-gray-800 mb-2">Personalization</h3>
                <p className="text-gray-600 text-sm">
                  Our platform tailors educational experiences to individual needs, learning styles, and goals.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-purple-100 rounded-full mb-4">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-medium text-gray-800 mb-2">Innovation</h3>
                <p className="text-gray-600 text-sm">
                  We continuously evolve our platform with cutting-edge tools and approaches to enhance learning.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-pink-100 rounded-full mb-4">
                  <Heart className="h-6 w-6 text-pink-600" />
                </div>
                <h3 className="font-medium text-gray-800 mb-2">Student-driven</h3>
                <p className="text-gray-600 text-sm">
                  Created by students for students, we understand the challenges and needs of modern learners.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Join Us in Building a Smarter Way to Learn</h2>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Be part of the Cumpass journey as we transform education through connection, innovation, and accessibility.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Get Started
          </Button>
          <Button size="lg" variant="outline">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  )
}
