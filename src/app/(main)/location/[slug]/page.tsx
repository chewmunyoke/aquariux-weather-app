import Header from '@/components/header';
import Main from '@/components/main';

import CurrentCard from './card-current';
import ForecastCard from './card-forecast';

export default function LocationPage({
  params,
}: Readonly<{ params: Record<string, string> }>) {
  const location = params.slug;

  return (
    <>
      <Header location={location} isSearch={false} />
      <Main>
        <CurrentCard location={location} />
        <ForecastCard location={location} />
      </Main>
    </>
  );
}
