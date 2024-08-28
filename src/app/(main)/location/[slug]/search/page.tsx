import Header from '@/components/header';
import Main from '@/components/main';

import HistoryCard from './card-history';
import SearchInput from './search-input';

export default function SearchPage({
  params,
}: Readonly<{ params: Record<string, string> }>) {
  const location = params.slug;

  return (
    <>
      <Header location={location} isSearch={true} />
      <Main>
        <SearchInput />
        <HistoryCard location={location} />
      </Main>
    </>
  );
}
