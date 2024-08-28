import Link from 'next/link';

import IcMapPin from '@/assets/map-pin.svg';
import IcSearch from '@/assets/search.svg';
import { getLocationFromSlug } from '@/utils/helpers';
import { getLocationPath } from '@/utils/helpers';

export default function Header({
  location,
  isSearch,
}: Readonly<{ location: string; isSearch: boolean }>) {
  const formattedLocation = getLocationFromSlug(location);
  const buttonLink = `${getLocationPath(formattedLocation)}${isSearch ? '' : '/search'}`;

  return (
    <div className='sticky top-0 z-40 col-span-full grid grid-cols-subgrid border-b border-gray-300 bg-white shadow-md'>
      <div className='col-span-10 col-start-2 flex items-center justify-between md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4 xl:col-span-4 xl:col-start-5'>
        <div className='flex h-fit items-center gap-x-2'>
          <IcMapPin className='shrink-0' width={24} height={24} />
          <div className='text-xl font-semibold'>{formattedLocation}</div>
        </div>
        <Link
          href={buttonLink}
          className='relative -mr-4 rounded-full p-4 before:absolute before:inset-1/4 before:-z-10 before:rounded-full before:bg-transparent before:[transition:_background-color_0.2s_cubic-bezier(0.22,0.1,0.1,1),inset_0.2s_cubic-bezier(0.35,0.12,0.14,1.42)] hover:before:inset-0 hover:before:bg-gray-200 motion-reduce:transition-none'
        >
          <IcSearch width={24} height={24} />
        </Link>
      </div>
    </div>
  );
}
