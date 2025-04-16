"use client"

import { useState } from "react"
import {
  Users,
  GraduationCap,
  School,
  Building2,
  Search,
  BookOpen,
  BarChart3,
  Calendar,
  MessageSquare,
  ShoppingCart,
  FileText,
  CheckCircle2,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

interface UserGuidePageProps {
  userType?: "parent" | "student" | "teacher" | "institution"
  navigateTo?: (page: string, initialTab?: string | null) => void
}

export default function UserGuidePage({ userType = "parent", navigateTo }: UserGuidePageProps) {
  const [activeTab, setActiveTab] = useState(userType)

  const handleNavigate = (page: string, initialTab: string | null = null) => {
    if (navigateTo) {
      navigateTo(page, initialTab)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">How Cumpass Can Help You</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover the features and benefits tailored to your needs as a {activeTab}.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-12">
          <TabsTrigger value="parent" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            <Users className="w-4 h-4 mr-2" /> Parents
          </TabsTrigger>
          <TabsTrigger value="student" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            <GraduationCap className="w-4 h-4 mr-2" /> Students
          </TabsTrigger>
          <TabsTrigger value="teacher" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            <BookOpen className="w-4 h-4 mr-2" /> Teachers
          </TabsTrigger>
          <TabsTrigger value="institution" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            <Building2 className="w-4 h-4 mr-2" /> Institutions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="parent">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-blue-800 mb-4">For Parents</h2>
              <p className="text-lg text-gray-600 mb-6">
                As a parent, Cumpass helps you find the best educational opportunities for your children, track their
                progress, and stay connected with their learning journey.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                    <Search className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Find the Perfect School</h3>
                    <p className="text-gray-600">
                      Search, compare, and evaluate schools based on curriculum, location, fees, and more to find the
                      best fit for your child.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full text-green-600">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Connect with Teachers</h3>
                    <p className="text-gray-600">
                      Find qualified teachers for additional support, tutoring, or specialized subjects to enhance your
                      child's education.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-full text-purple-600">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Track Progress</h3>
                    <p className="text-gray-600">
                      Monitor your child's academic performance, attendance, and activities in real-time through our
                      intuitive dashboard.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-80 lg:h-96">
              <Image
                src="/placeholder.svg?height=400&width=600&text=Parents+Using+Cumpass"
                alt="Parents using Cumpass"
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          <h3 className="text-2xl font-bold text-center mb-8">Key Features for Parents</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center text-blue-600 mb-4">
                  <Search className="w-6 h-6" />
                </div>
                <CardTitle>Find Schools & Teachers</CardTitle>
                <CardDescription>Comprehensive search tools to find the best educational resources</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Use our advanced filters to find schools and teachers based on location, curriculum, fees, ratings,
                  and more. Compare options side by side to make informed decisions.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleNavigate("find-resources", "schools")}
                >
                  Explore Now <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center text-green-600 mb-4">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <CardTitle>Track Your Child</CardTitle>
                <CardDescription>Monitor academic progress and activities</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Stay updated on your child's grades, attendance, homework, and extracurricular activities. Receive
                  notifications about important events and achievements.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => handleNavigate("parents-track-kid")}>
                  Track Now <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center text-purple-600 mb-4">
                  <ShoppingCart className="w-6 h-6" />
                </div>
                <CardTitle>Educational Resources</CardTitle>
                <CardDescription>Access learning materials and courses</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Browse and purchase educational materials, books, and online courses to support your child's learning
                  journey at home and beyond the classroom.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => handleNavigate("store")}>
                  Shop Now <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => handleNavigate("find-resources", "schools")}
            >
              Start Exploring Schools <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="student">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-blue-800 mb-4">For Students</h2>
              <p className="text-lg text-gray-600 mb-6">
                As a student, Cumpass empowers you to take control of your education, track your progress, and access
                resources to help you excel in your studies.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                    <School className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Find Educational Opportunities</h3>
                    <p className="text-gray-600">
                      Discover schools, programs, and courses that align with your interests and career goals.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full text-green-600">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Access Learning Resources</h3>
                    <p className="text-gray-600">
                      Get study materials, practice tests, and educational content to support your learning journey.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-full text-purple-600">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Track Your Progress</h3>
                    <p className="text-gray-600">
                      Monitor your academic performance, set goals, and celebrate achievements through our student
                      dashboard.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-80 lg:h-96">
              <Image
                src="/placeholder.svg?height=400&width=600&text=Students+Using+Cumpass"
                alt="Students using Cumpass"
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          <h3 className="text-2xl font-bold text-center mb-8">Key Features for Students</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center text-blue-600 mb-4">
                  <Search className="w-6 h-6" />
                </div>
                <CardTitle>Find Schools & Teachers</CardTitle>
                <CardDescription>Discover educational opportunities that match your goals</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Search for schools and teachers based on your interests, learning style, and career aspirations. Find
                  the right educational path for your future.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleNavigate("find-resources", "schools")}
                >
                  Explore Now <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center text-green-600 mb-4">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <CardTitle>Track Your Progress</CardTitle>
                <CardDescription>Monitor your academic journey and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  View your grades, assignments, and progress in real-time. Set goals, track your improvement, and
                  identify areas where you need additional support.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => handleNavigate("students-track-progress")}>
                  Track Now <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center text-purple-600 mb-4">
                  <BookOpen className="w-6 h-6" />
                </div>
                <CardTitle>My Courses</CardTitle>
                <CardDescription>Access and manage your enrolled courses</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Keep track of your enrolled courses, access learning materials, submit assignments, and communicate
                  with your teachers all in one place.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => handleNavigate("students-my-courses")}>
                  View Courses <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => handleNavigate("students-track-progress")}
            >
              Track Your Progress <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="teacher">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-blue-800 mb-4">For Teachers</h2>
              <p className="text-lg text-gray-600 mb-6">
                As a teacher, Cumpass provides tools to showcase your expertise, connect with students, and manage your
                classes efficiently.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Professional Profile</h3>
                    <p className="text-gray-600">
                      Create a comprehensive profile highlighting your qualifications, experience, and teaching approach
                      to attract students.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full text-green-600">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Class Management</h3>
                    <p className="text-gray-600">
                      Organize your classes, schedule sessions, track attendance, and manage assignments all in one
                      place.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-full text-purple-600">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Connect with Students</h3>
                    <p className="text-gray-600">
                      Communicate with students and parents, share resources, and provide feedback on assignments.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-80 lg:h-96">
              <Image
                src="/placeholder.svg?height=400&width=600&text=Teachers+Using+Cumpass"
                alt="Teachers using Cumpass"
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          <h3 className="text-2xl font-bold text-center mb-8">Key Features for Teachers</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center text-blue-600 mb-4">
                  <FileText className="w-6 h-6" />
                </div>
                <CardTitle>Teacher Profile</CardTitle>
                <CardDescription>Showcase your expertise and credentials</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Create a professional profile highlighting your qualifications, teaching experience, certifications,
                  and teaching philosophy to attract students and parents.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => handleNavigate("teachers-profile")}>
                  Manage Profile <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center text-green-600 mb-4">
                  <Calendar className="w-6 h-6" />
                </div>
                <CardTitle>Manage Classes</CardTitle>
                <CardDescription>Organize and track your teaching activities</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Schedule classes, track attendance, manage assignments, and grade student work. Keep all your teaching
                  activities organized in one place.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => handleNavigate("teachers-manage-classes")}>
                  Manage Classes <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center text-purple-600 mb-4">
                  <BookOpen className="w-6 h-6" />
                </div>
                <CardTitle>Create Courses</CardTitle>
                <CardDescription>Develop and share educational content</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Create online courses, share educational resources, and develop learning materials that students can
                  access anytime, anywhere.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => handleNavigate("store")}>
                  Create Content <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => handleNavigate("teachers-profile")}
            >
              Manage Your Profile <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="institution">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-blue-800 mb-4">For Institutions</h2>
              <p className="text-lg text-gray-600 mb-6">
                As an educational institution, Cumpass offers powerful tools to showcase your programs, manage
                operations, and connect with prospective students and parents.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Institutional Profile</h3>
                    <p className="text-gray-600">
                      Create a comprehensive profile showcasing your facilities, programs, faculty, and achievements to
                      attract students.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full text-green-600">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">School Management</h3>
                    <p className="text-gray-600">
                      Manage admissions, track student data, organize classes, and coordinate with faculty all in one
                      platform.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-full text-purple-600">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Streamline Operations</h3>
                    <p className="text-gray-600">
                      Simplify administrative tasks, manage resources, and improve communication between staff,
                      students, and parents.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-80 lg:h-96">
              <Image
                src="/placeholder.svg?height=400&width=600&text=Institutions+Using+Cumpass"
                alt="Institutions using Cumpass"
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          <h3 className="text-2xl font-bold text-center mb-8">Key Features for Institutions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center text-blue-600 mb-4">
                  <Building2 className="w-6 h-6" />
                </div>
                <CardTitle>School Profile</CardTitle>
                <CardDescription>Showcase your institution to prospective students</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Create a comprehensive profile highlighting your facilities, programs, faculty, achievements, and
                  unique selling points to attract students and parents.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => handleNavigate("institutions-profile")}>
                  Manage Profile <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center text-green-600 mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <CardTitle>Manage School</CardTitle>
                <CardDescription>Streamline administrative operations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Manage admissions, track student data, organize classes, and coordinate with faculty. Streamline
                  administrative tasks and improve operational efficiency.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleNavigate("institutions-manage-school")}
                >
                  Manage School <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center text-purple-600 mb-4">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <CardTitle>Communication Hub</CardTitle>
                <CardDescription>Connect with students, parents, and staff</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Facilitate communication between administrators, teachers, students, and parents. Share announcements,
                  events, and important updates with your school community.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleNavigate("institutions-manage-school")}
                >
                  Access Hub <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => handleNavigate("institutions-profile")}
            >
              Manage Your Institution <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
