'use client';
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Hero from "./_components/Hero";
import CategorySearch from "./_components/CategorySearch";
import DoctorList from "./_components/DoctorList";
import GlobalApis from "./_utils/GlobalApis";
import { useEffect,useState} from "react";

export default function Home() {

  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    getDoctorList();
  }, []);

  const getDoctorList=()=>{
    GlobalApis.getDoctorList()
      .then((resp) => {
        console.log(resp.data.data);
        setDoctorList(resp.data.data || []);
      })
  }

  return (
    <div>
      <Hero/>
      
      <CategorySearch/>

      <DoctorList doctorList={doctorList}/>
    </div>
  );
}
