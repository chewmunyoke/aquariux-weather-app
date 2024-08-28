'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { getLocationPath } from '@/utils/helpers';
import { getLatestLocation } from '@/utils/storage';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const location = getLatestLocation();
    router.push(getLocationPath(location));
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
