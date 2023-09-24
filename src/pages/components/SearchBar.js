import React, { useState, useEffect } from 'react';

import styles from '../../styles/Github.module.css'
// import styles from './Github.module.css'

const SearchBar = ({ repositories, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Create a timer to debounce the API call
    const timer = setTimeout(() => {
      // Filter repositories based on the search term
      const filtered = repositories.filter((repo) =>
        repo.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      onSearch(filtered);
    }, 500); // Adjust the debounce delay as needed (e.g., 500 milliseconds)

    // Clear the timer if the searchTerm changes before the delay
    return () => clearTimeout(timer);
  }, [searchTerm, repositories, onSearch]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={styles.SearchBarParent}>
      <input
        type="text"
        placeholder="Search repositories..."
        value={searchTerm}
        onChange={handleInputChange}
        className={styles.SearchBar}
      />
    </div>
    
  );
};

export default SearchBar;
