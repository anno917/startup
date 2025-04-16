"use client"

import type React from "react"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  BarChart,
  Search,
  Plus,
  MoreHorizontal,
  ChevronDown,
  CheckCircle,
  XCircle,
  AlertCircle,
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

// Class Card Component
const ClassCard = ({ classData }: { classData: any }) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardHeader className="pb-2">
      <div className="flex justify-between items-start">
        <CardTitle className="text-lg">{classData.name}</CardTitle>
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
            <DropdownMenuItem>View Class</DropdownMenuItem>
            <DropdownMenuItem>Edit Class</DropdownMenuItem>
            <DropdownMenuItem>Manage Students</DropdownMenuItem>
            <DropdownMenuItem>View Assignments</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">Archive Class</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex items-center gap-2 mt-1">
        <Badge variant={classData.status === "Active" ? "default" : "secondary"}>{classData.status}</Badge>
        <span className="text-sm text-gray-500">
          {classData.schedule.day} {classData.schedule.time}
        </span>
      </div>
    </CardHeader>
    <CardContent className="pb-2">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-500">Students</span>
        <span className="font-medium">
          {classData.students.enrolled}/{classData.students.capacity}
        </span>
      </div>
      <Progress value={(classData.students.enrolled / classData.students.capacity) * 100} className="h-2" />

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="text-center p-2 bg-gray-50 rounded">
          <p className="text-xs text-gray-500">Assignments</p>
          <p className="font-medium">{classData.assignments}</p>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded">
          <p className="text-xs text-gray-500">Avg. Grade</p>
          <p className="font-medium">{classData.averageGrade}/10</p>
        </div>
      </div>
    </CardContent>
    <CardFooter className="pt-2">
      <Button variant="outline" size="sm" className="w-full">
        Manage Class
      </Button>
    </CardFooter>
  </Card>
)

// Student Row Component
const StudentRow = ({ student }: { student: any }) => (
  <tr className="hover:bg-gray-50">
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <img
          src={student.avatar || "https://placehold.co/40x40/e0f2fe/0891b2?text=S"}
          alt={student.name}
          className="w-8 h-8 rounded-full mr-3"
        />
        <div>
          <p className="font-medium text-gray-900">{student.name}</p>
          <p className="text-xs text-gray-500">{student.email}</p>
        </div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.class}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.grade}/10</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.attendance}%</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      <Badge
        variant={student.status === "Active" ? "default" : student.status === "At Risk" ? "destructive" : "outline"}
      >
        {student.status}
      </Badge>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      <Button variant="ghost" size="sm">
        View
      </Button>
    </td>
  </tr>
)

// Assignment Row Component
const AssignmentRow = ({ assignment }: { assignment: any }) => (
  <tr className="hover:bg-gray-50">
    <td className="px-6 py-4 whitespace-nowrap">
      <div>
        <p className="font-medium text-gray-900">{assignment.title}</p>
        <p className="text-xs text-gray-500">{assignment.class}</p>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{assignment.type}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{assignment.dueDate}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      <div className="flex items-center">
        {assignment.status === "Published" && <CheckCircle className="w-4 h-4 text-green-500 mr-1" />}
        {assignment.status === "Draft" && <AlertCircle className="w-4 h-4 text-amber-500 mr-1" />}
        {assignment.status === "Archived" && <XCircle className="w-4 h-4 text-gray-400 mr-1" />}
        {assignment.status}
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {assignment.submissions}/{assignment.totalStudents}
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
          <DropdownMenuItem>Edit Assignment</DropdownMenuItem>
          <DropdownMenuItem>Grade Submissions</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </td>
  </tr>
)

