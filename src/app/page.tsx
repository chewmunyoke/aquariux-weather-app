import Card from '@/components/card';
import Main from '@/components/main';
import SummaryCard from './summary';

export default function HomePage() {
  return (
    <Main>
      <SummaryCard />
      <Card title='5-day Forecast (3 Hours)'>Home</Card>
    </Main>
  );
}
