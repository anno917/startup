"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  ShoppingBag,
  X,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Heart,
  ArrowLeft,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { PageTitle } from "@/components/ui/page-title"

// Product interface
interface Product {
  id: number
  name: string
  price: number
  img: string
  category: string
  description: string
  rating: string
  type: string
  seller: string
}

// Product Modal Component
const ProductModal = ({ product, onClose }: { product: Product | null; onClose: () => void }) => (
  <AnimatePresence>
    {product && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 15, stiffness: 200 }}
          className="bg-white p-6 rounded-xl max-w-lg w-full relative shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 text-gray-500 hover:text-red-500 h-8 w-8"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={product.img || "/placeholder.svg"}
              alt={product.name}
              className="w-full md:w-1/2 h-64 object-cover rounded-lg mb-4 md:mb-0"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.onerror = null
                target.src = "https://placehold.co/300x300/cccccc/ffffff?text=IMG"
              }}
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
              <Badge variant="secondary" className="mb-3">
                {product.category}
              </Badge>
              <p className="text-sm text-gray-600 mb-4">{product.description || "No description available."}</p>
              <p className="text-2xl font-semibold text-blue-600 mb-4">
                {product.price.toLocaleString("en-DZ", { style: "currency", currency: "DZD" })}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="flex-1" onClick={() => alert(`Added ${product.name} to cart!`)}>
                  <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1"
                  onClick={() => alert(`Added ${product.name} to wishlist!`)}
                >
                  <Heart className="w-5 h-5 mr-2" /> Add to Wishlist
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
)

