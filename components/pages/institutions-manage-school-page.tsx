"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Users, 
  BookOpen, 
  Settings, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash
} from "lucide-react"

export default function InstitutionsManageSchoolPage() {
  const [activeTab, setActiveTab] = useState("classes")
  const [searchQuery, setSearchQuery] = useState("")
  
  // Mock data for classes
  const classes = [
    { id: 1, name: "Mathematics 101", teacher: "Dr. Smith", students: 25, schedule: "Mon, Wed, Fri 9:00 AM" },
    { id: 2, name: "English Literature", teacher: "Prof. Johnson", students: 30, schedule: "Tue, Thu 10:30 AM" },
    { id: 3, name: "Physics", teacher: "Dr. Williams", students: 22, schedule: "Mon, Wed 2:00 PM" },
    { id: 4, name: "History", teacher: "Prof. Brown", students: 28, schedule: "Tue, Thu 1:00 PM" },
    { id: 5, name: "Computer Science", teacher: "Dr. Davis", students: 20, schedule: "Fri 11:00 AM" },
  ]
  
  // Mock data for teachers
  const teachers = [
    { id: 1, name: "Dr. Smith", subject: "Mathematics", classes: 3, status: "Active" },
    { id: 2, name: "Prof. Johnson", subject: "English", classes: 2, status: "Active" },
    { id: 3, name: "Dr. Williams", subject: "Physics", classes: 2, status: "Active" },
    { id: 4, name: "Prof. Brown", subject: "History", classes: 2, status: "Active" },
    { id: 5, name: "Dr. Davis", subject: "Computer Science", classes: 1, status: "Active" },
  ]
  
  // Mock data for resources
  const resources = [
    { id: 1, name: "Mathematics Textbook", type: "Book", subject: "Mathematics", quantity: 50 },
    { id: 2, name: "English Literature Anthology", type: "Book", subject: "English", quantity: 45 },
    { id: 3, name: "Physics Lab Kit", type: "Equipment", subject: "Physics", quantity: 15 },
    { id: 4, name: "History Timeline", type: "Visual Aid", subject: "History", quantity: 5 },
    { id: 5, name: "Computer Science Software License", type: "Software", subject: "Computer Science", quantity: 30 },
  ]
  
  const filteredClasses = classes.filter(cls => 
    cls.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    cls.teacher.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  const filteredTeachers = teachers.filter(teacher => 
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    teacher.subject.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  const filteredResources = resources.filter(resource => 
    resource.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    resource.subject.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage School</h1>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-md w-64"
              />
            </div>
            <Button variant="outline" className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="classes" className="flex items-center">
              <BookOpen className="mr-2 h-4 w-4" />
              Classes
            </TabsTrigger>
            <TabsTrigger value="teachers" className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              Teachers
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center">
              <BookOpen className="mr-2 h-4 w-4" />
              Resources
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>
          
          {/* Classes Tab */}
          <TabsContent value="classes">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">School Classes</h2>
                <Button className="flex items-center">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Class
                </Button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Class Name</th>
                      <th className="text-left py-3 px-4">Teacher</th>
                      <th className="text-left py-3 px-4">Students</th>
                      <th className="text-left py-3 px-4">Schedule</th>
                      <th className="text-right py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClasses.map((cls) => (
                      <tr key={cls.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{cls.name}</td>
                        <td className="py-3 px-4">{cls.teacher}</td>
                        <td className="py-3 px-4">{cls.students}</td>
                        <td className="py-3 px-4">{cls.schedule}</td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="icon" className="mr-2">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-500">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
          
          {/* Teachers Tab */}
          <TabsContent value="teachers">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">School Teachers</h2>
                <Button className="flex items-center">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Teacher
                </Button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Teacher Name</th>
                      <th className="text-left py-3 px-4">Subject</th>
                      <th className="text-left py-3 px-4">Classes</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-right py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTeachers.map((teacher) => (
                      <tr key={teacher.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{teacher.name}</td>
                        <td className="py-3 px-4">{teacher.subject}</td>
                        <td className="py-3 px-4">{teacher.classes}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            {teacher.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="icon" className="mr-2">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-500">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
          
          {/* Resources Tab */}
          <TabsContent value="resources">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">School Resources</h2>
                <Button className="flex items-center">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Resource
                </Button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Resource Name</th>
                      <th className="text-left py-3 px-4">Type</th>
                      <th className="text-left py-3 px-4">Subject</th>
                      <th className="text-left py-3 px-4">Quantity</th>
                      <th className="text-right py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResources.map((resource) => (
                      <tr key={resource.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{resource.name}</td>
                        <td className="py-3 px-4">{resource.type}</td>
                        <td className="py-3 px-4">{resource.subject}</td>
                        <td className="py-3 px-4">{resource.quantity}</td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="icon" className="mr-2">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-500">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
          
          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">School Settings</h2>
                <Button className="flex items-center">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Settings
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Academic Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Academic Year
                      </label>
                      <p className="text-gray-700">2023-2024</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Semester Start Date
                      </label>
                      <p className="text-gray-700">August 15, 2023</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Semester End Date
                      </label>
                      <p className="text-gray-700">December 15, 2023</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Grading System
                      </label>
                      <p className="text-gray-700">Letter Grades (A-F)</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">School Policies</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Attendance Policy
                      </label>
                      <p className="text-gray-700">Students must attend at least 80% of classes</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Uniform Policy
                      </label>
                      <p className="text-gray-700">School uniform required Monday-Thursday, casual Friday</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        School Hours
                      </label>
                      <p className="text-gray-700">8:00 AM - 3:30 PM</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Lunch Break
                      </label>
                      <p className="text-gray-700">12:00 PM - 1:00 PM</p>
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