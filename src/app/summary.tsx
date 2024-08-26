import Card from '@/components/card';

export default function SummaryCard() {
  const todayDate = new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card>
      <div className='grid grid-cols-[2fr_1fr_1fr_2fr] grid-rows-4'>
        <h2 className='col-span-full'>{todayDate}</h2>
        <div className='col-span-2 row-span-2 self-center justify-self-center'>
          Icon
        </div>
        <div className='col-span-2 justify-self-center'>Temperature</div>
        <div className='col-span-2 justify-self-center'>Weather</div>
        <div className='justify-self-center'>Humidity</div>
        <div className='col-span-2 justify-self-center'>Winds</div>
        <div className='justify-self-center'>Visibility</div>
      </div>
    </Card>
  );
}
