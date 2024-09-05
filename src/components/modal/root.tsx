'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({
  children,
  onClose,
}: Readonly<{
  children: React.ReactNode;
  onClose(): void;
}>) {
  const portalRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    portalRef.current = document.getElementById('modal');

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

  return portalRef.current
    ? createPortal(
        <div className='fixed inset-0 z-50 grid animate-fade-in-ease grid-cols-12 content-center bg-[color-mix(in_srgb,black,transparent_75%)] backdrop-blur-sm motion-reduce:animate-none'>
          <div className='col-span-10 col-start-2 animate-slide-up-ease rounded-lg bg-white p-4 shadow-md motion-reduce:animate-none md:col-span-6 md:col-start-4 lg:col-span-4 lg:col-start-5'>
            {children}
          </div>
        </div>,
        portalRef.current
      )
    : null;
}
