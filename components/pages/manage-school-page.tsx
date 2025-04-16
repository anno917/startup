"use client"

import type React from "react"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  Building,
  Users,
  BookOpen,
  Calendar,
  BarChart,
  Search,
  Plus,
  MoreHorizontal,
  ChevronDown,
  FileText,
  User,
  Briefcase,
  GraduationCap,
  Settings,
  Bell,
  Download,
  MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { PageTitle } from "@/components/ui/page-title"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Stat Card Component
const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
}: { title: string; value: string; icon: React.ElementType; color: string }) => (
  <Card>
    <CardContent className="flex items-center p-6">
      <div className={`p-3 rounded-full ${color.replace("text-", "bg-").replace("600", "100")} mr-4`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
    </CardContent>
  </Card>
)

// Teacher Card Component
const TeacherCard = ({ teacher }: { teacher: any }) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardHeader className="pb-2">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <img
            src={teacher.avatar || "/placeholder.svg"}
            alt={teacher.name}
            className="w-10 h-10 rounded-full"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.onerror = null
              target.src = "https://placehold.co/40x40/cccccc/ffffff?text=T"
            }}
          />
          <div>
            <CardTitle className="text-base">{teacher.name}</CardTitle>
            <p className="text-sm text-gray-500">{teacher.subject}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Profile</DropdownMenuItem>
            <DropdownMenuItem>Edit Details</DropdownMenuItem>
            <DropdownMenuItem>Manage Classes</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">Remove Teacher</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </CardHeader>
    <CardContent className="pb-2">
      <div className="grid grid-cols-2 gap-4 mt-2">
        <div className="text-center p-2 bg-gray-50 rounded">
          <p className="text-xs text-gray-500">Classes</p>
          <p className="font-medium">{teacher.classes}</p>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded">
          <p className="text-xs text-gray-500">Students</p>
          <p className="font-medium">{teacher.students}</p>
        </div>
      </div>
      <div className="mt-3">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-500">Rating</span>
          <span className="font-medium">{teacher.rating}/5.0</span>
        </div>
        <Progress value={(teacher.rating / 5) * 100} className="h-2" />
      </div>
    </CardContent>
    <CardFooter className="pt-2">
      <Button variant="outline" size="sm" className="w-full">
        View Profile
      </Button>
    </CardFooter>
  </Card>
)

// Class Row Component
const ClassRow = ({ classData }: { classData: any }) => (
  <tr className="hover:bg-gray-50">
    <td className="px-6 py-4 whitespace-nowrap">
      <div>
        <p className="font-medium text-gray-900">{classData.name}</p>
        <p className="text-xs text-gray-500">{classData.grade}</p>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{classData.teacher}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {classData.students}/{classData.capacity}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{classData.schedule}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      <Badge
        variant={classData.status === "Active" ? "default" : classData.status === "Upcoming" ? "secondary" : "outline"}
      >
        {classData.status}
      </Badge>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            Actions <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>View Details</DropdownMenuItem>
          <DropdownMenuItem>Edit Class</DropdownMenuItem>
          <DropdownMenuItem>Manage Students</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600">Cancel Class</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </td>
  </tr>
)

// Student Row Component
const StudentRow = ({ student }: { student: any }) => (
  <tr className="hover:bg-gray-50">
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <img src={student.avatar || "/placeholder.svg"} alt={student.name} className="w-8 h-8 rounded-full mr-3" />
        <div>
          <p className="font-medium text-gray-900">{student.name}</p>
          <p className="text-xs text-gray-500">{student.id}</p>
        </div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.grade}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.class}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.gpa}/10</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.attendance}%</td>
    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      <Button variant="ghost" size="sm">
        View
      </Button>
    </td>
  </tr>
)

// Event Card Component
const EventCard = ({ event }: { event: any }) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardHeader className="pb-2">
      <div className="flex justify-between items-start">
        <CardTitle className="text-base">{event.name}</CardTitle>
        <Badge variant={event.status === "Upcoming" ? "secondary" : "default"}>{event.status}</Badge>
      </div>
      <p className="text-sm text-gray-500 mt-1">
        {event.date} • {event.time}
      </p>
    </CardHeader>
    <CardContent className="pb-2">
      <p className="text-sm text-gray-600 mb-3">{event.description}</p>
      <div className="flex justify-between text-xs text-gray-500">
        <span className="flex items-center">
          <MapPin className="w-3 h-3 mr-1" /> {event.location}
        </span>
        <span className="flex items-center">
          <Users className="w-3 h-3 mr-1" /> {event.attendees} attendees
        </span>
      </div>
    </CardContent>
    <CardFooter className="pt-2">
      <Button variant="outline" size="sm" className="w-full">
        Manage Event
      </Button>
    </CardFooter>
  </Card>
)

