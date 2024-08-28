import cx from 'classnames';

import IcError from '@/assets/error.svg';
import IcInformation from '@/assets/information.svg';
import IcSuccess from '@/assets/success.svg';
import IcWarning from '@/assets/warning.svg';
import type { MessageProps, MessageType } from '@/types';

export default function Message({
  type,
  message,
}: Readonly<{
  type: MessageType;
  message: string;
}>) {
  const typeMap: Record<MessageType, MessageProps> = {
    information: {
      color: 'text-blue-700',
      bgColor: 'bg-blue-200',
      icon: (
        <IcInformation
          className='shrink-0'
          width={18}
          height={18}
          fill='currentColor'
        />
      ),
    },
    success: {
      color: 'text-green-700',
      bgColor: 'bg-green-200',
      icon: (
        <IcSuccess
          className='shrink-0'
          width={18}
          height={18}
          fill='currentColor'
        />
      ),
    },
    warning: {
      color: 'text-amber-700',
      bgColor: 'bg-amber-200',
      icon: (
        <IcWarning
          className='shrink-0'
          width={18}
          height={18}
          fill='currentColor'
        />
      ),
    },
    error: {
      color: 'text-red-700',
      bgColor: 'bg-red-200',
      icon: (
        <IcError
          className='shrink-0'
          width={18}
          height={18}
          fill='currentColor'
        />
      ),
    },
  };
  const messageProps = typeMap[type];

  return (
    <div className='flex min-h-[inherit] items-center justify-center'>
      <div
        className={cx(
          'flex items-center gap-x-2 rounded-lg p-4 font-medium',
          messageProps.bgColor,
          messageProps.color
        )}
      >
        {messageProps.icon}
        {message}
      </div>
    </div>
  );
}
