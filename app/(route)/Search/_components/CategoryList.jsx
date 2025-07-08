'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, RefreshCw } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import GlobalApi from '@/app/_utils/GlobalApis';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

function CategorySidebarLayout() {
  const [categoryList, setCategoryList] = useState([]);
  const [doctorList, setDoctorList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const params = useParams();
  const selectedCategory = params?.category;

  useEffect(() => {
    getCategoryList();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchDoctorsByCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const getCategoryList = () => {
    setLoading(true);
    setError(null);

    GlobalApi.getCategory()
      .then((resp) => {
        const categories = resp?.data?.data;
        setCategoryList(Array.isArray(categories) ? categories : []);
      })
      .catch((err) => {
        setError('Failed to load categories. Please try again.');
      })
      .finally(() => setLoading(false));
  };

  const fetchDoctorsByCategory = (categoryName) => {
    GlobalApi.getDoctorByCategory(categoryName).then((res) => {
      const doctors = res?.data?.data;
      setDoctorList(Array.isArray(doctors) ? doctors : []);
    });
  };

  const filteredCategories = categoryList.filter((cat) =>
    cat?.Name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-full md:w-64 p-4 border-r bg-white shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Search Categories</h2>
        <div className="flex items-center gap-2 mb-4">
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
          <Button variant="outline">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-col gap-3 overflow-y-auto">
          {loading ? (
            <p>Loading...</p>
          ) : filteredCategories.map((item, index) => {
            const imageUrl = isValidUrl(item?.Icon?.[0]?.url)
              ? item?.Icon?.[0]?.url
              : '/default-icon.png';

            return (
              <Link
                href={`/Search/${item.Name}`}
                key={index}
                className={`flex items-center gap-3 p-2 rounded hover:bg-blue-100 ${
                  selectedCategory === item.Name ? 'bg-blue-100' : ''
                }`}
              >
                <Image
                  src={imageUrl}
                  alt={item?.Name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="text-sm">{item?.Name}</span>
              </Link>
            );
          })}
        </div>
      </aside>

      {/* Doctor Display */}
      
        
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {doctorList.map((doctor, index) => {
              const imageUrl = doctor?.Image?.[0]?.url
                ? `http://localhost:1337${doctor?.Image?.[0]?.url}`
                : '/default-doctor.png';

              return (
                <div
                  key={index}
                  className="bg-white border rounded-lg p-4 flex flex-col items-center text-center shadow-sm hover:shadow-md transition"
                >
                  <Image
                    src={imageUrl}
                    alt="Doctor"
                    width={100}
                    height={100}
                    className="rounded-full mb-3 object-cover"
                  />
                  <p className="font-semibold">{`Dr. ${doctor.Name}`}</p>
                  <p className="text-sm text-gray-500">{selectedCategory}</p>
                  <Link href={`/details/${doctor.id}`}>
                    <Button className="mt-3">Book Now</Button>
                  </Link>
                </div>
              );
            })}
          </div>
        
      
    </div>
  );
}

export default CategorySidebarLayout;
