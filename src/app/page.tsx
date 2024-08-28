'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { apiURLReverseGeocoding } from '@/constants';
import { GeocodingResponse } from '@/types';
import { getLocationPath } from '@/utils/helpers';
import { addLocation, getLatestLocation } from '@/utils/storage';

export default function HomePage() {
  const router = useRouter();

  const fallback = () => {
    const location = getLatestLocation();
    router.push(getLocationPath(location));
  };

  const fetchReverseGeocoding = async (lat: number, lon: number) => {
    const res = await fetch(apiURLReverseGeocoding(lat, lon));
    const data = await res.json();
    if (res.ok) {
      const successData = data as GeocodingResponse[];
      if (data.length) {
        const location = `${successData[0].name}, ${successData[0].country}`;
        addLocation(location);
        router.push(getLocationPath(location));
      } else {
        fallback();
      }
    } else {
      fallback();
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by this browser');
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetchReverseGeocoding(latitude, longitude);
      }, fallback);
    }
  }, []);

  return (
    <div className='absolute inset-0 grid content-center justify-center bg-slate-500'>
      <Image
        src='/logo.png'
        alt='Open Weather logo'
        width={200}
        height={100}
        priority
      />
    </div>
  );
}
