'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TimeSlot {
  time: string
  available: boolean
}

interface BookingCalendarProps {
  onSelectSlot?: (date: Date, time: string) => void
  availableSlots?: Record<string, TimeSlot[]>
}

export function BookingCalendar({ onSelectSlot, availableSlots = {} }: BookingCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate()

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay()

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const selectDate = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    setSelectedDate(date)
    setSelectedTime(null)
  }

  const selectTime = (time: string) => {
    setSelectedTime(time)
    if (selectedDate && onSelectSlot) {
      onSelectSlot(selectedDate, time)
    }
  }

  const getDateKey = (date: Date) => {
    return date.toISOString().split('T')[0]
  }

  const isDateAvailable = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    const dateKey = getDateKey(date)
    return availableSlots[dateKey]?.some(slot => slot.available) || false
  }

  const defaultTimeSlots: TimeSlot[] = [
    { time: '09:00 AM', available: true },
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: false },
    { time: '01:00 PM', available: true },
    { time: '02:00 PM', available: true },
    { time: '03:00 PM', available: false },
    { time: '04:00 PM', available: true },
  ]

  const timeSlots = selectedDate
    ? availableSlots[getDateKey(selectedDate)] || defaultTimeSlots
    : defaultTimeSlots

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Calendar */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Select Date</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={previousMonth}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="text-sm font-medium min-w-[140px] text-center">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={nextMonth}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 text-center">
            {dayNames.map((day) => (
              <div key={day} className="text-xs font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}
            {Array.from({ length: firstDayOfMonth }).map((_, index) => (
              <div key={`empty-${index}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1
              const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
              const isToday = date.toDateString() === new Date().toDateString()
              const isSelected = selectedDate?.toDateString() === date.toDateString()
              const isPast = date < new Date(new Date().setHours(0, 0, 0, 0))
              const hasAvailability = isDateAvailable(day)

              return (
                <Button
                  key={day}
                  variant={isSelected ? 'default' : 'ghost'}
                  className={cn(
                    'h-10 w-full p-0',
                    isToday && !isSelected && 'border-2 border-primary',
                    isPast && 'opacity-50 cursor-not-allowed',
                    !hasAvailability && !isPast && 'opacity-30'
                  )}
                  onClick={() => !isPast && hasAvailability && selectDate(day)}
                  disabled={isPast || !hasAvailability}
                >
                  {day}
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Time Slots */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Select Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedDate ? (
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((slot) => (
                <Button
                  key={slot.time}
                  variant={selectedTime === slot.time ? 'default' : 'outline'}
                  className="w-full"
                  onClick={() => slot.available && selectTime(slot.time)}
                  disabled={!slot.available}
                >
                  {slot.time}
                </Button>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              Please select a date first
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
