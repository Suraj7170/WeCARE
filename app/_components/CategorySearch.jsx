'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, RefreshCw } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import GlobalApi from '../_utils/GlobalApis';
import Image from 'next/image';
import Link from 'next/link';

function CategorySearch() {
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = () => {
    setLoading(true);
    setError(null);
    GlobalApi.getCategory()
      .then((resp) => {
        setCategoryList(resp.data.data || []);
        console.log('Category List:', resp.data.data);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setError('Failed to load categories. Please try again.');
      })
      .finally(() => setLoading(false));
  };

  const filteredCategories = categoryList.filter((cat) =>
    cat?.Name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  if (loading) return <div className='text-center py-10'>Loading categories...</div>;

  if (error) return (
    <div className='text-center py-10'>
      <p className='text-red-500 mb-4'>{error}</p>
      <Button onClick={getCategoryList}>
        <RefreshCw className='mr-2 h-4 w-4' /> Retry
      </Button>
    </div>
  );

  return (
    <div className='mb-10 items-center flex flex-col gap-3'>
      <h2 className='font-bold text-4xl tracking-wide'>
        Search <span className='text-blue-500 font-extrabold'>Doctors</span>
      </h2>

      <h2 className='text-grey-500 text-xl'>
        Search your Doctor and Book your Appointment in one click
      </h2>

      <div className='flex w-full max-w-sm items-center space-x-2'>
        <Input
          type='text'
          placeholder='Search by specialty...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button type='submit' className='cursor-pointer'>
          <Search className='mr-2 h-4 w-4 ' /> Search
        </Button>
      </div>

      <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full transition-all'>
        {filteredCategories.length === 0 ? (
          <div className='col-span-full text-center py-10'>
            <p className='text-gray-500 mb-4'>
              {searchTerm ? 
                `No categories found for "${searchTerm}"` : 
                'No categories available'}
            </p>
            {searchTerm && (
              <Button variant='outline' onClick={handleClearSearch}>
                Clear search
              </Button>
            )}
            <Button className='ml-2' onClick={getCategoryList}>
              <RefreshCw className='mr-2 h-4 w-4' /> Refresh
            </Button>
          </div>
        ) : (
          filteredCategories.map((item, index) => {
            const imageUrl = item?.Icon?.[0]?.url
              ? `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${item.Icon[0].url}`
              : null;

            return (
              <Link href={'/Search/'+item.Name}
                key={index} 
                className='flex flex-col items-center p-4 border rounded-lg hover:bg-blue-50 cursor-pointer transition-all'
              >
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={`${item?.attributes?.Name || 'Category'} icon`}
                    width={60}
                    height={60}
                    className='rounded-full mb-2'
                  />
                )}
                <p className='text-lg font-medium text-center'>
                  {item?.Name || 'Unnamed Category'}
                </p>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}

export default CategorySearch;