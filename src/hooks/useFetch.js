import React, { useState, useEffect } from "react";

function useFetch(url, id) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const GetData = async function () {
    try {
      const data = await fetch(url);

      const FinData = await data.json();

      setItems(FinData);
      setLoading(false);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };
  useEffect(() => {
    GetData();
  }, [id]);

  return { items, loading, error };
}

export default useFetch;
