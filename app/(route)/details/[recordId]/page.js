'use client';

import GlobalApis from '@/app/_utils/GlobalApis';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import DoctordDetail from './_components/DoctordDetail';

function Details() {
  const params = useParams();
  const recordId = params?.recordId;

  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    if (recordId) {
      GlobalApis.getDoctorById(recordId)
        .then((resp) => {
          const fetchedDoctor = resp.data.data?.[0];
          if (fetchedDoctor) {
            setDoctor(fetchedDoctor);
            console.log('Doctor:', fetchedDoctor);
          } else {
            console.warn('Doctor not found');
          }
        })
        .catch((err) => {
          console.error('Error fetching doctor:', err);
        });
    }
  }, [recordId]);

  return (
    <div>
      {doctor ? (
        <div className='p-5 md:px-20'>
          <h2 className='font-bold text-[22px]'>Deatils</h2>
          <div className='grid grid-cols-1 lg:grid-cols-4'>
            <div className='col-span-3'>
              {doctor&&<DoctordDetail doctor={doctor}/>}
            </div>
            {/*suggestion (make by ur own)*/}
            <div>

            </div>

          </div>
        </div>
      ) : (
        <p>Loading doctor details...</p>
      )}
    </div>
  );
}

export default Details;
