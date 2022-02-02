import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [errorMsg, setError] = useState(null);

  useEffect(() => {
    const abortContr = new AbortController();

  
      fetch(url, { signal: abortContr.signal })
        .then((res) => {
          if (!res.ok) {
            throw Error("Could not fetch the data");
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          setIsPending(false);
          setError(null);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("Fetch aborted");
          } else {
            setError(err.message);
            setIsPending(false);
          }
        });
  

    return () => abortContr.abort();
  }, [url]);

  return { data, isPending, errorMsg };
};

export default useFetch;
