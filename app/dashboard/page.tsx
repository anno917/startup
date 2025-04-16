"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Users,
  GraduationCap,
  School,
  UserPlus,
  Bell,
  ChevronDown,
  Search,
  Calendar,
  Settings,
  BarChart2,
  MessageSquare,
  CreditCard,
  Menu,
} from "lucide-react"

export default function Dashboard() {
  const [selectedMenu, setSelectedMenu] = useState("dashboard")

  // Mock data
  const stats = {
    students: 2500,
    teachers: 120,
    classes: 45,
    pendingEnrollments: 28,
  }

  const recentActivity = [
    {
      id: 1,
      type: "enrollment",
      message: "New enrollment request from John Doe",
      time: "2 minutes ago",
    },
    {
      id: 2,
      type: "payment",
      message: "Payment received for March fees",
      time: "1 hour ago",
    },
    {
      id: 3,
      type: "message",
      message: "New message from Sarah's parent",
      time: "3 hours ago",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-64 h-full bg-white border-r shadow-sm">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600">Cumpass</h1>
        </div>
        <nav className="mt-6">
          <MenuItem
            icon={<BarChart2 />}
            title="Dashboard"
            active={selectedMenu === "dashboard"}
            onClick={() => setSelectedMenu("dashboard")}
          />
          <MenuItem
            icon={<Users />}
            title="Students"
            active={selectedMenu === "students"}
            onClick={() => setSelectedMenu("students")}
          />
          <MenuItem
            icon={<GraduationCap />}
            title="Teachers"
            active={selectedMenu === "teachers"}
            onClick={() => setSelectedMenu("teachers")}
          />
          <MenuItem
            icon={<School />}
            title="Classes"
            active={selectedMenu === "classes"}
            onClick={() => setSelectedMenu("classes")}
          />
          <MenuItem
            icon={<MessageSquare />}
            title="Messages"
            active={selectedMenu === "messages"}
            onClick={() => setSelectedMenu("messages")}
          />
          <MenuItem
            icon={<Calendar />}
            title="Calendar"
            active={selectedMenu === "calendar"}
            onClick={() => setSelectedMenu("calendar")}
          />
          <MenuItem
            icon={<CreditCard />}
            title="Payments"
            active={selectedMenu === "payments"}
            onClick={() => setSelectedMenu("payments")}
          />
          <MenuItem
            icon={<Settings />}
            title="Settings"
            active={selectedMenu === "settings"}
            onClick={() => setSelectedMenu("settings")}
          />
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">School Dashboard</h1>
            <p className="text-gray-500">Welcome back, Admin</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">3</span>
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
              <ChevronDown className="w-5 h-5 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<Users className="w-6 h-6 text-blue-600" />}
            title="Total Students"
            value={stats.students}
            bgColor="bg-blue-50"
          />
          <StatCard
            icon={<GraduationCap className="w-6 h-6 text-green-600" />}
            title="Teachers"
            value={stats.teachers}
            bgColor="bg-green-50"
          />
          <StatCard
            icon={<School className="w-6 h-6 text-purple-600" />}
            title="Classes"
            value={stats.classes}
            bgColor="bg-purple-50"
          />
          <StatCard
            icon={<UserPlus className="w-6 h-6 text-orange-600" />}
            title="Pending Enrollments"
            value={stats.pendingEnrollments}
            bgColor="bg-orange-50"
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Charts Section */}
          <Card className="col-span-2 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Attendance Overview</h2>
              <Button variant="outline" size="sm">
                View Report
              </Button>
            </div>
            <div className="h-80 bg-gray-50 rounded-lg flex items-center justify-center">
              {/* Placeholder for chart */}
              <p className="text-gray-500">Attendance Chart</p>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50"
                >
                  <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                  <div>
                    <p className="text-sm text-gray-600">{activity.message}</p>
                    <span className="text-xs text-gray-400">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4">
              View All Activity
            </Button>
          </Card>

          {/* Calendar Section */}
          <Card className="col-span-2 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Calendar</h2>
              <Button variant="outline" size="sm">
                Add Event
              </Button>
            </div>
            <div className="h-80 bg-gray-50 rounded-lg flex items-center justify-center">
              {/* Placeholder for calendar */}
              <p className="text-gray-500">Calendar View</p>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-6">Quick Actions</h2>
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <UserPlus className="w-5 h-5 mr-2" />
                Add New Student
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <GraduationCap className="w-5 h-5 mr-2" />
                Add New Teacher
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <School className="w-5 h-5 mr-2" />
                Create Class
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="w-5 h-5 mr-2" />
                Send Announcement
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

// MenuItem Component
function MenuItem({ icon, title, active, onClick }: {
  icon: React.ReactNode
  title: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-6 py-3 text-left transition-colors
        ${active ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}
      onClick={onClick}
    >
      {icon}
      <span className="font-medium">{title}</span>
    </button>
  )
}

// StatCard Component
function StatCard({ icon, title, value, bgColor }: {
  icon: React.ReactNode
  title: string
  value: number
  bgColor: string
}) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg ${bgColor}`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
      </div>
    </Card>
  )
} 