import cx from 'classnames';
import { forwardRef } from 'react';

import type { ButtonType } from '@/types';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  type: ButtonType;
  onClick(): void;
}

export default forwardRef(function Button(
  {
    children,
    className,
    type,
    onClick,
    ...props
  }: Readonly<ButtonProps & React.HTMLProps<HTMLButtonElement>>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const typeMap = {
    primary: 'border border-blue-700 bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'border-2 border-gray-600 bg-gray-100 hover:bg-gray-200',
  };
  const buttonClassNames = typeMap[type];

  return (
    <button
      className={cx(
        'flex items-center justify-center rounded-md px-4 py-2 text-sm shadow-md transition-colors motion-reduce:transition-none',
        buttonClassNames,
        className
      )}
      onClick={onClick}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});
