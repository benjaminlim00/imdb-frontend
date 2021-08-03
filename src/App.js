import { useState } from 'react';
import { getQueryResults } from './services/query';

function App() {
  const [search, setSearch] = useState('');
  const [method, setMethod] = useState('bm25');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [retrievalTime, setRetrievalTime] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (search !== '') {
      setLoading(true);
      const res = await getQueryResults(search, method);
      const movies = Object.keys(res.movies).map((k) => res.movies[k]);
      setResults(movies);
      setRetrievalTime(res['retrieval speed']);
      setLoading(false);
    }
  };
  return (
    <div
      className='flex flex-col bg-gray-900'
      style={{
        minHeight: '100vh'
      }}
    >
      <div className='grid mx-2 my-20 place-items-center'>
        <div className='p-2 mb-4 bg-yellow-400 rounded-lg'>
          <h1
            className='text-2xl text-center text-black'
            style={{
              fontFamily: 'Lato'
            }}
          >
            IMDb 2.0
          </h1>
        </div>
        <div className='w-11/12 p-12 px-6 py-10 bg-white rounded-lg shadow-md sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 sm:px-10 sm:py-6 lg:shadow-lg'>
          <h2 className='text-3xl font-semibold text-center text-gray-800 lg:text-4xl'>
            Movie Recommender
          </h2>

          <form onSubmit={(e) => handleSubmit(e)}>
            <label className='block mt-10 text-sm font-semibold text-gray-600 md:text-base'>
              Enter a movie overview (eg. man loses his wallet, man visits mars)
            </label>

            <div className='flex flex-row justify-between mt-6'>
              <input
                id='seach'
                type='text'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='w-full px-1 py-3 text-gray-500 border-b-2 border-gray-200 appearance-none focus:text-gray-800 focus:outline-none focus:border-gray-500'
                required
              />
              <div className='relative inline-flex ml-4 md:ml-10'>
                <svg
                  className='absolute top-0 right-0 w-2 h-2 m-4'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 412 232'
                >
                  <path
                    d='M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z'
                    fill='#648299'
                    fillRule='nonzero'
                  />
                </svg>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className='h-10 pl-5 pr-10 text-gray-600 bg-white border border-gray-300 rounded-full appearance-none cursor-pointer hover:border-gray-400 focus:outline-none'
                >
                  <option value={'bm25'}>BM25</option>
                  <option value={'w2v'}>W2V</option>
                </select>
              </div>
            </div>

            <button
              type='submit'
              disabled={loading}
              className='w-full py-3 mt-10 font-medium text-white uppercase bg-gray-800 rounded-sm focus:outline-none hover:bg-gray-900'
            >
              {!loading ? (
                'Search'
              ) : (
                <div
                  style={{
                    borderTopColor: 'transparent'
                  }}
                  className='mx-auto border-4 border-white border-solid rounded-full w-7 h-7 animate-spin'
                />
              )}
            </button>
          </form>

          {results.length !== 0 && (
            <>
              <h2 className='mt-10 mb-4 text-2xl font-semibold text-center text-gray-800 lg:text-3xl'>
                Results
              </h2>
              <h2 className='mb-4 text-sm font-medium text-center text-gray-800'>
                Time taken for retrieval: {retrievalTime} seconds
              </h2>

              {results.map((item, i) => (
                <div key={i} className='px-2 py-6 text-gray-700 border-t'>
                  <h3 className='text-lg font-semibold'>Rank: {i + 1}</h3>
                  <h3 className='mt-2'>
                    <span className='font-medium'>Title</span>: {item.title}
                  </h3>
                  <h4 className='mt-1'>
                    <span className='font-medium'>Overview</span>:{' '}
                    {item.overview}
                  </h4>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
