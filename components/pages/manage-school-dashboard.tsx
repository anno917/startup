"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building,
  BookOpen,
  Users,
  Package,
  ShoppingBag,
  Bell,
  ChevronRight,
  Clock,
  Calendar,
  MessageSquare,
  UserPlus,
  CreditCard,
  Settings,
  GraduationCap,
  School,
  Edit,
  Mail,
  CheckCircle,
  XCircle,
} from "lucide-react"

interface ManageSchoolDashboardProps {
  navigateTo?: (page: string) => void
}

export default function ManageSchoolDashboard({ navigateTo }: ManageSchoolDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data
  const stats = {
    totalStudents: 2500,
    maleStudents: 1200,
    femaleStudents: 1300,
    attendance: [85, 78, 92, 88, 90, 95],
    totalTeachers: 120,
    totalClasses: 45,
    pendingEnrollments: 28,
    unreadMessages: 12,
  }

  const notices = [
    {
      id: 1,
      title: "Annual sports day",
      date: "15 Mar 2024",
      type: "event",
    },
    {
      id: 2,
      title: "Mid-term examination schedule",
      date: "12 Mar 2024",
      type: "academic",
    },
  ]

  const messages = [
    {
      id: 1,
      sender: "John Doe",
      subject: "Parent Meeting Request",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      sender: "Sarah Smith",
      subject: "Curriculum Question",
      time: "5 hours ago",
      unread: true,
    },
  ]

  const enrollmentRequests = [
    {
      id: 1,
      student: "Michael Brown",
      grade: "Grade 8",
      date: "Mar 14, 2024",
      status: "pending",
    },
    {
      id: 2,
      student: "Emma Wilson",
      grade: "Grade 6",
      date: "Mar 13, 2024",
      status: "pending",
    },
  ]

  const recentPayments = [
    {
      id: 1,
      student: "James Wilson",
      amount: "$500",
      date: "Mar 15, 2024",
      type: "Tuition Fee",
    },
    {
      id: 2,
      student: "Lisa Anderson",
      amount: "$150",
      date: "Mar 14, 2024",
      type: "Activity Fee",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Header with School Info */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">Cumpass International School</h1>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Edit className="w-4 h-4" />
                Edit School
              </Button>
            </div>
            <p className="text-gray-500">Academic Year 2023-2024</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {stats.unreadMessages}
              </span>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">School Settings</Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Students</p>
                <h3 className="text-2xl font-bold">{stats.totalStudents}</h3>
              </div>
            </div>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <GraduationCap className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Teachers</p>
                <h3 className="text-2xl font-bold">{stats.totalTeachers}</h3>
              </div>
            </div>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <School className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Classes</p>
                <h3 className="text-2xl font-bold">{stats.totalClasses}</h3>
              </div>
            </div>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <UserPlus className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending Enrollments</p>
                <h3 className="text-2xl font-bold">{stats.pendingEnrollments}</h3>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-6 gap-4 bg-transparent h-auto p-0">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="messages"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              Messages
            </TabsTrigger>
            <TabsTrigger
              value="enrollments"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              Enrollments
            </TabsTrigger>
            <TabsTrigger
              value="payments"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              Payments
            </TabsTrigger>
            <TabsTrigger
              value="calendar"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              Calendar
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Gender Distribution */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Students by Gender</h3>
                <div className="relative w-48 h-48 mx-auto">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <span className="block text-3xl font-bold">{stats.totalStudents}</span>
                      <span className="text-sm text-gray-500">Total</span>
                    </div>
                  </div>
                  <div className="w-full h-full rounded-full border-8 border-blue-500"></div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>Male</span>
                    </div>
                    <span>{stats.maleStudents}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                      <span>Female</span>
                    </div>
                    <span>{stats.femaleStudents}</span>
                  </div>
                </div>
              </Card>

              {/* Attendance Chart */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Weekly Attendance</h3>
                <div className="h-48 flex items-end justify-between gap-2">
                  {stats.attendance.map((value, index) => (
                    <div key={index} className="w-8 bg-blue-100 rounded-t-lg relative">
                      <div
                        className="absolute bottom-0 w-full bg-blue-500 rounded-t-lg transition-all duration-300"
                        style={{ height: `${value}%` }}
                      ></div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-between text-sm text-gray-500">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                </div>
              </Card>
            </div>

            {/* Notice Board */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Notice Board</h3>
                <Button variant="ghost" className="text-blue-600">
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {notices.map((notice) => (
                  <div key={notice.id} className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Bell className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{notice.title}</h4>
                      <p className="text-sm text-gray-500 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {notice.date}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Messages</h3>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Mail className="w-4 h-4 mr-2" />
                  Compose
                </Button>
              </div>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 cursor-pointer ${
                      message.unread ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-lg font-medium text-gray-600">
                        {message.sender.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{message.sender}</h4>
                      <p className="text-sm text-gray-500">{message.subject}</p>
                    </div>
                    <div className="text-sm text-gray-500">{message.time}</div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="enrollments" className="space-y-6">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Enrollment Requests</h3>
                <Button variant="outline">
                  Export List
                </Button>
              </div>
              <div className="space-y-4">
                {enrollmentRequests.map((request) => (
                  <div key={request.id} className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <UserPlus className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{request.student}</h4>
                      <p className="text-sm text-gray-500">{request.grade} • {request.date}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="text-green-600">
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Recent Payments</h3>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <CreditCard className="w-4 h-4 mr-2" />
                  New Payment
                </Button>
              </div>
              <div className="space-y-4">
                {recentPayments.map((payment) => (
                  <div key={payment.id} className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{payment.student}</h4>
                      <p className="text-sm text-gray-500">{payment.type} • {payment.date}</p>
                    </div>
                    <div className="text-lg font-semibold text-green-600">{payment.amount}</div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">School Calendar</h3>
                <div className="flex gap-2">
                  <Button variant="outline">Today</Button>
                  <Button variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    Add Event
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1">
                <div className="col-span-7 grid grid-cols-7 mb-2">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="p-2 text-center font-medium text-gray-500">
                      {day}
                    </div>
                  ))}
                </div>
                {Array.from({ length: 35 }).map((_, i) => {
                  const day = ((i + 1) % 31) + 1
                  const hasEvent = [5, 12, 15, 20].includes(day)
                  const isToday = day === 15
                  return (
                    <div
                      key={i}
                      className={`
                        p-4 border rounded-lg hover:bg-gray-50 cursor-pointer relative
                        ${isToday ? "bg-blue-50 border-blue-200" : ""}
                      `}
                    >
                      <span className={`text-sm ${isToday ? "font-bold text-blue-600" : ""}`}>
                        {day}
                      </span>
                      {hasEvent && (
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">School Settings</h3>
                <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-4">General Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        School Name
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-lg"
                        defaultValue="Cumpass International School"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Academic Year
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-lg"
                        defaultValue="2023-2024"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-4">Contact Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full p-2 border rounded-lg"
                        defaultValue="contact@cumpass.edu"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        className="w-full p-2 border rounded-lg"
                        defaultValue="+1 234 567 890"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
} 