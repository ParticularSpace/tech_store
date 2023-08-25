import React, { useState, useEffect } from "react";
import axios from "axios";
import debounce from "lodash/debounce"; // Import debounce from lodash

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // Debounce the search function to reduce the number of API calls
  const getSearchResults = debounce(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`/api/search/${search}`);
      setSearchResults(res.data);
    } catch (err) {
      setError("An error occurred while fetching search results.");
    } finally {
      setLoading(false);
    }
  }, 300);

  useEffect(() => {
    if (search) {
      getSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [search]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={handleChange}
        autoFocus // Autofocus the input
        className="p-2 border rounded" // Basic styling
      />
      {loading ? <div>Loading...</div> : null}
      {error ? <div className="text-red-600">{error}</div> : null}
      {searchResults.map((result: any) => (
        <div key={result.id}>
          {result.title.replace(
            new RegExp(search, "gi"),
            (match: string) => `<strong>${match}</strong>`
          )}
        </div>
      ))}
    </div>
  );
};

export default SearchBar;
