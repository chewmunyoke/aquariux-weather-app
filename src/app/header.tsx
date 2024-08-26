import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <div className='grid grid-cols-subgrid col-span-full sticky top-0 border-b border-gray-300 shadow-md bg-white'>
      <div className='col-start-2 md:col-start-3 lg:col-start-4 col-span-10 md:col-span-8 lg:col-span-6 flex items-center justify-between'>
        <div className='flex gap-x-1 h-fit'>
          <Image
            src='/location-pin.svg'
            width={24}
            height={24}
            alt=''
            aria-hidden
          />
          <div className='font-medium'>Current location</div>
        </div>
        <Link
          href='/search'
          className='relative p-4 -mr-4 rounded-full before:absolute before:inset-1/4 before:-z-10 before:rounded-full before:bg-transparent before:[transition:_background-color_0.2s_cubic-bezier(0.22,0.1,0.1,1),inset_0.2s_cubic-bezier(0.35,0.12,0.14,1.42)] hover:before:inset-0 hover:before:bg-gray-200'
        >
          <Image src='/search.svg' width={24} height={24} alt='' aria-hidden />
        </Link>
      </div>
    </div>
  );
}
