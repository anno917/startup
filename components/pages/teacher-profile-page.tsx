"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  LayoutDashboard,
  MessageSquare,
  Star,
  UserPlus,
  Users,
  Award,
  MapPin,
  Mail,
  Phone,
  Clock,
  GraduationCap,
  ExternalLink,
  CalendarIcon,
  BookOpen,
  Share2,
  Download,
  Library,
  Globe,
  ShieldCheck,
  Check,
  ClockIcon,
  DollarSign,
  ThumbsUp,
  BadgeCheck,
  ContrastIcon as Compare,
  Ruler,
  BriefcaseIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

interface TeacherProfilePageProps {
  navigateTo?: (page: string) => void
  userType?: "parent" | "student" | "teacher" | "institution"
}

// Review Component
const Review = ({ review }: { review: any }) => (
  <div className="border-b pb-4 last:border-b-0 last:pb-0">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <img
          src={review.avatar || "https://placehold.co/40x40/e0f2fe/0891b2?text=U"}
          alt={review.name}
          className="w-8 h-8 rounded-full"
        />
        <span className="font-medium">{review.name}</span>
      </div>
      <div className="flex items-center text-amber-500">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-current" : "text-gray-300"}`} strokeWidth={1} />
        ))}
      </div>
    </div>
    <p className="text-gray-600 text-sm">{review.comment}</p>
    <p className="text-gray-400 text-xs mt-1">{review.date}</p>
  </div>
)

// Course Card Component
const CourseCard = ({ course }: { course: any }) => (
  <Card className="overflow-hidden hover:shadow-md transition-shadow">
    <div className="h-32 overflow-hidden">
      <img
        src={course.imageUrl || "/placeholder.svg"}
        alt={course.title}
        className="w-full h-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.onerror = null
          target.src = "https://placehold.co/600x400/cccccc/ffffff?text=Course+Image"
        }}
      />
    </div>
    <CardContent className="p-4">
      <Badge variant="outline" className="mb-2">
        {course.subject}
      </Badge>
      <h3 className="font-medium mb-1 line-clamp-2">{course.title}</h3>
      <div className="flex items-center text-amber-500 mb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`w-3 h-3 ${i < course.rating ? "fill-current" : "text-gray-300"}`} strokeWidth={1} />
        ))}
        <span className="text-xs text-gray-500 ml-1">({course.reviewCount})</span>
      </div>
      <p className="text-xs text-gray-500 flex items-center">
        <Users className="w-3 h-3 mr-1" /> {course.students} students
      </p>
      <p className="text-sm font-medium text-blue-600 mt-2">{course.price}</p>
    </CardContent>
    <CardFooter className="px-4 py-3 bg-gray-50 border-t">
      <Button variant="outline" size="sm" className="w-full">
        View Course
      </Button>
    </CardFooter>
  </Card>
)

// Class Schedule Component
const ClassSchedule = ({ schedule }: { schedule: any[] }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Day
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Time
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Course
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Location
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {schedule.map((item, index) => (
          <tr key={index} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.day}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.time}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.course}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.location}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

// Add a ImageGallery component
const ImageGallery = ({ images }: { images: string[] }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline">View More Photos</Button>
    </DialogTrigger>
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>Teacher Gallery</DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={image || "/placeholder.svg"}
            alt={`Teacher image ${index + 1}`}
            className="w-full h-64 object-cover rounded-md hover:opacity-90 transition-opacity cursor-pointer"
          />
        ))}
      </div>
    </DialogContent>
  </Dialog>
)

// Add a CompareButton component
const CompareButton = ({ teacher }: { teacher: any }) => {
  return (
    <Button variant="outline" className="flex items-center gap-2">
      <Compare className="w-4 h-4" />
      Add to Compare
    </Button>
  )
}

