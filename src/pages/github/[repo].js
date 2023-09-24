import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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

const RepoPage = () => {
    const router = useRouter();
    const { repo } = router.query;
    const [repository, setRepository] = useState(null);
    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        if (repo) {
            // Fetch detailed repository data
            fetch(`https://api.github.com/repos/StvyaSharma/${repo}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setRepository(data);
                })
                .catch((error) => {
                    console.error(error);
                });

            // Fetch repository languages
            fetch(`https://api.github.com/repos/StvyaSharma/${repo}/languages`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setLanguages(data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [repo]);

    if (!repository || languages.length === 0) {
        return <div>Loading...</div>;
    }

    // Calculate the total size of the repository in bytes
    const totalSize = Object.values(languages).reduce((total, size) => total + size, 0);

    // Calculate the language proportion
    const languageProportion = Object.entries(languages).map(([language, size]) => ({
        language,
        size,
        proportion: (size / totalSize) * 100, // Calculate the proportion as a percentage
        color: getRandomHexColor()
    }));

    return (
        <div>
            <h1>Repository Details</h1>
            <p>Username: StvyaSharma</p>
            <p>Repository: {repo}</p>
            <h2>Repository Information</h2>
            <p>Description: {repository.description}</p>
            <p>Stars: {repository.stargazers_count}</p>
            <p>Language: {repository.language}</p>

            {/* Language Proportion Bar */}
            <h2>Language Proportion</h2>
            <div className="language-bar" style={{ width: '50%' }}>
                <div style={{ borderRadius : '20px', overflow: 'hidden' }}>
                    {languageProportion.map(({ language, proportion, color }) => (

                        <div className="language-bar-inner" style={{ width: `${proportion}%`, display: 'inline-block', backgroundColor: `${color}` }}>‎</div>

                    ))}
                </div>
                <div>
                    {languageProportion.map(({ language, proportion, color }) => (

                        <div className="language-bar-inner" style={{ width: `${proportion}%`, display: 'inline-block' }}>{language}</div>

                    ))}
                </div>
            </div>
        </div>
    );
};

export default RepoPage;
