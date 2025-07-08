import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function DoctorList({ doctorList , heading='Popular Doctors'}) {
  return (
    <div className='mb-10 items-center flex flex-col gap-3'>
      <h2 className='font-bold text-xl'>{heading}</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
        {doctorList.length > 0 ? (
          doctorList.map((item) => {
            const imageUrl = item?.Image?.[0]?.url;

            return (
              <div
                key={item.id}
                className='flex flex-col items-center gap-2 mb-4 border-[1px] rounded-lg hover:border-blue-700 cursor-pointer transition-shadow p-4 w-[150px]'
              >
                <h3 className='text-[12px] text-gray-600'>
                  {item?.category?.Name || 'No Category'}
                </h3>

                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt='Doctor'
                    width={100}
                    height={100}
                    className='h-[100px] w-[100px] object-cover rounded-full'
                  />
                )}

                <p className='text-[13px] items-center font-medium'>
                  {item?.Name || 'Unnamed Doctor'}
                </p>
                <Link href={`/details/${item.id}`} className='w-full'>
                <h2 className='p-1 px-2 border-[1px] border-black rounded-full text-[12px] 
                text-center hover:bg-blue-500 cursor-pointer transition-all'>
                  Book Now
                </h2>
              </Link>
              </div>
            );
          })
        ) : (
          // skelton effect
          [1, 2, 3, 4, 5, 6].map((item, index) => (
            <div
              key={index}
              className='h-[220px] bg-slate-100 w-full rounded-lg animate-pulse'
            />
          ))
        )}
      </div>
    </div>
  );
}

export default DoctorList;
