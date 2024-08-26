import Card from '@/components/card';
import Main from '@/components/main';
import SearchInput from './search-input';

export default function SearchPage() {
  return (
    <Main>
      <SearchInput />
      <Card title='Search History'>Search</Card>
    </Main>
  );
}
