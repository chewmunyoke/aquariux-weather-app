export default function Card({
  children,
  title,
}: Readonly<{
  children: React.ReactNode;
  title?: string;
}>) {
  return (
    <div>
      {title ? <h2 className='mb-2 font-medium'>{title}</h2> : null}
      <div className='p-4 border border-gray-300 rounded-lg shadow-md bg-white'>
        {children}
      </div>
    </div>
  );
}
