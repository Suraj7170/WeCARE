import React from 'react'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function Hero() {
  return (
    <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
      <div>
        <div className="max-w-lg md:max-w-none">
          <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                 Welcome to <span className="text-blue-500 font-extrabold">WeCARE</span> – Your Online 
                 <span className="text-blue-500 font-extrabold"> Doctor Appointment</span> Solution
          </h2>

          <p className="mt-4 text-gray-700">
            Book appointments with trusted doctors anytime, anywhere. <span className='font-extrabold'>WeCARE</span> makes healthcare more accessible by allowing you to browse doctor profiles, 
            choose convenient time slots, and manage all your bookings online. Say goodbye to long queues and waiting times—get the care you need with just a few clicks.
          </p>
          
          <Link href='/Search/Dentist'><Button className="mt-10 cursor-pointer">Explore Now</Button> </Link>
        </div>
      </div>

      <div>
        <Image
          src="/doctors.jpg"
          width={400}
          height={600}
          className="insert-0 
          object-cover rounded shadow-lime-1050"
          alt=""
        />
      </div>
    </div>
        </div>
    </section>
  )
}

export default Hero