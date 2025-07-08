import { Button } from '@/components/ui/button';
import { GraduationCap, MapPin } from 'lucide-react';
import React from 'react';
import BookAppointment from './BookAppointment';

function DoctordDetail({ doctor }) {
  const imageUrl = doctor?.Image?.[0]?.url
  const fullImageUrl = imageUrl
    ? `http://localhost:1337${imageUrl}`
    : null;
    console.log('Doctor Details:', doctor?.Image?.[0]?.url);

  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-15 p-5 mt-2">
      <div>
        <img
          src={doctor?.Image?.[0]?.url}
          width={200}
          height={200}
          alt="Doctor"
          className="rounded-lg w-full h-[280px] object-cover "
        />
      </div>
      <div className="col-span-2 flex flex-col gap-2 items-baseline border-[1px] p-5 mt-5 rounded-lg">
        <h2 className="text-2xl font-semibold">{doctor.Name}</h2>
        <h2 className='flex text-semibold'>
            <GraduationCap />
            
            <span className='text-md'>{doctor.Year_of_exp} Year Of Experience </span>
        </h2>
        <h2 className='flex gap-2'>
            <MapPin/>
            <p className="text-gray-600">{doctor.Address}</p></h2>
        <p className="text-sm text-gray-500">Phone: {doctor.Phone}</p>
        <h3 className='text-center text-[14px] bg-blue-200 rounded-full  text-blue-500 p-1 px-2'>
            {doctor?.category?.Name || 'No Category'}
        </h3>
        <BookAppointment doctor={doctor}/>
        
      </div>
      
    </div>
    <div className='border-[1px] p-5 rounded-lg mt-5'>
        <h2 className='font-bold text-[18px] col-span-4'>About</h2>
        <p className='text-[14px] text-gray-600 tracking-wide'>{doctor.About}</p>
        </div>
        </>
  );
}

export default DoctordDetail;
