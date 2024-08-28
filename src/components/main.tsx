export default function Main({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='col-span-10 col-start-2 mb-4 flex flex-col gap-y-4 md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4 xl:col-span-4 xl:col-start-5'>
      {children}
    </main>
  );
}
