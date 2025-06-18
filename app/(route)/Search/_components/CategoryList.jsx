'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, RefreshCw } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import GlobalApi from '@/app/_utils/GlobalApis';
import Image from 'next/image';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import Link from 'next/link';
import { usePathname } from 'next/navigation';


function CategoryList() {
    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);

  const params=usePathname();  
  const category=params.split('/')[2];
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
    <div className='h-screen mt-5 fixed flex flex-col '><Command>
  <CommandInput placeholder="Type a command or search..." />
  <CommandList className='overflow-visible'>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
        {categoryList&&categoryList.map((item,index) => (
            <CommandItem key={index}>
                <Link href={'/Search/'+item.Name} className={`p-2 flex gap-3 text-[13px] font-semibold text-blue-500
                   rounded-md items-center cursor-pointer w-full ${category===item.Name?'bg-blue-100':''}`}>
                    <Image 
                        src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${item?.Icon?.[0]?.url}`} 
                        alt='icon' 
                        height={25} 
                        width={25} 
                    />
                    <label>{item.Name}</label>
                </Link>
            </CommandItem>
        ))}
      
      
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      
    </CommandGroup>
  </CommandList>
</Command>
</div>
  )
}

export default CategoryList