// Mock Data
const mockSchoolData = {
  name: "Oakwood Elementary School",
  stats: {
    students: 450,
    teachers: 32,
    classes: 24,
    averageAttendance: 94,
  },
  teachers: [
    {
      id: 1,
      name: "Michael Rodriguez",
      subject: "5th Grade",
      avatar: "https://placehold.co/40x40/f0fdfa/0d9488?text=MR",
      classes: 2,
      students: 42,
      rating: 4.9,
    },
    {
      id: 2,
      name: "Emily Chen",
      subject: "3rd Grade",
      avatar: "https://placehold.co/40x40/eff6ff/3b82f6?text=EC",
      classes: 2,
      students: 38,
      rating: 4.7,
    },
    {
      id: 3,
      name: "David Wilson",
      subject: "Science",
      avatar: "https://placehold.co/40x40/fef2f2/ef4444?text=DW",
      classes: 5,
      students: 120,
      rating: 4.5,
    },
    {
      id: 4,
      name: "Sophia Martinez",
      subject: "Art",
      avatar: "https://placehold.co/40x40/fce7f3/db2777?text=SM",
      classes: 6,
      students: 145,
      rating: 4.8,
    },
  ],
  classes: [
    {
      id: 1,
      name: "5th Grade - Room 101",
      grade: "5th Grade",
      teacher: "Michael Rodriguez",
      students: 22,
      capacity: 25,
      schedule: "Mon-Fri, 8:00 AM - 3:00 PM",
      status: "Active",
    },
    {
      id: 2,
      name: "3rd Grade - Room 103",
      grade: "3rd Grade",
      teacher: "Emily Chen",
      students: 20,
      capacity: 25,
      schedule: "Mon-Fri, 8:00 AM - 3:00 PM",
      status: "Active",
    },
    {
      id: 3,
      name: "Science Lab - Room 205",
      grade: "4th-5th Grade",
      teacher: "David Wilson",
      students: 24,
      capacity: 24,
      schedule: "Tue/Thu, 10:00 AM - 11:30 AM",
      status: "Active",
    },
    {
      id: 4,
      name: "Art Studio - Room 302",
      grade: "All Grades",
      teacher: "Sophia Martinez",
      students: 18,
      capacity: 24,
      schedule: "Mon/Wed/Fri, 1:00 PM - 2:30 PM",
      status: "Active",
    },
    {
      id: 5,
      name: "Summer Science Camp",
      grade: "3rd-5th Grade",
      teacher: "David Wilson",
      students: 15,
      capacity: 30,
      schedule: "Jun 15-Jul 15, 9:00 AM - 12:00 PM",
      status: "Upcoming",
    },
  ],
  students: [
    {
      id: "STU-2025-001",
      name: "Alex Johnson",
      avatar: "https://placehold.co/40x40/e0f2fe/0891b2?text=AJ",
      grade: "5th Grade",
      class: "Room 101",
      gpa: 9.2,
      attendance: 98,
    },
    {
      id: "STU-2025-002",
      name: "Mia Williams",
      avatar: "https://placehold.co/40x40/fce7f3/db2777?text=MW",
      grade: "5th Grade",
      class: "Room 101",
      gpa: 8.7,
      attendance: 95,
    },
    {
      id: "STU-2025-003",
      name: "Ethan Brown",
      avatar: "https://placehold.co/40x40/f0fdfa/0d9488?text=EB",
      grade: "3rd Grade",
      class: "Room 103",
      gpa: 7.5,
      attendance: 85,
    },
    {
      id: "STU-2025-004",
      name: "Sophia Garcia",
      avatar: "https://placehold.co/40x40/eff6ff/3b82f6?text=SG",
      grade: "3rd Grade",
      class: "Room 103",
      gpa: 9.5,
      attendance: 100,
    },
    {
      id: "STU-2025-005",
      name: "Noah Martinez",
      avatar: "https://placehold.co/40x40/fef2f2/ef4444?text=NM",
      grade: "4th Grade",
      class: "Room 102",
      gpa: 8.2,
      attendance: 92,
    },
  ],
  events: [
    {
      id: 1,
      name: "Spring Science Fair",
      date: "April 25, 2025",
      time: "3:00 PM - 6:00 PM",
      location: "School Gymnasium",
      description: "Annual science fair showcasing student projects across all grade levels.",
      attendees: 320,
      status: "Upcoming",
    },
    {
      id: 2,
      name: "Parent-Teacher Conference",
      date: "April 18, 2025",
      time: "1:00 PM - 7:00 PM",
      location: "Classrooms",
      description: "Individual meetings between parents and teachers to discuss student progress.",
      attendees: 280,
      status: "Upcoming",
    },
    {
      id: 3,
      name: "Field Day",
      date: "May 10, 2025",
      time: "9:00 AM - 2:00 PM",
      location: "School Grounds",
      description: "A day of outdoor activities, games, and friendly competition for all students.",
      attendees: 450,
      status: "Upcoming",
    },
    {
      id: 4,
      name: "End of Year Concert",
      date: "May 28, 2025",
      time: "6:00 PM - 8:00 PM",
      location: "Auditorium",
      description: "Showcase of student musical performances to celebrate the end of the school year.",
      attendees: 400,
      status: "Planning",
    },
  ],
}