// Mock Data
const mockTeacherData = {
  name: "Emily Carter",
  classes: [
    {
      id: 1,
      name: "AP Physics",
      status: "Active",
      schedule: { day: "Mon/Wed", time: "9:00 AM - 10:30 AM" },
      students: { enrolled: 24, capacity: 30 },
      assignments: 12,
      averageGrade: 8.5,
    },
    {
      id: 2,
      name: "Introduction to Quantum Mechanics",
      status: "Active",
      schedule: { day: "Mon/Fri", time: "1:00 PM - 2:30 PM" },
      students: { enrolled: 18, capacity: 25 },
      assignments: 8,
      averageGrade: 7.9,
    },
    {
      id: 3,
      name: "Physics for College Entrance Exams",
      status: "Active",
      schedule: { day: "Tue/Thu", time: "10:00 AM - 11:30 AM" },
      students: { enrolled: 28, capacity: 30 },
      assignments: 15,
      averageGrade: 8.2,
    },
    {
      id: 4,
      name: "Advanced Thermodynamics",
      status: "Upcoming",
      schedule: { day: "Tue/Thu", time: "1:00 PM - 2:30 PM" },
      students: { enrolled: 12, capacity: 25 },
      assignments: 0,
      averageGrade: 0,
    },
  ],
  students: [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex.j@example.com",
      avatar: "https://placehold.co/40x40/e0f2fe/0891b2?text=AJ",
      class: "AP Physics",
      grade: 9.2,
      attendance: 98,
      status: "Active",
    },
    {
      id: 2,
      name: "Mia Williams",
      email: "mia.w@example.com",
      avatar: "https://placehold.co/40x40/fce7f3/db2777?text=MW",
      class: "AP Physics",
      grade: 8.7,
      attendance: 95,
      status: "Active",
    },
    {
      id: 3,
      name: "Ethan Brown",
      email: "ethan.b@example.com",
      avatar: "https://placehold.co/40x40/f0fdfa/0d9488?text=EB",
      class: "Introduction to Quantum Mechanics",
      grade: 7.5,
      attendance: 85,
      status: "At Risk",
    },
    {
      id: 4,
      name: "Sophia Garcia",
      email: "sophia.g@example.com",
      avatar: "https://placehold.co/40x40/eff6ff/3b82f6?text=SG",
      class: "Physics for College Entrance Exams",
      grade: 9.5,
      attendance: 100,
      status: "Active",
    },
    {
      id: 5,
      name: "Noah Martinez",
      email: "noah.m@example.com",
      avatar: "https://placehold.co/40x40/fef2f2/ef4444?text=NM",
      class: "Physics for College Entrance Exams",
      grade: 6.8,
      attendance: 78,
      status: "At Risk",
    },
  ],
  assignments: [
    {
      id: 1,
      title: "Mechanics Problem Set",
      class: "AP Physics",
      type: "Homework",
      dueDate: "2025-04-20",
      status: "Published",
      submissions: 20,
      totalStudents: 24,
    },
    {
      id: 2,
      title: "Quantum States Quiz",
      class: "Introduction to Quantum Mechanics",
      type: "Quiz",
      dueDate: "2025-04-18",
      status: "Published",
      submissions: 15,
      totalStudents: 18,
    },
    {
      id: 3,
      title: "Midterm Exam",
      class: "Physics for College Entrance Exams",
      type: "Exam",
      dueDate: "2025-04-25",
      status: "Draft",
      submissions: 0,
      totalStudents: 28,
    },
    {
      id: 4,
      title: "Wave-Particle Duality Essay",
      class: "Introduction to Quantum Mechanics",
      type: "Essay",
      dueDate: "2025-04-30",
      status: "Published",
      submissions: 5,
      totalStudents: 18,
    },
    {
      id: 5,
      title: "Thermodynamics Lab Report",
      class: "AP Physics",
      type: "Lab Report",
      dueDate: "2025-04-15",
      status: "Archived",
      submissions: 24,
      totalStudents: 24,
    },
  ],
  stats: {
    totalStudents: 82,
    activeClasses: 3,
    upcomingClasses: 1,
    averageAttendance: 91,
  },
}

