'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import { X, SlidersHorizontal } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

interface ProductFiltersProps {
  onFilterChange?: (filters: FilterState) => void
  maxPrice?: number
}

export interface FilterState {
  search: string
  types: string[]
  priceRange: [number, number]
  sortBy: string
}

const productTypes = [
  { id: 'digital', label: 'Digital Products' },
  { id: 'physical', label: 'Physical Products' },
  { id: 'service', label: 'Services' },
  { id: 'subscription', label: 'Subscriptions' },
]

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
]

export function ProductFilters({ onFilterChange, maxPrice = 1000 }: ProductFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    types: [],
    priceRange: [0, maxPrice],
    sortBy: 'newest',
  })

  const updateFilters = (updates: Partial<FilterState>) => {
    const newFilters = { ...filters, ...updates }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const toggleType = (typeId: string) => {
    const newTypes = filters.types.includes(typeId)
      ? filters.types.filter((t) => t !== typeId)
      : [...filters.types, typeId]
    updateFilters({ types: newTypes })
  }

  const clearFilters = () => {
    const defaultFilters: FilterState = {
      search: '',
      types: [],
      priceRange: [0, maxPrice],
      sortBy: 'newest',
    }
    setFilters(defaultFilters)
    onFilterChange?.(defaultFilters)
  }

  const hasActiveFilters = 
    filters.search || 
    filters.types.length > 0 || 
    filters.priceRange[0] > 0 || 
    filters.priceRange[1] < maxPrice

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div className="space-y-2">
        <Label htmlFor="search">Search Products</Label>
        <Input
          id="search"
          placeholder="Search by name..."
          value={filters.search}
          onChange={(e) => updateFilters({ search: e.target.value })}
        />
      </div>

      <Separator />

      {/* Product Types */}
      <div className="space-y-3">
        <Label>Product Type</Label>
        <div className="space-y-2">
          {productTypes.map((type) => (
            <div key={type.id} className="flex items-center space-x-2">
              <Checkbox
                id={type.id}
                checked={filters.types.includes(type.id)}
                onCheckedChange={() => toggleType(type.id)}
              />
              <label
                htmlFor={type.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {type.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div className="space-y-4">
        <Label>Price Range</Label>
        <Slider
          min={0}
          max={maxPrice}
          step={10}
          value={filters.priceRange}
          onValueChange={(value: number[]) => updateFilters({ priceRange: value as [number, number] })}
          className="w-full"
        />
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>${filters.priceRange[0]}</span>
          <span>${filters.priceRange[1]}</span>
        </div>
      </div>

      <Separator />

      {/* Sort By */}
      <div className="space-y-3">
        <Label>Sort By</Label>
        <div className="space-y-2">
          {sortOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={option.value}
                checked={filters.sortBy === option.value}
                onCheckedChange={() => updateFilters({ sortBy: option.value })}
              />
              <label
                htmlFor={option.value}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <>
          <Separator />
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={clearFilters}
          >
            <X className="h-4 w-4" />
            Clear All Filters
          </Button>
        </>
      )}
    </div>
  )

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:block space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">Filters</h3>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="gap-1"
            >
              <X className="h-3 w-3" />
              Clear
            </Button>
          )}
        </div>
        <FilterContent />
      </div>

      {/* Mobile Filters */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="lg:hidden gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <span className="ml-1 px-1.5 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                {filters.types.length + (filters.search ? 1 : 0)}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Filter Products</SheetTitle>
            <SheetDescription>
              Refine your search to find exactly what you&apos;re looking for
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <FilterContent />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
