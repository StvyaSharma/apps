import React, { useState, useEffect } from 'react';
import RepoList from './components/RepoList';
import SearchBar from './components/SearchBar';
import { fetchRepositories } from './utils/github';
import Spinner from './components/Spinner';

const GitHub = () => {
  const [repositories, setRepositories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredRepositories, setFilteredRepositories] = useState([]);

  useEffect(() => {
    // Fetch repositories from the GitHub user (initial load)
    setIsLoading(true);
    fetchRepositories('StvyaSharma')
      .then((data) => {
        setRepositories(data);
        setFilteredRepositories(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSearch = (filtered) => {
    // Update the filtered repositories
    setFilteredRepositories(filtered);
  };

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
      <>
      <SearchBar repositories={repositories} onSearch={handleSearch} />
      <RepoList repositories={filteredRepositories} />
      </>
      )}
    </div>
  );
};

export default GitHub;
