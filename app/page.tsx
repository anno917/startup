"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { NavBar } from "@/components/layout/nav-bar"
import HomePage from "@/components/pages/home-page"
import UserTypePage from "@/components/pages/user-type-page"
import SignUpPage from "@/components/pages/signup-page"
import LoginPage from "@/components/pages/login-page"
import BookDemoPage from "@/components/pages/book-demo-page"
import FindResourcesPage from "@/components/pages/find-resources-page"
import ParentsTrackKidPage from "@/components/pages/parents-track-kid-page"
import ParentsMyCoursesPage from "@/components/pages/parents-my-courses-page"
import StudentsTrackProgressPage from "@/components/pages/students-track-progress-page"
import StudentsMyCoursesPage from "@/components/pages/students-my-courses-page"
import TeachersProfilePage from "@/components/pages/teachers-profile-page"
import TeachersManageClassesPage from "@/components/pages/teachers-manage-classes-page"
import InstitutionsProfilePage from "@/components/pages/institutions-profile-page"
import InstitutionsManageSchoolPage from "@/components/pages/institutions-manage-school-page"
import StorePage from "@/components/pages/store-page"
import AboutUsPage from "@/components/pages/about-us-page"
import ContactUsPage from "@/components/pages/contact-us-page"
import ManageSchoolDashboard from "@/components/pages/manage-school-dashboard"

export default function App() {
  const [currentPage, setCurrentPage] = useState("home")
  const [userType, setUserType] = useState<"parent" | "student" | "teacher" | "institution" | null>(null)
  const [initialTab, setInitialTab] = useState<string | null>(null)
  const router = useRouter()

  const navigateTo = (page: string, tab: string | null = null) => {
    // Check if this is a user type page
    if (page === "parents" || page === "students" || page === "teachers" || page === "institutions") {
      setCurrentPage("user-type")
      setUserType(page.slice(0, -1) as "parent" | "student" | "teacher" | "institution")
      return
    }
    
    setCurrentPage(page)
    setInitialTab(tab)
    window.scrollTo(0, 0)
  }

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage navigateTo={navigateTo} />
      case "user-type":
        return userType ? <UserTypePage userType={userType} navigateTo={navigateTo} /> : <HomePage navigateTo={navigateTo} />
      case "signup":
        return <SignUpPage navigateTo={navigateTo} />
      case "login":
        return <LoginPage navigateTo={navigateTo} />
      case "book-demo":
        return <BookDemoPage navigateTo={navigateTo} />
      case "find-resources":
        return <FindResourcesPage navigateTo={navigateTo} initialTab={initialTab} />
      case "parents-track-kid":
        return <ParentsTrackKidPage navigateTo={navigateTo} />
      case "parents-my-courses":
        return <ParentsMyCoursesPage navigateTo={navigateTo} />
      case "students-track-progress":
        return <StudentsTrackProgressPage navigateTo={navigateTo} />
      case "students-my-courses":
        return <StudentsMyCoursesPage navigateTo={navigateTo} />
      case "teachers-profile":
        return <TeachersProfilePage navigateTo={navigateTo} />
      case "teachers-manage-classes":
        return <TeachersManageClassesPage navigateTo={navigateTo} />
      case "institutions-profile":
        return <InstitutionsProfilePage navigateTo={navigateTo} />
      case "institutions-manage-school":
        return <InstitutionsManageSchoolPage navigateTo={navigateTo} />
      case "store":
        return <StorePage navigateTo={navigateTo} />
      case "about-us":
        return <AboutUsPage />
      case "contact-us":
        return <ContactUsPage />
      case "manage-school-dashboard":
        return <ManageSchoolDashboard navigateTo={navigateTo} />
      default:
        return <HomePage navigateTo={navigateTo} />
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <NavBar navigateTo={navigateTo} currentPage={currentPage} />
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
