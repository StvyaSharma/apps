import React from 'react';
import Link from 'next/link';
import styles from '../../styles/Github.module.css'


function getRandomHexColor() {
  // Generate random values for red, green, and blue channels
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  // Convert the decimal values to hexadecimal
  const redHex = red.toString(16).padStart(2, '0'); // Ensure at least 2 characters
  const greenHex = green.toString(16).padStart(2, '0');
  const blueHex = blue.toString(16).padStart(2, '0');

  // Concatenate the hex values to form the color string
  const hexColor = `#${redHex}${greenHex}${blueHex}`;

  return hexColor;
}

const RepoList = ({ repositories }) => {
  return (
    <div style={{margin : '20px'}}>
       <div className={styles.searchGrid}>
        {repositories.map((repo) => (
          <Link href={`/github/${repo.name}`}>
          <div key={repo.id} className={styles.searchGridItem}>
            <Link href={`/github/${repo.name}`}>
          {repo.name}
            </Link>
            <br/>
            <p>{repo.description}</p>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RepoList;
