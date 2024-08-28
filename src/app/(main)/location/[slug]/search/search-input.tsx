'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';

import IcSpinner from '@/assets/spinner.svg';
import Button from '@/components/button';
import { apiURLGeocoding } from '@/constants';
import { GeocodingResponse, ResponseError } from '@/types';
import { getLocationPath } from '@/utils/helpers';
import { addLocation } from '@/utils/storage';

export default function SearchInput() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchGeocoding = async () => {
    setErrorMessage('');
    setIsLoading(true);
    const res = await fetch(apiURLGeocoding(query));
    const data = await res.json();
    if (res.ok) {
      const successData = data as GeocodingResponse[];
      if (data.length) {
        const location = `${successData[0].name}, ${successData[0].country}`;
        addLocation(location);
        router.push(getLocationPath(location));
      } else {
        setErrorMessage('Invalid country or city');
        setIsLoading(false);
        inputRef.current?.focus();
      }
    } else {
      const errorData = data as ResponseError;
      setErrorMessage(
        `Error ${errorData?.cod}: ${errorData?.message ?? 'An error occurred'}`
      );
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };
  const handleInputKeydown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      fetchGeocoding();
    }
  };

  const handleButtonClick = () => {
    fetchGeocoding();
  };

  return (
    <div className='flex flex-col'>
      <div className='flex gap-x-2'>
        <input
          className='flex-auto rounded-md border border-gray-300 px-4 shadow-md transition-colors read-only:cursor-wait read-only:bg-gray-100 read-only:text-gray-500 motion-reduce:transition-none'
          placeholder='Search country or city here...'
          value={query}
          readOnly={isLoading}
          ref={inputRef}
          onChange={handleInputChange}
          onKeyDown={handleInputKeydown}
        ></input>
        <Button
          type='primary'
          classNames='min-w-20'
          onClick={handleButtonClick}
        >
          {isLoading ? (
            <IcSpinner
              className='animate-spin'
              width={20}
              height={20}
              fill='currentColor'
            />
          ) : (
            'Search'
          )}
        </Button>
      </div>
      <div className='min-h-6'>
        {errorMessage ? (
          <span className='text-sm text-red-500'>{errorMessage}</span>
        ) : null}
      </div>
    </div>
  );
}
