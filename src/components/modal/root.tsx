'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({
  children,
  onClose,
}: Readonly<{
  children: React.ReactNode;
  onClose(): void;
}>) {
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  return createPortal(
    <div className='animate-fade-in-ease absolute inset-0 z-50 grid grid-cols-12 content-center bg-[color-mix(in_srgb,black,transparent_75%)] backdrop-blur-sm motion-reduce:animate-none'>
      <div className='animate-slide-up-ease col-span-10 col-start-2 gap-y-4 rounded-lg bg-white p-4 shadow-md motion-reduce:animate-none md:col-span-6 md:col-start-4 lg:col-span-4 lg:col-start-5'>
        {children}
      </div>
    </div>,
    document.getElementById('modal')!
  );
}
