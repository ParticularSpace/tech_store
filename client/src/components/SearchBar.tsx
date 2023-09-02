import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import debounce from "lodash/debounce";
import { SEARCH_PRODUCTS } from "../gql/queries";
import { useNavigate } from "react-router-dom";
import { List, ListItem, Paper, ButtonBase } from "@mui/material"; // Import MUI components

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [executeSearch, { data, loading, error }] =
    useLazyQuery(SEARCH_PRODUCTS);
  const navigate = useNavigate();

  useEffect(() => {
    if (data && data.searchProducts && search) {
      setSearchResults(data.searchProducts);
    } else {
      setSearchResults([]);
    }
  }, [data, search]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearch(newSearchTerm);
    if (newSearchTerm) {
      debouncedExecuteSearch({ variables: { searchTerm: newSearchTerm } });
    } else {
      setSearchResults([]);
    }
  };

  const debouncedExecuteSearch = debounce(executeSearch, 300);

  const handleSuggestionClick = (productName: string) => {
    navigate(`/products?search=${productName}`);
  };

  return (
    <div className="relative flex items-center">
      <input
        type="text"
        placeholder="Search..."
        onChange={handleChange}
        value={search}
        className="border rounded w-full py-2 px-3 text-black"
      />
      <button 
        onClick={() => navigate(`/products?search=${search}`)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
      >
        Search
      </button>
      {searchResults.length > 0 && (
      <div className="absolute z-10 w-full top-12">
        <Paper elevation={3}>
          <List className="flex flex-col">
            {searchResults.slice(0, 5).map((result: any) => (  // Limit to 5 most relevant options
              <ButtonBase key={result.id} onClick={() => handleSuggestionClick(result.name)}>
                <ListItem>
                  {result.name}
                </ListItem>
              </ButtonBase>
            ))}
          </List>
        </Paper>
      </div>
    )}
  </div>
);
  
};

export default SearchBar;