export default function ManageSchoolPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [teacherFilter, setTeacherFilter] = useState("")
  const [classFilter, setClassFilter] = useState("all")
  const [studentFilter, setStudentFilter] = useState("")
  const [eventFilter, setEventFilter] = useState("all")

  // Filter teachers based on search term
  const filteredTeachers = mockSchoolData.teachers.filter((teacher) => {
    if (!teacherFilter) return true
    return (
      teacher.name.toLowerCase().includes(teacherFilter.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(teacherFilter.toLowerCase())
    )
  })

  // Filter classes based on status
  const filteredClasses = mockSchoolData.classes.filter((classItem) => {
    if (classFilter === "all") return true
    return classFilter === classItem.status.toLowerCase()
  })

  // Filter students based on search term
  const filteredStudents = mockSchoolData.students.filter((student) => {
    if (!studentFilter) return true
    return (
      student.name.toLowerCase().includes(studentFilter.toLowerCase()) ||
      student.id.toLowerCase().includes(studentFilter.toLowerCase()) ||
      student.grade.toLowerCase().includes(studentFilter.toLowerCase()) ||
      student.class.toLowerCase().includes(studentFilter.toLowerCase())
    )
  })

  // Filter events based on status
  const filteredEvents = mockSchoolData.events.filter((event) => {
    if (eventFilter === "all") return true
    return eventFilter === event.status.toLowerCase()
  })

  return (
    <section className="max-w-7xl mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <PageTitle title="Institution Dashboard" icon={Building} />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="teachers">Teachers</TabsTrigger>
          <TabsTrigger value="classes">Classes</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  title="Total Students"
                  value={mockSchoolData.stats.students.toString()}
                  icon={Users}
                  color="text-blue-600"
                />
                <StatCard
                  title="Teachers"
                  value={mockSchoolData.stats.teachers.toString()}
                  icon={GraduationCap}
                  color="text-purple-600"
                />
                <StatCard
                  title="Classes"
                  value={mockSchoolData.stats.classes.toString()}
                  icon={BookOpen}
                  color="text-green-600"
                />
                <StatCard
                  title="Avg. Attendance"
                  value={`${mockSchoolData.stats.averageAttendance}%`}
                  icon={BarChart}
                  color="text-amber-600"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Recent Classes</CardTitle>
                    <Button variant="outline" size="sm" onClick={() => setActiveTab("classes")}>
                      View All
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Class
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Teacher
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Students
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {mockSchoolData.classes.slice(0, 3).map((classItem, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <p className="font-medium text-gray-900">{classItem.name}</p>
                                <p className="text-xs text-gray-500">{classItem.grade}</p>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{classItem.teacher}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {classItem.students}/{classItem.capacity}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <Badge variant={classItem.status === "Active" ? "default" : "secondary"}>
                                  {classItem.status}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Upcoming Events</CardTitle>
                    <Button variant="outline" size="sm" onClick={() => setActiveTab("events")}>
                      View All
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {mockSchoolData.events
                        .filter((event) => event.status === "Upcoming")
                        .slice(0, 3)
                        .map((event, index) => (
                          <li key={index} className="border-b pb-3 last:border-b-0 last:pb-0">
                            <div className="flex justify-between">
                              <h4 className="font-medium">{event.name}</h4>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{event.description.substring(0, 60)}...</p>
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                              <span>{event.date}</span>
                              <span>{event.location}</span>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="flex items-center justify-start gap-2 h-auto py-3">
                        <User className="w-4 h-4" />
                        <div className="text-left">
                          <p className="font-medium">Add Student</p>
                          <p className="text-xs text-gray-500">Enroll a new student</p>
                        </div>
                      </Button>
                      <Button variant="outline" className="flex items-center justify-start gap-2 h-auto py-3">
                        <Briefcase className="w-4 h-4" />
                        <div className="text-left">
                          <p className="font-medium">Add Teacher</p>
                          <p className="text-xs text-gray-500">Hire a new teacher</p>
                        </div>
                      </Button>
                      <Button variant="outline" className="flex items-center justify-start gap-2 h-auto py-3">
                        <BookOpen className="w-4 h-4" />
                        <div className="text-left">
                          <p className="font-medium">Create Class</p>
                          <p className="text-xs text-gray-500">Set up a new class</p>
                        </div>
                      </Button>
                      <Button variant="outline" className="flex items-center justify-start gap-2 h-auto py-3">
                        <Calendar className="w-4 h-4" />
                        <div className="text-left">
                          <p className="font-medium">Schedule Event</p>
                          <p className="text-xs text-gray-500">Plan a school event</p>
                        </div>
                      </Button>
                      <Button variant="outline" className="flex items-center justify-start gap-2 h-auto py-3">
                        <Bell className="w-4 h-4" />
                        <div className="text-left">
                          <p className="font-medium">Announcements</p>
                          <p className="text-xs text-gray-500">Send notifications</p>
                        </div>
                      </Button>
                      <Button variant="outline" className="flex items-center justify-start gap-2 h-auto py-3">
                        <Settings className="w-4 h-4" />
                        <div className="text-left">
                          <p className="font-medium">Settings</p>
                          <p className="text-xs text-gray-500">Manage school settings</p>
                        </div>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Reports</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <BarChart className="w-5 h-5 text-blue-600" />
                          <span className="font-medium">Attendance Report</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4 mr-1" /> Download
                        </Button>
                      </li>
                      <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <GraduationCap className="w-5 h-5 text-purple-600" />
                          <span className="font-medium">Academic Performance</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4 mr-1" /> Download
                        </Button>
                      </li>
                      <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-green-600" />
                          <span className="font-medium">Enrollment Statistics</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4 mr-1" /> Download
                        </Button>
                      </li>
                      <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-amber-600" />
                          <span className="font-medium">Financial Summary</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4 mr-1" /> Download
                        </Button>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="teachers">
              <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search teachers..."
                    value={teacherFilter}
                    onChange={(e) => setTeacherFilter(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" /> Add New Teacher
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredTeachers.map((teacher, index) => (
                  <TeacherCard key={index} teacher={teacher} />
                ))}
                {filteredTeachers.length === 0 && (
                  <div className="col-span-full text-center py-10">
                    <p className="text-gray-500">No teachers found matching the search criteria.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="classes">
              <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Select value={classFilter} onValueChange={setClassFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Classes</SelectItem>
                      <SelectItem value="active">Active Classes</SelectItem>
                      <SelectItem value="upcoming">Upcoming Classes</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-sm text-gray-500">Showing {filteredClasses.length} classes</span>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" /> Create New Class
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Class
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Teacher
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Students
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Schedule
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Status
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredClasses.map((classItem, index) => (
                          <ClassRow key={index} classData={classItem} />
                        ))}
                        {filteredClasses.length === 0 && (
                          <tr>
                            <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                              No classes found matching the filter criteria.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="students">
              <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search students..."
                    value={studentFilter}
                    onChange={(e) => setStudentFilter(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" /> Add New Student
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Student
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Grade
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Class
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            GPA
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Attendance
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredStudents.map((student, index) => (
                          <StudentRow key={index} student={student} />
                        ))}
                        {filteredStudents.length === 0 && (
                          <tr>
                            <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                              No students found matching the search criteria.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="events">
              <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Select value={eventFilter} onValueChange={setEventFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Events</SelectItem>
                      <SelectItem value="upcoming">Upcoming Events</SelectItem>
                      <SelectItem value="planning">Planning Stage</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-sm text-gray-500">Showing {filteredEvents.length} events</span>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" /> Create New Event
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event, index) => (
                  <EventCard key={index} event={event} />
                ))}
                {filteredEvents.length === 0 && (
                  <div className="col-span-full text-center py-10">
                    <p className="text-gray-500">No events found matching the filter criteria.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </section>
  )
}
