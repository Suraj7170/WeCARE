'use client'
import DoctorList from '@/app/_components/DoctorList';
import GlobalApis from '@/app/_utils/GlobalApis'
import React, { useState,useEffect } from 'react'

function Search({params}) {

  const [doctorList,setDoctorList]=useState([]);

  const unwrappedParams = React.use(params);
  
  useEffect(() => {
    console.log(unwrappedParams.cname);
    getDoctors();
  }, [unwrappedParams.cname]) 

  const getDoctors=() => {
    GlobalApis.getDoctorByCategory(unwrappedParams.cname).then((resp) => {
      console.log(resp.data);
      setDoctorList(resp.data.data);
    })
  }

  return (
    <div>
      <DoctorList heading={unwrappedParams.cname}
      doctorList={doctorList}/>
    </div>
  )
}

export default Search