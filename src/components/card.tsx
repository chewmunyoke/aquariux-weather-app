import cx from 'classnames';

export default function Card({
  children,
  title,
  actionLabel,
  actionCallback,
  isLoaded = true,
}: Readonly<{
  children: React.ReactNode;
  title?: string;
  actionLabel?: string;
  actionCallback?(): void;
  isLoaded?: boolean;
}>) {
  return (
    <div
      className={cx('group', {
        'is-loaded': isLoaded,
      })}
    >
      {title || (actionLabel && actionCallback) ? (
        <div
          className={
            'mb-2 flex justify-between gap-x-4 text-sm opacity-0 group-[.is-loaded]:opacity-100'
          }
        >
          {title ? <h2 className='font-medium'>{title}</h2> : null}
          {actionLabel && actionCallback ? (
            <button
              className='rounded-md px-2 text-blue-700 transition-colors hover:bg-blue-200 motion-reduce:transition-none'
              onClick={actionCallback}
            >
              {actionLabel}
            </button>
          ) : null}
        </div>
      ) : null}
      <div className='rounded-lg border border-gray-300 bg-white p-4 opacity-0 shadow-md transition-opacity group-[.is-loaded]:opacity-100 motion-reduce:transition-none'>
        {children}
      </div>
    </div>
  );
}
