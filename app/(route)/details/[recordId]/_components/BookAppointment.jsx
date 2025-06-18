'use client'

import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Calendar } from "@/components/ui/calendar"
import { CalendarDays, Clock } from 'lucide-react'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import GlobalApis from '@/app/_utils/GlobalApis'
import { toast } from 'sonner'

function BookAppointment({ doctor }) {
  const [date, setDate] = useState(new Date())
  const [timeSlot, setTimeSlot] = useState([])
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null)
  const [note, setNote] = useState('')
  const { user } = useKindeBrowserClient()

  useEffect(() => {
    generateTimeSlots()
  }, [])

  const generateTimeSlots = () => {
    const slots = []
    for (let i = 10; i <= 12; i++) {
      slots.push({ id: `${i}:00AM`, time: `${i}:00 AM` })
      slots.push({ id: `${i}:30AM`, time: `${i}:30 AM` })
    }
    for (let i = 1; i <= 6; i++) {
      slots.push({ id: `${i}:00PM`, time: `${i}:00 PM` })
      slots.push({ id: `${i}:30PM`, time: `${i}:30 PM` })
    }
    setTimeSlot(slots)
  }

  const isPastDay = (day) => {
    const today = new Date()
    return day < new Date(today.getFullYear(), today.getMonth(), today.getDate())
  }

  const saveBooking = () => {
    if (!user || !selectedTimeSlot || !date || !doctor) {
      toast.error("Missing required information to book appointment.")
      return
    }

    const data = {
      data: {
        UserName: user.given_name + " " + user.family_name,
        Email: user.email,
        time: selectedTimeSlot,
        Date: date,
        doctor: doctor.id,
        Note: note
      }
    }

    GlobalApis.bookAppointment(data)
      .then(resp => {
        console.log("Booking response:", resp)
        if (resp) {
          GlobalApis.sendEmail(data).then(emailResp => {
            console.log("Email sent:", emailResp)
          })
          toast.success("Booking confirmation sent to your email.")
        }
      })
      .catch(err => {
        console.error("Booking failed:", err)
        toast.error("Failed to book appointment. Try again.")
      })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-3 rounded-full cursor-pointer bg-blue-500 text-white">
          Book Appointment
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book Appointment</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date Picker */}
          <div className="flex items-center flex-col gap-3">
            <h2 className="flex justify-start gap-2 text-sm font-medium">
              <CalendarDays className="text-blue-500 w-4 h-5 cursor-pointer" />
              Select Date
            </h2>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={isPastDay}
              className="rounded-md border items-center justify-center p-2"
            />
          </div>

          {/* Time Slots */}
          <div>
            <h2 className="flex items-center gap-2 text-sm font-medium mb-3">
              <Clock className="text-blue-500 w-5 h-5" />
              Select Time Slot
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 border-[1px] rounded-lg p-1">
              {timeSlot.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedTimeSlot(item.time)}
                  className={`p-2 text-sm border rounded-full transition-all duration-200 
                    ${selectedTimeSlot === item.time
                      ? 'bg-blue-500 text-white border-blue-500 shadow-md'
                      : 'bg-white text-gray-700 hover:bg-blue-100 border-gray-300'
                    }`}
                >
                  {item.time}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Note input */}
        <div className="mt-4">
          <label className="text-sm font-medium block mb-1">Add a Note</label>
          <textarea
            className="w-full p-2 border rounded-md text-sm"
            placeholder="Any specific notes for the doctor..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <DialogFooter className="sm:justify-end mt-4 space-x-2">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="cursor-pointer">
              Cancel
            </Button>
          </DialogClose>
          <Button
            className="bg-blue-500 cursor-pointer"
            type="button"
            onClick={saveBooking}
            disabled={!selectedTimeSlot || !date}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default BookAppointment
