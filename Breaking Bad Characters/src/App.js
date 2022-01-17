import React, { useState, useEffect, useCallback } from "react";

import axios from "./axios_intance";
import Header from "./components/Header";
import CharacterList from "./components/CharacterList";
import Search from "./components/Search";

export const App = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");

  const debounce = (func, wait = 100) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(this, args);
      }, wait);
    };
  };

  const fetchItems = useCallback(async () => {
    const result = await axios.get(`/characters?name=${query}`);

    setItems(result.data);
    setIsLoading(false);
  });

  // const searchItem = ;

  useEffect(() => {
    debounce(() => {
      fetchItems();
    }, 500);
  }, [fetchItems, query]);

  useEffect(() => {
    axios.get(`/characters`).then((res) => {
      setItems(res.data);
      setIsLoading(false);
    });
  }, []);

  // fetchItems();

  return (
    <div className="container">
      <Header />
      <Search setQuery={(val) => setQuery(val)} />

      <CharacterList isLoading={isLoading} items={items} />
    </div>
  );
};
