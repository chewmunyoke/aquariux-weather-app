import cx from 'classnames';

import type { ButtonType } from '@/types';

export default function Button({
  type,
  children,
  classNames,
  onClick,
}: Readonly<{
  type: ButtonType;
  children: React.ReactNode;
  classNames?: string;
  onClick(): void;
}>) {
  const typeMap = {
    primary: 'border-blue-700 bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'border-2 border-gray-600 bg-gray-100 hover:bg-gray-200',
  };
  const buttonClassNames = typeMap[type];

  return (
    <button
      className={cx(
        'flex items-center justify-center rounded-md border px-4 py-2 text-sm shadow-md transition-colors motion-reduce:transition-none',
        buttonClassNames,
        classNames
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