// Hero Slider Component
const HeroSlider = () => {
  const slides = [
    "https://placehold.co/1200x300/3b82f6/ffffff?text=Back+to+School+Offers",
    "https://placehold.co/1200x300/10b981/ffffff?text=Explore+STEM+Kits",
    "https://placehold.co/1200x300/f59e0b/ffffff?text=Learn+Anytime+Anywhere",
  ]
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), 4000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <div className="mb-10 rounded-xl overflow-hidden shadow-md">
      <AnimatePresence mode="wait">
        <motion.img
          key={slides[index]}
          src={slides[index]}
          alt={`Slide ${index + 1}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="w-full h-60 object-cover"
        />
      </AnimatePresence>
    </div>
  )
}

// Product Card Component
const StoreProductCard = ({ item, onClick }: { item: Product; onClick: (product: Product) => void }) => (
  <Card className="flex flex-col overflow-hidden h-full group transition-shadow duration-300 hover:shadow-xl">
    <div className="relative overflow-hidden cursor-pointer" onClick={() => onClick(item)}>
      <img
        src={item.img || "/placeholder.svg"}
        alt={item.name}
        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.onerror = null
          target.src = "https://placehold.co/300x200/cccccc/ffffff?text=IMG"
        }}
      />
      <Badge variant="secondary" className="absolute top-2 right-2 !px-1.5 !py-0.5 text-xs">
        {item.category}
      </Badge>
    </div>
    <CardContent className="p-4 flex flex-col flex-grow">
      <h3
        className="font-semibold text-base group-hover:text-blue-700 transition-colors mb-1 cursor-pointer line-clamp-2 h-12"
        onClick={() => onClick(item)}
      >
        {item.name}
      </h3>
      <p className="text-xs text-gray-500 mb-2 line-clamp-2 flex-grow">
        {item.description || "A useful item available in our store."}
      </p>
      <div className="flex items-center justify-between mt-auto pt-2">
        <span className="text-lg font-semibold text-blue-700">
          {item.price.toLocaleString("en-DZ", { style: "currency", currency: "DZD" })}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-pink-500 hover:bg-pink-100 h-8 w-8 rounded-full"
          onClick={(e) => {
            e.stopPropagation()
            alert(`Added ${item.name} to wishlist!`)
          }}
          aria-label="Add to Wishlist"
        >
          <Heart className="w-4 h-4" />
        </Button>
      </div>
    </CardContent>
    <CardFooter className="p-3 border-t bg-gray-50">
      <Button
        size="sm"
        className="w-full"
        onClick={(e) => {
          e.stopPropagation()
          alert(`Added ${item.name} to cart!`)
        }}
      >
        <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
      </Button>
    </CardFooter>
  </Card>
)

// Category Filter Component with Navigation Buttons
const CategoryFilter = ({
  categories,
  activeCategory,
  onCategoryChange,
}: {
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200 // Adjust scroll amount as needed
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="relative flex items-center">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-full absolute left-0 z-10 bg-white shadow-md"
        onClick={() => scroll("left")}
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>

      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto mx-10 py-2 no-scrollbar scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="flex space-x-2 min-w-max px-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ease-in-out ${
                activeCategory === cat
                  ? "ring-2 ring-offset-1 ring-blue-500 shadow-md bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-full absolute right-0 z-10 bg-white shadow-md"
        onClick={() => scroll("right")}
      >
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

// Main Store Page Component
export default function StorePage() {
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [page, setPage] = useState(1)
  const itemsPerPage = 8

  // Store Categories
  const storeCategories = [
    "All",
    "Courses",
    "Books",
    "Tech Kits",
    "Office Supplies",
    "School Supplies",
    "Toys & Kids Learning",
    "Arts & Crafts",
    "Computers & Tablets",
    "Hardware",
    "Printers & Scanners",
    "Monitors & Projectors",
    "Computer Supplies",
    "Smartphones",
    "Smartwatches & Wearables",
    "Smartphone Accessories",
    "Speakers, Headsets & Gadgets",
    "Robotic Kits",
    "Smart TV & Accessories",
    "Video & PC Gaming",
    "Musical Instruments",
    "Games",
  ]

  // Mock Store Items
  const mockStoreItems: Product[] = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    name: `Product Item ${i + 1}`,
    price: Math.floor(Math.random() * 45000 + 1000),
    img: `https://placehold.co/300x200/${Math.floor(Math.random() * 16777215).toString(16)}/ffffff?text=Item+${i + 1}`,
    category: storeCategories[(i % (storeCategories.length - 1)) + 1],
    description: `This is a brief description for Product Item ${i + 1}. It highlights key features and benefits. Ideal for various uses.`,
    rating: (Math.random() * 1.5 + 3.5).toFixed(1),
    type: `Type ${String.fromCharCode(65 + (i % 5))}`,
    seller: `Seller ${String.fromCharCode(88 + (i % 3))}`,
  }))

  // Filter items based on category and search term
  const filteredItems = mockStoreItems.filter((item) => {
    const matchesCategory = categoryFilter === "All" || item.category === categoryFilter
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Paginate items
  const paginatedItems = filteredItems.slice((page - 1) * itemsPerPage, page * itemsPerPage)
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setCategoryFilter(category)
    setPage(1) // Reset page on filter change
  }

  // Add CSS to hide scrollbars
  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      .no-scrollbar::-webkit-scrollbar {
        display: none;
      }
      .no-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Product Modal */}
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />

      {/* Store Title and Search */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <PageTitle title="Cumpass Store" icon={ShoppingBag} />
        <div className="relative w-full md:w-1/2 lg:w-1/3">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setPage(1) // Reset page on search
            }}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Category Filters with Navigation Buttons */}
      <div className="mb-8">
        <CategoryFilter
          categories={storeCategories}
          activeCategory={categoryFilter}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {/* Product Grid */}
      <p className="text-sm text-gray-500 mb-4">
        Showing {paginatedItems.length} of {filteredItems.length} products
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedItems.length ? (
          paginatedItems.map((item) => <StoreProductCard key={item.id} item={item} onClick={setSelectedProduct} />)
        ) : (
          <p className="col-span-full text-center text-gray-500 py-10">No products found matching your criteria.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-10 gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </section>
  )
}