export default function ManageClassesPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [classFilter, setClassFilter] = useState("all")
  const [studentFilter, setStudentFilter] = useState("all")
  const [assignmentFilter, setAssignmentFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  // Filter classes based on status
  const filteredClasses = mockTeacherData.classes.filter((classItem) => {
    if (classFilter === "all") return true
    if (classFilter === "active") return classItem.status === "Active"
    if (classFilter === "upcoming") return classItem.status === "Upcoming"
    return true
  })

  // Filter students based on status and search term
  const filteredStudents = mockTeacherData.students.filter((student) => {
    const matchesStatus =
      studentFilter === "all" ||
      (studentFilter === "active" && student.status === "Active") ||
      (studentFilter === "at-risk" && student.status === "At Risk")

    const matchesSearch =
      searchTerm === "" ||
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesStatus && matchesSearch
  })

  // Filter assignments based on status
  const filteredAssignments = mockTeacherData.assignments.filter((assignment) => {
    if (assignmentFilter === "all") return true
    return assignment.status.toLowerCase() === assignmentFilter
  })

  return (
    <section className="max-w-7xl mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <PageTitle title="Teacher Dashboard" icon={LayoutDashboard} />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="classes">Classes</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
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
                  value={mockTeacherData.stats.totalStudents.toString()}
                  icon={Users}
                  color="text-blue-600"
                />
                <StatCard
                  title="Active Classes"
                  value={mockTeacherData.stats.activeClasses.toString()}
                  icon={BookOpen}
                  color="text-purple-600"
                />
                <StatCard
                  title="Upcoming Classes"
                  value={mockTeacherData.stats.upcomingClasses.toString()}
                  icon={Calendar}
                  color="text-green-600"
                />
                <StatCard
                  title="Avg. Attendance"
                  value={`${mockTeacherData.stats.averageAttendance}%`}
                  icon={BarChart}
                  color="text-amber-600"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Recent Classes</CardTitle>
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
                              Schedule
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
                              Avg. Grade
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {mockTeacherData.classes
                            .filter((c) => c.status === "Active")
                            .slice(0, 3)
                            .map((classItem, index) => (
                              <tr key={index} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {classItem.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {classItem.schedule.day} {classItem.schedule.time}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {classItem.students.enrolled}/{classItem.students.capacity}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {classItem.averageGrade}/10
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-50 border-t">
                    <Button variant="ghost" size="sm" className="w-full" onClick={() => setActiveTab("classes")}>
                      View All Classes
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Assignments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {mockTeacherData.assignments
                        .filter((a) => a.status === "Published" || a.status === "Draft")
                        .slice(0, 3)
                        .map((assignment, index) => (
                          <li key={index} className="border-b pb-3 last:border-b-0 last:pb-0">
                            <div className="flex justify-between">
                              <h4 className="font-medium">{assignment.title}</h4>
                              <Badge variant={assignment.status === "Published" ? "default" : "secondary"}>
                                {assignment.status}
                              </Badge>
                            </div>
                            <div className="flex justify-between text-sm text-gray-500 mt-1">
                              <span>{assignment.class}</span>
                              <span>Due: {assignment.dueDate}</span>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="bg-gray-50 border-t">
                    <Button variant="ghost" size="sm" className="w-full" onClick={() => setActiveTab("assignments")}>
                      View All Assignments
                    </Button>
                  </CardFooter>
                </Card>
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredClasses.map((classItem, index) => (
                  <ClassCard key={index} classData={classItem} />
                ))}
                {filteredClasses.length === 0 && (
                  <div className="col-span-full text-center py-10">
                    <p className="text-gray-500">No classes found matching the filter criteria.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="students">
              <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search students..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-full sm:w-64"
                    />
                  </div>
                  <Select value={studentFilter} onValueChange={setStudentFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Students</SelectItem>
                      <SelectItem value="active">Active Students</SelectItem>
                      <SelectItem value="at-risk">At Risk Students</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-sm text-gray-500">Showing {filteredStudents.length} students</span>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" /> Add Student
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
                            Class
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
                            Attendance
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
                        {filteredStudents.map((student, index) => (
                          <StudentRow key={index} student={student} />
                        ))}
                        {filteredStudents.length === 0 && (
                          <tr>
                            <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                              No students found matching the filter criteria.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assignments">
              <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Select value={assignmentFilter} onValueChange={setAssignmentFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Assignments</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-sm text-gray-500">Showing {filteredAssignments.length} assignments</span>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" /> Create Assignment
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
                            Assignment
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Type
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Due Date
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Submissions
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredAssignments.map((assignment, index) => (
                          <AssignmentRow key={index} assignment={assignment} />
                        ))}
                        {filteredAssignments.length === 0 && (
                          <tr>
                            <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                              No assignments found matching the filter criteria.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </section>
  )
}
