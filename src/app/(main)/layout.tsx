export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='grid min-h-dvh auto-rows-min grid-cols-12 gap-y-4 bg-slate-300'>
      {children}
    </div>
  );
}
