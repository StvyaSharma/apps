const GITHUB_API_URL = 'https://api.github.com';

export async function fetchRepositories(username) {
  const response = await fetch(`${GITHUB_API_URL}/users/${username}/repos`);
  if (!response.ok) {
    throw new Error('Failed to fetch repositories');
  }
  const data = await response.json();
  return data;
}
