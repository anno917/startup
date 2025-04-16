"use client"

import { useState } from "react"
import {
  Building2,
  MapPin,
  Star,
  Users,
  Award,
  BookOpen,
  Briefcase,
  Heart,
  MessageSquare,
  Share2,
  ChevronRight,
  Check,
  Info,
  Map,
  FileText,
  Laptop,
  PlusCircle,
  Trash2,
  Eye,
  Globe,
  Phone,
  Mail,
  ImageIcon,
  School,
  Utensils,
  Dumbbell,
  Music,
  Palette,
  Accessibility,
  Bus,
  GraduationCap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image"

interface SchoolProfilePageProps {
  userType?: "parent" | "teacher" | "admin" | "school"
}

export function SchoolProfilePage({ userType = "parent" }: SchoolProfilePageProps) {
  const [isFollowing, setIsFollowing] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [compareList, setCompareList] = useState<string[]>([])
  const [showCompareDialog, setShowCompareDialog] = useState(false)
  const [galleryView, setGalleryView] = useState<"grid" | "slideshow">("grid")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [galleryFilter, setGalleryFilter] = useState<string>("all")

  const isAdmin = userType === "admin"
  const isSchoolAdmin = userType === "school"
  const canEdit = isAdmin || isSchoolAdmin

  // Complete school data structure
  const school = {
    id: "eidas123",
    name: "Ecole Internationale Dina - EIDAS",
    logo: "/placeholder.svg?height=80&width=80",
    verified: true,
    locationDisplayText: "Riyadh district Al Malaz",
    type: "International School",
    demographics: "Boys and Girls",
    rating: 4,
    visits: 27400,
    dataCompleteness: 88.6,
    digitalPresence: 59,
    fees: {
      min: 25000,
      max: 45000,
      currency: "SAR",
      installments: true,
      discount: 1.5,
      installmentDetails: [
        { name: "First Term", percentage: 40, dueDate: "August 15, 2023" },
        { name: "Second Term", percentage: 30, dueDate: "December 1, 2023" },
        { name: "Third Term", percentage: 30, dueDate: "March 1, 2024" },
      ],
    },
    license: {
      number: "EDU-INT-2345-RYD",
      issuedBy: "Ministry of Education",
      issuedDate: "2010-05-15",
      expiryDate: "2025-05-14",
      status: "Active",
      accreditations: ["International Baccalaureate (IB)", "Cambridge Assessment International Education"],
    },
    contact: {
      phone: "+966 11 234 5678",
      email: "info@eidas.edu.sa",
      website: "www.eidas.edu.sa",
      socialMedia: {
        facebook: "facebook.com/eidas",
        twitter: "twitter.com/eidas",
        instagram: "instagram.com/eidas",
      },
    },
    about: "Ecole Internationale Dina (EIDAS) is a prestigious international school in Riyadh offering world-class education with a blend of international curriculum and local values. Established in 2010, we have been nurturing global citizens with strong academic foundations and cultural awareness.",
    curriculum: [
      "International Baccalaureate (IB)",
      "Cambridge IGCSE",
      "Saudi National Curriculum (Arabic & Islamic Studies)",
    ],
    languages: ["English (Primary)", "Arabic", "French"],
    facilities: [
      { name: "Classrooms", count: 45, details: "Smart classrooms with interactive whiteboards", icon: School },
      { name: "Science Labs", count: 5, details: "Fully equipped physics, chemistry, and biology labs", icon: BookOpen },
      { name: "Computer Labs", count: 3, details: "Modern computer labs with latest hardware and software", icon: Laptop },
      // ... rest of the facilities
    ],
    gallery: [
      { id: 1, type: "exterior", url: "/placeholder.svg?height=400&width=600", caption: "School Main Entrance" },
      { id: 2, type: "exterior", url: "/placeholder.svg?height=400&width=600", caption: "School Building" },
      { id: 3, type: "interior", url: "/placeholder.svg?height=400&width=600", caption: "Modern Classroom" },
      // ... rest of the gallery items
    ],
    location: {
      address: "2347 Al Malaz District, Riyadh 12836, Saudi Arabia",
      coordinates: { latitude: 24.6841, longitude: 46.7216 },
      landmarks: "Near King Abdullah Park, 2km from Al Malaz Metro Station",
    },
    // ... rest of the school data structure
  }

  const handleAddToCompare = () => {
    if (!compareList.includes(school.id)) {
      setCompareList([...compareList, school.id])
    }
  }

  const handleRemoveFromCompare = () => {
    setCompareList(compareList.filter((id) => id !== school.id))
  }

  const isInCompareList = compareList.includes(school.id)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === filteredGallery.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? filteredGallery.length - 1 : prev - 1))
  }

  const filteredGallery =
    galleryFilter === "all" ? school.gallery : school.gallery.filter((item) => item.type === galleryFilter)

  // Teacher certification card component
  const TeacherCertificationCard = ({ teacher }: { teacher: any }) => (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      {/* ... [TeacherCertificationCard implementation remains exactly the same as provided] */}
    </Card>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Updated Hero Section */}
      <div className="relative w-full h-72 rounded-xl overflow-hidden mb-12">
        {/* Gradient background instead of image */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700"></div>
        
        {/* Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="p-10 text-white w-full">
            <h1 className="text-4xl font-bold tracking-tight">{school.name}</h1>
            <div className="flex items-center mt-4">
              <MapPin className="h-5 w-5 mr-2" />
              <span className="text-lg font-medium">{school.locationDisplayText}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Updated School Header with better spacing */}
      <div className="flex flex-col md:flex-row gap-8 mb-8 px-8">
        {/* Larger profile image with better positioning */}
        <div className="flex-shrink-0 -mt-36 z-10 relative ml-6">
          <div className="w-52 h-52 rounded-2xl overflow-hidden border-8 border-white bg-white shadow-xl">
            <Image
              src={school.logo}
              alt={school.name}
              width={208}
              height={208}
              className="object-contain p-2"
            />
          </div>
        </div>

        <div className="flex-grow pt-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900">{school.name}</h1>
                {school.verified && (
                  <Badge variant="outline" className="ml-3 bg-blue-50 text-blue-600 border-blue-200">
                    <Check className="h-3 w-3 mr-1" /> Verified
                  </Badge>
                )}
              </div>
              <div className="flex items-center mt-2 text-gray-600">
                <Building2 className="h-4 w-4 mr-2" />
                <span className="text-sm mr-4">{school.type}</span>
                <Users className="h-4 w-4 mr-2" />
                <span className="text-sm">{school.demographics}</span>
              </div>
              <div className="flex items-center mt-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(school.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium text-gray-700">{school.rating}/5</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
              <Button
                variant={isFollowing ? "outline" : "default"}
                size="sm"
                onClick={() => setIsFollowing(!isFollowing)}
                className="min-w-[100px]"
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className={`min-w-[100px] ${isLiked ? "text-red-500" : ""}`}
              >
                <Heart className={`h-4 w-4 mr-2 ${isLiked ? "fill-red-500" : ""}`} />
                Like
              </Button>
              <Button variant="outline" size="sm" className="min-w-[100px]">
                <MessageSquare className="h-4 w-4 mr-2" />
                Message
              </Button>
              <Button variant="outline" size="sm" className="min-w-[100px]">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={isInCompareList ? handleRemoveFromCompare : handleAddToCompare}
                className={`min-w-[140px] ${
                  isInCompareList ? "bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700" : ""
                }`}
              >
                {isInCompareList ? (
                  <>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove
                  </>
                ) : (
                  <>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Compare
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Visits Last Month</p>
                <p className="text-2xl font-bold">{school.visits.toLocaleString()}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Eye className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">School Data Completeness</p>
                <p className="text-2xl font-bold">{school.dataCompleteness}%</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <FileText className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <Progress value={school.dataCompleteness} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Digital Presence Index</p>
                <p className="text-2xl font-bold">{school.digitalPresence}%</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Laptop className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <Progress value={school.digitalPresence} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="facilities">Facilities</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
              <TabsTrigger value="academics">Academics</TabsTrigger>
              <TabsTrigger value="admissions">Admissions</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              {/* About Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Info className="h-5 w-5 mr-2 text-blue-600" />
                    About {school.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{school.about}</p>
                </CardContent>
              </Card>

              {/* License Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-blue-600" />
                    License & Accreditation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-500">License Number</h4>
                      <p>{school.license.number}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-500">Issued By</h4>
                      <p>{school.license.issuedBy}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-500">Issue Date</h4>
                      <p>{new Date(school.license.issuedDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-500">Expiry Date</h4>
                      <p>{new Date(school.license.expiryDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-500">Status</h4>
                      <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                        {school.license.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-medium text-gray-500">Accreditations</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {school.license.accreditations.map((accreditation, index) => (
                        <Badge key={index} variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                          <Award className="h-3 w-3 mr-1" />
                          {accreditation}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Key Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Info className="h-5 w-5 mr-2 text-blue-600" />
                    Key Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium flex items-center text-gray-700">
                        <BookOpen className="h-4 w-4 mr-2 text-blue-600" />
                        Curriculum
                      </h4>
                      <ul className="mt-2 space-y-1">
                        {school.curriculum.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <ChevronRight className="h-4 w-4 mr-1 text-blue-600 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium flex items-center text-gray-700">
                        <Globe className="h-4 w-4 mr-2 text-blue-600" />
                        Languages of Instruction
                      </h4>
                      <ul className="mt-2 space-y-1">
                        {school.languages.map((language, index) => (
                          <li key={index} className="flex items-start">
                            <ChevronRight className="h-4 w-4 mr-1 text-blue-600 flex-shrink-0 mt-0.5" />
                            <span>{language}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location Map */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Map className="h-5 w-5 mr-2 text-blue-600" />
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video relative rounded-md overflow-hidden mb-4">
                    <Image
                      src="/placeholder.svg?height=400&width=800&text=Interactive+Map"
                      alt="School location map"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-gray-700">{school.location.address}</p>
                  <p className="text-sm text-gray-500">{school.location.landmarks}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="facilities" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building2 className="h-5 w-5 mr-2 text-blue-600" />
                    School Facilities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {school.facilities.map((facility, index) => (
                      <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start gap-3">
                          {facility.icon && (
                            <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                              <facility.icon className="h-5 w-5" />
                            </div>
                          )}
                          <div>
                            <h3 className="font-medium">
                              {facility.name} {facility.count && `(${facility.count})`}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">{facility.details}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="gallery" className="space-y-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <ImageIcon className="h-5 w-5 mr-2 text-blue-600" />
                      School Gallery
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="flex border rounded-md overflow-hidden">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`rounded-none ${galleryView === "grid" ? "bg-blue-50 text-blue-600" : ""}`}
                          onClick={() => setGalleryView("grid")}
                        >
                          Grid
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`rounded-none ${galleryView === "slideshow" ? "bg-blue-50 text-blue-600" : ""}`}
                          onClick={() => setGalleryView("slideshow")}
                        >
                          Slideshow
                        </Button>
                      </div>
                      <select
                        className="border rounded-md px-2 py-1 text-sm"
                        value={galleryFilter}
                        onChange={(e) => setGalleryFilter(e.target.value)}
                      >
                        <option value="all">All Photos</option>
                        <option value="exterior">Exterior</option>
                        <option value="interior">Interior</option>
                        <option value="facilities">Facilities</option>
                        <option value="activities">Activities</option>
                      </select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {galleryView === "grid" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {filteredGallery.map((item) => (
                        <div key={item.id} className="overflow-hidden rounded-lg border">
                          <div className="relative h-48">
                            <Image
                              src={item.url || "/placeholder.svg"}
                              alt={item.caption}
                              fill
                              className="object-cover transition-transform hover:scale-105 duration-300"
                            />
                          </div>
                          <div className="p-2">
                            <p className="text-sm text-gray-600">{item.caption}</p>
                            <Badge variant="outline" className="mt-1 text-xs">
                              {item.type}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="relative aspect-video rounded-lg overflow-hidden">
                        <Image
                          src={filteredGallery[currentSlide]?.url || "/placeholder.svg"}
                          alt={filteredGallery[currentSlide]?.caption || "Gallery image"}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-3">
                          <p>{filteredGallery[currentSlide]?.caption}</p>
                          <Badge variant="outline" className="mt-1 text-xs bg-white/20 text-white">
                            {filteredGallery[currentSlide]?.type}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute top-1/2 left-2 transform -translate-y-1/2 rounded-full bg-white/80"
                        onClick={prevSlide}
                      >
                        &lt;
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 rounded-full bg-white/80"
                        onClick={nextSlide}
                      >
                        &gt;
                      </Button>
                      <div className="mt-2 text-center text-sm text-gray-500">
                        {currentSlide + 1} of {filteredGallery.length}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Add Academics Tab Content */}
            <TabsContent value="academics" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                    Academic Programs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {/* Curriculum Structure */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Curriculum Structure</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border rounded-lg p-4 hover:bg-blue-50 transition-colors">
                          <h5 className="font-medium text-blue-600">Primary Years</h5>
                          <p className="text-gray-600 mt-2 text-sm">{school.academics.curriculum.primary}</p>
                        </div>
                        <div className="border rounded-lg p-4 hover:bg-blue-50 transition-colors">
                          <h5 className="font-medium text-blue-600">Middle Years</h5>
                          <p className="text-gray-600 mt-2 text-sm">{school.academics.curriculum.middle}</p>
                        </div>
                        <div className="border rounded-lg p-4 hover:bg-blue-50 transition-colors">
                          <h5 className="font-medium text-blue-600">High School</h5>
                          <p className="text-gray-600 mt-2 text-sm">{school.academics.curriculum.high}</p>
                        </div>
                      </div>
                    </div>

                    {/* Subjects Offered */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Subjects Offered</h4>
                      <div className="flex flex-wrap gap-2">
                        {school.academics.subjects.map((subject, index) => (
                          <Badge 
                            key={index} 
                            variant="outline" 
                            className="bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors py-1 px-3"
                          >
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Class Information */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Class Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Class Size</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">Average Students per Class</span>
                                <Badge variant="outline" className="bg-blue-50 text-blue-600">
                                  {school.academics.classSize.average} students
                                </Badge>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">Maximum Class Size</span>
                                <Badge variant="outline" className="bg-blue-50 text-blue-600">
                                  {school.academics.classSize.maximum} students
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Assessment Methods</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {school.academics.assessmentMethods.map((method, index) => (
                                <li key={index} className="flex items-start">
                                  <ChevronRight className="h-4 w-4 mr-2 text-blue-600 mt-1" />
                                  <span className="text-gray-600">{method}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    {/* University Acceptance */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">University Acceptance</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardContent className="pt-6">
                            <div className="text-center">
                              <div className="text-3xl font-bold text-blue-600">
                                {school.academics.universityAcceptance.rate}
                              </div>
                              <p className="text-gray-600 mt-1">University Acceptance Rate</p>
                            </div>
                            <div className="mt-6">
                              <h5 className="font-medium text-gray-700 mb-2">Top Destinations</h5>
                              <div className="flex flex-wrap gap-2">
                                {school.academics.universityAcceptance.destinations.map((destination, index) => (
                                  <Badge 
                                    key={index} 
                                    variant="outline" 
                                    className="bg-gray-50"
                                  >
                                    {destination}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Notable Alumni Universities</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-2">
                              {school.academics.universityAcceptance.notableAlumni.map((university, index) => (
                                <Badge 
                                  key={index} 
                                  variant="outline" 
                                  className="bg-blue-50 text-blue-600 border-blue-200"
                                >
                                  {university}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    {/* Graduation Requirements */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Graduation Requirements</h4>
                      <div className="bg-gray-50 rounded-lg p-6">
                        <ul className="space-y-3">
                          {school.academics.graduationRequirements.map((requirement, index) => (
                            <li key={index} className="flex items-start">
                              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                                {index + 1}
                              </div>
                              <span className="text-gray-700">{requirement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Admissions Tab - New Content */}
            <TabsContent value="admissions" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-blue-600" />
                    Admissions Process
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Application Timeline</h4>
                      <p className="text-gray-600 p-4 bg-blue-50 rounded-lg">
                        {school.admissions.openDates}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Process Steps</h4>
                      <div className="space-y-4">
                        {school.admissions.process.map((step, index) => (
                          <div key={index} className="flex items-start">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                              {index + 1}
                            </div>
                            <div className="flex-grow">
                              <p className="text-gray-700">{step}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Required Documents</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {school.admissions.requirements.map((requirement, index) => (
                          <div key={index} className="flex items-start p-3 border rounded-lg">
                            <FileText className="h-5 w-5 mr-2 text-blue-600" />
                            <span className="text-gray-600">{requirement}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Entrance Assessment</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border rounded-lg p-4">
                          <h5 className="font-medium mb-2">Assessment Details</h5>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Subjects:</span>
                              <span>{school.admissions.entranceExam.subjects.join(", ")}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Format:</span>
                              <span>{school.admissions.entranceExam.format}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Duration:</span>
                              <span>{school.admissions.entranceExam.duration}</span>
                            </div>
                          </div>
                        </div>
                        <div className="border rounded-lg p-4">
                          <h5 className="font-medium mb-2">Application Fee</h5>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Amount:</span>
                              <span className="font-medium">
                                {school.admissions.applicationFee.amount} {school.admissions.applicationFee.currency}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Refundable:</span>
                              <span>{school.admissions.applicationFee.refundable ? "Yes" : "No"}</span>
                            </div>
                          </div>
                          <Button className="w-full mt-4">Apply Now</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Sidebar - Add License Information */}
        <div className="space-y-6">
          {/* License Status Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <FileText className="h-5 w-5 mr-2 text-green-600" />
                License Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status</span>
                  <Badge variant="outline" className="bg-green-50 text-green-600">
                    {school.license.status}
                  </Badge>
                </div>
                <div>
                  <span className="text-gray-600">License Number</span>
                  <p className="font-medium mt-1">{school.license.number}</p>
                </div>
                <div>
                  <span className="text-gray-600">Issued By</span>
                  <p className="font-medium mt-1">{school.license.issuedBy}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-gray-600">Issue Date</span>
                    <p className="font-medium mt-1">
                      {new Date(school.license.issuedDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Expiry Date</span>
                    <p className="font-medium mt-1">
                      {new Date(school.license.expiryDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Accreditations</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {school.license.accreditations.map((accreditation, index) => (
                      <Badge key={index} variant="outline" className="bg-blue-50 text-blue-600">
                        {accreditation}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-3 text-gray-500" />
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <p className="text-gray-600">{school.contact.phone}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-3 text-gray-500" />
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-gray-600">{school.contact.email}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Globe className="h-5 w-5 mr-3 text-gray-500" />
                <div>
                  <h4 className="font-medium">Website</h4>
                  <p className="text-gray-600">{school.contact.website}</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-gray-500" />
                <div>
                  <h4 className="font-medium">Address</h4>
                  <p className="text-gray-600">{school.location.address}</p>
                  <p className="text-sm text-gray-500 mt-1">{school.location.landmarks}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 