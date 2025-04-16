"use client"

import { SchoolProfilePage } from "@/components/school/school-profile"

export default function InstitutionsProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SchoolProfilePage userType="school" />
    </div>
  )
}