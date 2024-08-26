export default function SearchInput() {
  return (
    <div className='flex flex-col'>
      <div className='flex gap-x-2'>
        <input
          className='flex-auto px-4 border border-gray-300 rounded-md shadow-md'
          placeholder='Search country or city here...'
        ></input>
        <button className='p-2 border border-blue-700 rounded-md shadow-md bg-blue-600 text-white text-sm transition hover:bg-blue-700'>
          Search
        </button>
      </div>
      <span className='text-red-500'>Error message</span>
    </div>
  );
}
