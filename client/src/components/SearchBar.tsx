import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import debounce from "lodash/debounce";
import { SEARCH_PRODUCTS } from "../gql/queries";
import { useNavigate } from "react-router-dom";
import { List, ListItem, Paper, ButtonBase } from "@mui/material"; 

const SearchBar = () => {
  // State to hold the current search string
  const [search, setSearch] = useState("");

  // State to hold the search results
  const [searchResults, setSearchResults] = useState([]);

  // Lazy query to fetch search results
  const [executeSearch, { data, loading, error }] = useLazyQuery(SEARCH_PRODUCTS);

  // React Router's navigate function for navigation
  const navigate = useNavigate();

  // Update search results when data changes
  useEffect(() => {
    if (data && data.searchProducts && search) {
      setSearchResults(data.searchProducts);
    } else {
      setSearchResults([]);
    }
  }, [data, search]);

  // Handle change in search input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearch(newSearchTerm);
    // Execute debounced search query
    if (newSearchTerm) {
      debouncedExecuteSearch({ variables: { searchTerm: newSearchTerm } });
    } else {
      // Clear results if search term is empty
      setSearchResults([]);
    }
  };

  // Debounce the search query to reduce the number of API calls
  const debouncedExecuteSearch = debounce(executeSearch, 300);

  // Navigate to product page with search term as query parameter
  const handleSuggestionClick = (productName: string) => {
    navigate(`/products?search=${productName}`);
  };

  return (
    <div className="relative flex items-center">
      {/* Search input */}
      <input
        type="text"
        placeholder="Search..."
        onChange={handleChange}
        value={search}
        className="border rounded w-full py-2 px-3 text-black"
      />
      {/* Search button */}
      <button 
        onClick={() => navigate(`/products?search=${search}`)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
      >
        Search
      </button>
      {/* Display search suggestions */}
      {searchResults.length > 0 && (
        <div className="absolute z-10 w-full top-12">
          <Paper elevation={3}>
            <List className="flex flex-col">
              {/* Limit to 5 most relevant options */}
              {searchResults.slice(0, 5).map((result: any) => (
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
