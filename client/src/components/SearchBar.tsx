import React, { useState, useEffect, useRef } from "react"; // Import useRef
import { useLazyQuery } from "@apollo/client";
import debounce from "lodash/debounce";
import { SEARCH_PRODUCTS } from "../gql/queries";
import { useNavigate } from "react-router-dom";
import { List, ListItem, Paper, ButtonBase } from "@mui/material";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [executeSearch, { data, loading, error }] =
    useLazyQuery(SEARCH_PRODUCTS);
  const navigate = useNavigate();

  // Reference for the wrapping div
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data && data.searchProducts && search) {
      setSearchResults(data.searchProducts);
    } else {
      setSearchResults([]);
    }
  }, [data, search]);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setSearchResults([]);
      }
    }

    // Attach the click event handler
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Remove the click event handler
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    setSearch(""); // Clear the search input
    setSearchResults([]); // Clear the search results
  };

  return (
    <div className="relative flex items-center">
      {/* Search input */}
      <input
        type="text"
        placeholder="Search..."
        onChange={handleChange}
        value={search}
        className="border rounded w-3/4 py-1 px-3 text-black"
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
                <ButtonBase
                  key={result.id}
                  onClick={() => handleSuggestionClick(result.name)}
                >
                  <ListItem className="border-b hover:bg-gray-200"> {/* Added hover and border */}
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
