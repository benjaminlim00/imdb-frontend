import axios from 'axios';

export const getQueryResults = async (query, method) => {
  const res = await axios.get('http://52.237.78.159:3002/movie', {
    params: {
      query,
      method
    }
  });
  return res.data;
};

// http://52.237.78.159:3002/movie?query=man loses wallet&method=bm25