// Add a CourseGallery component
const CourseGallery = ({ courses }: { courses: any[] }) => (
  <Carousel className="w-full">
    <CarouselContent>
      {courses.map((course, index) => (
        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
          <Card className="m-1 h-full flex flex-col">
            <div className="h-48 relative overflow-hidden">
              <img
                src={course.imageUrl || "/placeholder.svg"}
                alt={course.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="bg-white/80">
                  {course.subject}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4 flex-grow">
              <h3 className="font-medium line-clamp-1">{course.title}</h3>
              <div className="flex items-center text-amber-500 my-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${i < Math.floor(course.rating) ? "fill-current" : "text-gray-300"}`}
                    strokeWidth={1}
                  />
                ))}
                <span className="text-xs text-gray-500 ml-1">({course.reviewCount})</span>
              </div>
              <p className="text-xs text-gray-600 mb-1 line-clamp-2">{course.description}</p>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {course.duration}
                </span>
                <span className="flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  {course.students} students
                </span>
              </div>
              <p className="text-blue-600 font-medium mt-2">{course.price}</p>
            </CardContent>
            <CardFooter className="p-3 bg-gray-50 border-t mt-auto">
              <Button variant="outline" size="sm" className="w-full">
                View Course
              </Button>
            </CardFooter>
          </Card>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious className="left-1" />
    <CarouselNext className="right-1" />
  </Carousel>
)

// Add a VerificationBadges component
const VerificationBadges = ({ verification }: { verification: any }) => (
  <div className="flex flex-wrap gap-2 mt-2">
    {verification.identityVerified && (
      <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200">
        <ShieldCheck className="w-3 h-3" /> Identity Verified
      </Badge>
    )}
    {verification.backgroundChecked && (
      <Badge variant="outline" className="flex items-center gap-1 bg-blue-50 text-blue-700 border-blue-200">
        <Check className="w-3 h-3" /> Background Checked
      </Badge>
    )}
    {verification.qualificationsVerified && (
      <Badge variant="outline" className="flex items-center gap-1 bg-purple-50 text-purple-700 border-purple-200">
        <BadgeCheck className="w-3 h-3" /> Qualifications Verified
      </Badge>
    )}
  </div>
)

// Add a CourseDetailsModal component
const CourseDetailsModal = ({ course }: { course: any }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline" size="sm">
        Course Details
      </Button>
    </DialogTrigger>
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle>{course.title}</DialogTitle>
        <DialogDescription>
          {course.subject} • {course.level}
        </DialogDescription>
      </DialogHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div>
          <img
            src={course.imageUrl || "/placeholder.svg"}
            alt={course.title}
            className="w-full h-48 object-cover rounded-md mb-4"
          />

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(course.rating) ? "fill-current" : "text-gray-300"}`}
                  strokeWidth={1}
                />
              ))}
              <span className="text-sm text-gray-500 ml-1">({course.reviewCount} reviews)</span>
            </div>
            <div className="text-blue-600 font-semibold">{course.price}</div>
          </div>

          <p className="text-gray-700 mb-4">{course.description}</p>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Course Information</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-gray-500" />
                  <span>Level: {course.level}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span>Duration: {course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span>{course.students} students</span>
                </div>
              </div>
            </div>

            <Button className="w-full">Enroll Now</Button>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-2">Learning Objectives</h4>
            <ul className="space-y-1">
              {course.objectives.map((objective: string, index: number) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <span className="text-gray-700">{objective}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-2">Syllabus</h4>
            <ul className="space-y-2">
              {course.syllabus.map((topic: string, index: number) => (
                <li key={index} className="border-b pb-2 last:border-b-0 last:pb-0">
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 text-xs">
                      {index + 1}
                    </div>
                    <span className="text-sm text-gray-700">{topic}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
)

export default function TeacherProfilePage({ navigateTo, userType = "parent" }: TeacherProfilePageProps) {
  const [activeTab, setActiveTab] = useState("about")

  // Mock teacher data
  const teacher = {
    name: "Emily Carter",
    subject: "Physics",
    rating: 4.8,
    reviewCount: 124,
    location: "Anytown, USA",
    bio: "Passionate physics educator with over 10 years of experience teaching at both high school and university levels. My teaching philosophy centers on making complex concepts accessible through practical demonstrations and real-world applications. I believe every student can excel in physics with the right guidance and encouragement.",
    img: "https://placehold.co/150x150/e0f2fe/0891b2?text=EC",
    profilePictures: [
      "https://placehold.co/400x400/e0f2fe/0891b2?text=Emily+Carter",
      "https://placehold.co/400x400/f0fdfa/0d9488?text=Teaching",
      "https://placehold.co/400x400/eff6ff/3b82f6?text=Lab+Work",
    ],
    contact: {
      email: "emily.carter@example.edu",
      phone: "(555) 123-4567",
      office: "Science Building, Room 305",
      officeHours: "Mon & Wed 3-5 PM",
      socialMedia: {
        linkedin: "linkedin.com/in/emily-carter",
        twitter: "twitter.com/emily_carter_phys",
      },
    },
    education: [
      {
        degree: "Ph.D. in Physics",
        institution: "Stanford University",
        year: "2015",
        details: "Dissertation: 'Quantum Field Theory Applications in Educational Physics'",
        gpa: "3.95/4.0",
      },
      {
        degree: "M.S. in Physics",
        institution: "University of Michigan",
        year: "2011",
        details: "Thesis: 'Effective Methods for Teaching Complex Physics Concepts'",
        gpa: "3.9/4.0",
      },
      {
        degree: "B.S. in Physics",
        institution: "UCLA",
        year: "2009",
        details: "Minor in Mathematics",
        gpa: "3.85/4.0",
      },
    ],
    experience: [
      {
        position: "Senior Physics Teacher",
        institution: "Westview High School",
        period: "2018 - Present",
        achievements: [
          "Increased AP Physics exam pass rate from 75% to 92%",
          "Developed innovative lab curriculum now used district-wide",
          "Mentored 5 student teams to state science competition finals",
        ],
      },
      {
        position: "Physics Lecturer",
        institution: "Anytown Community College",
        period: "2015 - 2018",
        achievements: [
          "Taught introductory and advanced physics courses to 500+ students",
          "Recipient of Excellence in Teaching award (2017)",
          "Created online course materials that increased student engagement by 35%",
        ],
      },
      {
        position: "Research Assistant",
        institution: "Stanford University",
        period: "2012 - 2015",
        achievements: [
          "Contributed to 3 published papers in leading physics education journals",
          "Developed teaching aids for visualizing quantum mechanics concepts",
          "Co-organized annual physics education symposium for 200+ attendees",
        ],
      },
    ],
    certifications: [
      {
        name: "National Board Certified Teacher (NBCT)",
        issuer: "National Board for Professional Teaching Standards",
        year: "2020",
        expirationDate: "2030",
        licenseNumber: "NBCT-12345",
      },
      {
        name: "Advanced Placement (AP) Physics Certified",
        issuer: "College Board",
        year: "2019",
        expirationDate: "2024",
        licenseNumber: "AP-98765",
      },
      {
        name: "State Teaching License with Physics Endorsement",
        issuer: "State Department of Education",
        year: "2018",
        expirationDate: "2028",
        licenseNumber: "TL-54321",
      },
    ],
    publications: [
      {
        title: "Innovative Approaches to Teaching Quantum Mechanics in High School",
        journal: "Journal of Physics Education",
        year: "2021",
        doi: "10.1234/jpe.2021.0105",
      },
      {
        title: "Using Virtual Reality to Enhance Physics Learning Outcomes",
        journal: "Technology in Education",
        year: "2019",
        doi: "10.5678/tie.2019.1204",
      },
    ],
    skills: [
      "Physics curriculum development",
      "Laboratory experiment design",
      "Advanced mathematics",
      "Educational technology integration",
      "Learning assessment design",
      "Physics competition coaching",
      "Interactive demonstration design",
      "Data analysis and visualization",
      "Education research methods",
      "STEM outreach coordination",
    ],
    teachingPhilosophy:
      "I believe that physics should be taught through a combination of conceptual understanding, mathematical rigor, and hands-on experimentation. My approach emphasizes real-world applications and encourages students to become curious, analytical thinkers who can apply physics principles to solve complex problems. I create an inclusive classroom environment where questions are valued and mistakes are viewed as opportunities for growth.",
    courses: [
      {
        title: "AP Physics: Mechanics and Thermodynamics",
        subject: "Physics",
        rating: 4.9,
        reviewCount: 56,
        students: 342,
        price: "$89.99",
        imageUrl: "https://placehold.co/600x400/e0f2fe/0891b2?text=Physics",
        description:
          "Comprehensive preparation for the AP Physics exam covering mechanics and thermodynamics. This course includes video lectures, interactive simulations, practice problems, and full-length practice exams.",
        level: "Advanced",
        duration: "16 weeks",
        objectives: [
          "Master fundamental physics concepts and principles",
          "Develop problem-solving skills for complex physics scenarios",
          "Prepare thoroughly for the AP Physics 1 & 2 exams",
          "Build a strong foundation for college-level physics",
        ],
        syllabus: [
          "Kinematics in One and Two Dimensions",
          "Newton's Laws of Motion",
          "Work, Energy, and Power",
          "Systems of Particles and Linear Momentum",
          "Circular Motion and Rotation",
          "Oscillations and Gravitation",
          "Thermodynamics and Fluid Mechanics",
        ],
      },
      {
        title: "Introduction to Quantum Mechanics",
        subject: "Advanced Physics",
        rating: 4.7,
        reviewCount: 38,
        students: 215,
        price: "$99.99",
        imageUrl: "https://placehold.co/600x400/f0fdfa/0d9488?text=Quantum",
        description:
          "An accessible introduction to the fascinating world of quantum mechanics. Learn about wave-particle duality, the uncertainty principle, quantum states, and more through intuitive explanations and visualizations.",
        level: "Intermediate",
        duration: "12 weeks",
        objectives: [
          "Understand fundamental quantum mechanical principles",
          "Explore the mathematical framework of quantum mechanics",
          "Analyze quantum phenomena and their implications",
          "Apply quantum concepts to explain natural phenomena",
        ],
        syllabus: [
          "Historical Development of Quantum Theory",
          "Wave-Particle Duality",
          "Schrödinger Equation and Wave Functions",
          "Quantum States and Superposition",
          "Uncertainty Principle",
          "Quantum Tunneling",
          "Applications in Modern Technology",
        ],
      },
      {
        title: "Physics for College Entrance Exams",
        subject: "Test Prep",
        rating: 4.8,
        reviewCount: 42,
        students: 520,
        price: "$69.99",
        imageUrl: "https://placehold.co/600x400/eff6ff/3b82f6?text=Test+Prep",
        description:
          "Strategic preparation for physics portions of SAT, ACT, and other college entrance exams. Focuses on both conceptual understanding and efficient problem-solving techniques.",
        level: "Beginner to Intermediate",
        duration: "8 weeks",
        objectives: [
          "Master physics concepts commonly tested on entrance exams",
          "Learn time-saving problem-solving strategies",
          "Practice with authentic exam-style questions",
          "Build confidence in tackling physics problems under time constraints",
        ],
        syllabus: [
          "Mechanics Essentials",
          "Electricity and Magnetism Fundamentals",
          "Waves, Sound, and Light",
          "Basic Thermodynamics",
          "Test-Taking Strategies",
          "Time Management Techniques",
          "Full-Length Practice Tests",
        ],
      },
      {
        title: "Physics in Everyday Life",
        subject: "General Physics",
        rating: 4.9,
        reviewCount: 67,
        students: 430,
        price: "$59.99",
        imageUrl: "https://placehold.co/600x400/fef2f2/ef4444?text=Everyday+Physics",
        description:
          "Discover how physics explains the world around us through engaging, real-world examples. Perfect for curious minds with no prior physics background.",
        level: "Beginner",
        duration: "10 weeks",
        objectives: [
          "Recognize physics principles in everyday phenomena",
          "Develop intuitive understanding of basic physics concepts",
          "Apply simple physics principles to explain common observations",
          "Gain appreciation for the relevance of physics in daily life",
        ],
        syllabus: [
          "Physics of Sports and Movement",
          "Kitchen Physics: Cooking and Food Science",
          "Weather and Atmospheric Phenomena",
          "Physics of Music and Sound",
          "Optics and Visual Illusions",
          "Energy in Home Appliances",
          "Simple Machines Around Us",
        ],
      },
    ],
    reviews: [
      {
        name: "Michael P.",
        avatar: "https://placehold.co/40x40/f0fdfa/0d9488?text=MP",
        rating: 5,
        comment:
          "Ms. Carter is an exceptional physics teacher. She explains complex concepts in a way that's easy to understand and always makes time for questions.",
        date: "March 15, 2025",
        course: "AP Physics: Mechanics and Thermodynamics",
      },
      {
        name: "Sarah L.",
        avatar: "https://placehold.co/40x40/eff6ff/3b82f6?text=SL",
        rating: 5,
        comment:
          "I struggled with physics until I took Ms. Carter's class. Her teaching methods and patience helped me not only pass but excel in the subject.",
        date: "February 28, 2025",
        course: "Physics for College Entrance Exams",
      },
      {
        name: "David K.",
        avatar: "https://placehold.co/40x40/fef2f2/ef4444?text=DK",
        rating: 4,
        comment:
          "Great teacher who clearly knows her subject well. The only reason for 4 stars instead of 5 is that sometimes the homework load is quite heavy.",
        date: "January 10, 2025",
        course: "Introduction to Quantum Mechanics",
      },
      {
        name: "Priya M.",
        avatar: "https://placehold.co/40x40/fce7f3/db2777?text=PM",
        rating: 5,
        comment:
          "Professor Carter makes quantum mechanics feel approachable. Her visualizations and analogies helped me grasp concepts I'd struggled with for years.",
        date: "December 5, 2024",
        course: "Introduction to Quantum Mechanics",
      },
      {
        name: "James W.",
        avatar: "https://placehold.co/40x40/fff7ed/f97316?text=JW",
        rating: 5,
        comment:
          "This course completely transformed my understanding of physics. Emily has a gift for making complex topics accessible while still maintaining academic rigor.",
        date: "November 22, 2024",
        course: "AP Physics: Mechanics and Thermodynamics",
      },
    ],
    schedule: [
      {
        day: "Monday",
        time: "9:00 AM - 10:30 AM",
        course: "AP Physics",
        location: "Room 305",
        availableSeats: 2,
        mode: "In-person",
      },
      {
        day: "Monday",
        time: "1:00 PM - 2:30 PM",
        course: "Introduction to Quantum Mechanics",
        location: "Room 305",
        availableSeats: 5,
        mode: "In-person",
      },
      {
        day: "Tuesday",
        time: "10:00 AM - 11:30 AM",
        course: "Physics for College Entrance Exams",
        location: "Room 308",
        availableSeats: 0,
        mode: "In-person",
      },
      {
        day: "Wednesday",
        time: "9:00 AM - 10:30 AM",
        course: "AP Physics",
        location: "Room 305",
        availableSeats: 2,
        mode: "In-person",
      },
      {
        day: "Thursday",
        time: "10:00 AM - 11:30 AM",
        course: "Physics for College Entrance Exams",
        location: "Room 308",
        availableSeats: 0,
        mode: "In-person",
      },
      {
        day: "Friday",
        time: "1:00 PM - 2:30 PM",
        course: "Introduction to Quantum Mechanics",
        location: "Room 305",
        availableSeats: 5,
        mode: "In-person",
      },
      {
        day: "Saturday",
        time: "11:00 AM - 12:30 PM",
        course: "Physics in Everyday Life",
        location: "Online",
        availableSeats: 15,
        mode: "Virtual",
      },
    ],
    achievements: [
      {
        title: "Teacher of the Year",
        organization: "Westview High School",
        year: "2023",
        description: "Recognized for exceptional teaching methods and student outcomes",
      },
      {
        title: "Excellence in STEM Education Award",
        organization: "State Education Department",
        year: "2022",
        description: "Awarded for innovative physics curriculum development",
      },
      {
        title: "Physics Olympiad Coach",
        organization: "National Physics Olympiad",
        year: "2021-Present",
        description: "Led student team to national finals for three consecutive years",
      },
    ],
    teachingMaterials: [
      {
        title: "Interactive Physics Simulations",
        type: "Digital Resource",
        description: "Collection of custom-built simulations for visualizing complex physics concepts",
        downloadable: true,
      },
      {
        title: "Problem-Solving Workbook",
        type: "PDF",
        description: "Comprehensive workbook with step-by-step solutions to common physics problems",
        downloadable: true,
      },
      {
        title: "Conceptual Physics Video Series",
        type: "Video",
        description: "Short video explanations of key physics concepts with real-world examples",
        downloadable: false,
      },
    ],
    languages: [
      { language: "English", proficiency: "Native" },
      { language: "Spanish", proficiency: "Conversational" },
      { language: "French", proficiency: "Basic" },
    ],
    availability: {
      nextAvailable: "April 20, 2025",
      bookingWindow: "6 weeks in advance",
      privateSessionRate: "$75/hour",
      groupSessionRate: "$45/person (minimum 3 students)",
    },
    verificationStatus: {
      identityVerified: true,
      backgroundChecked: true,
      qualificationsVerified: true,
      lastVerified: "January 15, 2025",
    },
  }

  const [showCompareBanner, setShowCompareBanner] = useState(false)

  // Determine if the user can access management features
  const canManage = userType === "teacher" || userType === "institution"

  // Add this function to handle adding teacher to compare
  const handleAddToCompare = () => {
    setShowCompareBanner(true)
    // In a real app, you would store this in some state management solution
  }

  return (
    <section className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Compare Banner */}
      {showCompareBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-blue-600 text-white py-3 px-4 z-50">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-white text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                1
              </div>
              <span>1 teacher added to compare</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="bg-white text-blue-600 hover:bg-blue-50">
                Compare Now
              </Button>
              <Button
                variant="ghost"
                onClick={() => setShowCompareBanner(false)}
                className="text-white hover:bg-blue-700"
              >
                Clear
              </Button>
            </div>
          </div>
        </div>
      )}

      <Card>
        <CardHeader className="flex flex-col md:flex-row items-start gap-6">
          <div className="relative">
            <img
              src={teacher.img || "/placeholder.svg"}
              alt={teacher.name}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg flex-shrink-0"
            />
            <div className="absolute bottom-0 right-0 bg-blue-100 rounded-full p-1 border-2 border-white">
              <BadgeCheck className="w-5 h-5 text-blue-600" />
            </div>
          </div>

          <div className="flex-grow mt-4 md:mt-0">
            <h2 className="text-3xl font-bold text-blue-800">{teacher.name}</h2>
            <p className="text-lg text-gray-600 mt-1">{teacher.subject} Specialist</p>
            <div className="flex items-center gap-1 mt-2 text-sm text-amber-600">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(teacher.rating) ? "fill-current" : "text-gray-300"}`}
                    strokeWidth={1}
                  />
                ))}
              </div>
              <span className="font-semibold">
                {teacher.rating} / 5.0 ({teacher.reviewCount} reviews)
              </span>
            </div>
            <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{teacher.location}</span>
            </div>

            <VerificationBadges verification={teacher.verificationStatus} />

            <div className="mt-4 flex flex-wrap gap-2">
              <Button>
                <MessageSquare className="w-4 h-4 mr-2" /> Contact Teacher
              </Button>

              <Button variant="outline">
                <UserPlus className="w-4 h-4 mr-2" /> Follow
              </Button>

              <CompareButton teacher={teacher} />

              {canManage && (
                <Button variant="ghost" onClick={() => navigateTo && navigateTo("teachers-manage-classes")}>
                  <LayoutDashboard className="w-4 h-4 mr-2" /> My Dashboard
                </Button>
              )}
            </div>
          </div>

          {/* Right Column - Quick Actions */}
          <div className="flex flex-col gap-2 ml-auto mt-4 md:mt-0">
            <ImageGallery images={teacher.profilePictures} />

            <Button className="bg-blue-600 hover:bg-blue-700">Book a Session</Button>

            <Button variant="ghost" size="icon" className="self-end">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="credentials">Credentials</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="mt-6"
              >
                <TabsContent value="about" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Biography</h3>
                    <p className="text-gray-700">{teacher.bio}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-sm">
                          <Mail className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-700">{teacher.contact.email}</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-700">{teacher.contact.phone}</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-700">{teacher.contact.office}</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-700">Office Hours: {teacher.contact.officeHours}</span>
                        </li>
                      </ul>

                      <div className="mt-4 flex gap-2">
                        <Button variant="outline" size="sm" className="text-blue-600">
                          LinkedIn <ExternalLink className="w-3 h-3 ml-1" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-sky-500">
                          Twitter <ExternalLink className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Education</h3>
                      <ul className="space-y-3">
                        {teacher.education.map((edu, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <GraduationCap className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div>
                              <p className="font-medium">{edu.degree}</p>
                              <p className="text-sm text-gray-600">
                                {edu.institution}, {edu.year}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">{edu.details}</p>
                              <p className="text-xs text-gray-500">GPA: {edu.gpa}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Professional Experience</h3>
                      <ul className="space-y-4">
                        {teacher.experience.map((exp, index) => (
                          <li key={index} className="border-l-2 border-blue-200 pl-4 pb-1">
                            <div className="flex items-start gap-2">
                              <BriefcaseIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                              <div>
                                <p className="font-medium">{exp.position}</p>
                                <p className="text-sm text-gray-600">
                                  {exp.institution}, {exp.period}
                                </p>
                                <ul className="mt-1 space-y-1">
                                  {exp.achievements.map((achievement, idx) => (
                                    <li key={idx} className="text-xs text-gray-700 flex items-start gap-1">
                                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                                      {achievement}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Certifications</h3>
                      <ul className="space-y-2">
                        {teacher.certifications.map((cert, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Award className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div>
                              <p className="font-medium">{cert.name}</p>
                              <p className="text-sm text-gray-600">
                                {cert.issuer}, {cert.year}
                              </p>
                              <p className="text-xs text-gray-500">
                                Expires: {cert.expirationDate}, License: {cert.licenseNumber}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {teacher.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Teaching Philosophy</h3>
                    <p className="text-gray-700">{teacher.teachingPhilosophy}</p>
                  </div>
                </TabsContent>

                <TabsContent value="courses">
                  <CourseGallery courses={teacher.courses} />
                </TabsContent>

                <TabsContent value="reviews">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Student Reviews</span>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                          {teacher.rating} ({teacher.reviewCount})
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {teacher.reviews.map((review, index) => (
                          <Review key={index} review={review} />
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="bg-gray-50 border-t">
                      <Button variant="outline" className="w-full">
                        View All Reviews <ExternalLink className="w-4 h-4 ml-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="schedule">
                  <Card>
                    <CardHeader>
                      <CardTitle>Weekly Class Schedule</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ClassSchedule schedule={teacher.schedule} />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="credentials">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Certifications</h3>
                      <ul className="space-y-4">
                        {teacher.certifications.map((cert, index) => (
                          <li key={index} className="border-l-2 border-blue-200 pl-4 pb-1">
                            <div className="flex items-start gap-2">
                              <Award className="w-5 h-5 text-blue-600 mt-0.5" />
                              <div>
                                <p className="font-medium">{cert.name}</p>
                                <p className="text-sm text-gray-600">
                                  {cert.issuer}, {cert.year}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Expires: {cert.expirationDate}, License: {cert.licenseNumber}
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Publications</h3>
                      <ul className="space-y-4">
                        {teacher.publications.map((pub, index) => (
                          <li key={index} className="border-l-2 border-blue-200 pl-4 pb-1">
                            <div className="flex items-start gap-2">
                              <BookOpen className="w-5 h-5 text-blue-600 mt-0.5" />
                              <div>
                                <p className="font-medium">{pub.title}</p>
                                <p className="text-sm text-gray-600">
                                  {pub.journal}, {pub.year}
                                </p>
                                <a
                                  href={`https://doi.org/${pub.doi}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-blue-500 hover:underline flex items-center gap-1"
                                >
                                  View Publication <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Achievements</h3>
                      <ul className="space-y-4">
                        {teacher.achievements.map((achievement, index) => (
                          <li key={index} className="border-l-2 border-blue-200 pl-4 pb-1">
                            <div className="flex items-start gap-2">
                              <ThumbsUp className="w-5 h-5 text-blue-600 mt-0.5" />
                              <div>
                                <p className="font-medium">{achievement.title}</p>
                                <p className="text-sm text-gray-600">
                                  {achievement.organization}, {achievement.year}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">{achievement.description}</p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="resources">
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold mb-3">Teaching Materials</h3>
                    <ul className="space-y-4">
                      {teacher.teachingMaterials.map((material, index) => (
                        <li key={index} className="border-l-2 border-blue-200 pl-4 pb-1">
                          <div className="flex items-start gap-2">
                            <Library className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div>
                              <p className="font-medium">{material.title}</p>
                              <p className="text-sm text-gray-600">{material.type}</p>
                              <p className="text-xs text-gray-500 mt-1">{material.description}</p>
                              {material.downloadable && (
                                <Button variant="link" size="sm" className="pl-0">
                                  Download <Download className="w-4 h-4 ml-1" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Languages</h3>
                      <ul className="space-y-2">
                        {teacher.languages.map((lang, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-gray-500" />
                            <span>
                              {lang.language} - {lang.proficiency}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Availability</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4 text-gray-500" />
                          <span>Next Available: {teacher.availability.nextAvailable}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <ClockIcon className="w-4 h-4 text-gray-500" />
                          <span>Booking Window: {teacher.availability.bookingWindow}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-gray-500" />
                          <span>Private Session Rate: {teacher.availability.privateSessionRate}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span>Group Session Rate: {teacher.availability.groupSessionRate}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  )
}
