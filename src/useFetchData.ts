import { useState, useEffect } from 'react';
import axios from 'axios'

export const useFetchData = (url: string) => {
  const [state, setState] = useState({
    data: null,
    error: null,
    isLoading: true
  });

  useEffect(() => {
    let isMounted = true;

    axios.get(url).then(res => {
      if (isMounted) setState({ data: res.data.response, error:null, isLoading: false });

    })
    .catch(error => {
      if (isMounted) setState({ error, data:null, isLoading: false });
    });

    return () => {
      isMounted = false;  // Clean-up, so we're not setting state on unmounted component
    };
  }, [url]);

  const { data, error, isLoading } = state;

  return { data, error, isLoading };
}
