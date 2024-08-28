'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import IcSearch from '@/assets/search.svg';
import IcTrash from '@/assets/trash.svg';
import Card from '@/components/card';
import Loading from '@/components/loading';
import Message from '@/components/message';
import DialogModal from '@/components/modal/dialog';
import { getLocationFromSlug, getLocationPath } from '@/utils/helpers';
import {
  addLocation,
  getAllLocations,
  removeAllLocations,
  removeLocation,
} from '@/utils/storage';

function HistoryListItem({
  location,
  onDelete,
}: Readonly<{
  location: string;
  onDelete(): void;
}>) {
  const buttonClassNames =
    'relative block rounded-full p-2 before:absolute before:inset-1/4 before:-z-10 before:rounded-full before:bg-transparent before:[transition:_background-color_0.2s_cubic-bezier(0.22,0.1,0.1,1),inset_0.2s_cubic-bezier(0.35,0.12,0.14,1.42)] hover:before:inset-0 hover:before:bg-blue-200 motion-reduce:transition-none';

  const handleSearchClick = () => {
    addLocation(location);
  };

  const handleDeleteClick = () => {
    onDelete();
  };

  return (
    <li className='flex items-center justify-between gap-x-4 rounded-lg px-2 py-2 transition-colors hover:bg-blue-100 motion-reduce:transition-none'>
      <div>{location}</div>
      <div className='flex items-center'>
        <div className='z-10'>
          <Link
            href={getLocationPath(location)}
            className={buttonClassNames}
            onClick={handleSearchClick}
          >
            <IcSearch width={20} height={20} />
          </Link>
        </div>
        <div className='z-10'>
          <button className={buttonClassNames} onClick={handleDeleteClick}>
            <IcTrash width={20} height={20} />
          </button>
        </div>
      </div>
    </li>
  );
}

export default function HistoryCard({
  location,
}: Readonly<{ location: string }>) {
  const [locations, setLocations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [showClearAllModal, setShowClearAllModal] = useState<boolean>(false);

  const handleDelete = (location: string) => {
    setSelectedLocation(location);
  };

  const handleDeleteCancel = () => {
    setSelectedLocation('');
  };

  const handleDeleteConfirm = () => {
    removeLocation(selectedLocation);
    setLocations(getAllLocations(false));
    setSelectedLocation('');
  };

  const handleClearAll = () => {
    setShowClearAllModal(true);
  };

  const handleClearAllCancel = () => {
    setShowClearAllModal(false);
  };

  const handleClearAllConfirm = () => {
    removeAllLocations();
    setLocations([]);
    setShowClearAllModal(false);
  };

  useEffect(() => {
    setLocations(getAllLocations(true, getLocationFromSlug(location)));
    setIsLoading(false);
  }, []);

  return (
    <Card
      title='Search History'
      actionLabel='Clear all'
      actionCallback={handleClearAll}
    >
      {isLoading ? (
        <div className='min-h-[3.25rem]'>
          <Loading />
        </div>
      ) : !locations.length ? (
        <Message
          type='information'
          message='You have no search history. Start searching above!'
        />
      ) : (
        <ul className='-mx-2 flex flex-col'>
          {locations.map((location, index) => (
            <HistoryListItem
              key={`history-${index}`}
              location={location}
              onDelete={() => handleDelete(location)}
            />
          ))}
        </ul>
      )}
      {Boolean(selectedLocation) ? (
        <DialogModal
          cancelLabel='Cancel'
          confirmLabel='Confirm'
          onCancel={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          onClose={handleDeleteCancel}
        >
          <div>
            <h2 className='mb-2 font-medium'>{selectedLocation}</h2>
            <p>
              Are you sure you want to delete this location from your search
              history?
            </p>
          </div>
        </DialogModal>
      ) : null}
      {showClearAllModal ? (
        <DialogModal
          cancelLabel='Cancel'
          confirmLabel='Confirm'
          onCancel={handleClearAllCancel}
          onConfirm={handleClearAllConfirm}
          onClose={handleClearAllCancel}
        >
          <div>
            <h2 className='mb-2 font-medium'>Clear All</h2>
            <p>Are you sure you want to clear all your search history?</p>
          </div>
        </DialogModal>
      ) : null}
    </Card>
  );
}
