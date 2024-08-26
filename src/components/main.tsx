export default function Main({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='col-start-2 md:col-start-3 lg:col-start-4 col-span-10 md:col-span-8 lg:col-span-6 mb-4 flex flex-col gap-y-4'>
      {children}
    </main>
  );
}
