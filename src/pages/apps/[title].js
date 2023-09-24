// pages/apps/[title].js

import { useRouter } from 'next/router';
import path from 'path';
import { promises as fs } from 'fs';

// pages/apps/[title].js

import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function AppDetails({ app }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const Screenshots = app.screenshots;

  return (
    <>
      {/* Your custom header */}
      <main>
        <section className="item-title-bar">
          <div className="content-container">
            <div className="thumbnail-container">
              <img className="item-thumbnail" src={app.image} alt={app.title} />
            </div>
            <div className="title-info">
              <h2 className="item-title ellipsis">{app.title}</h2>
              {app.caption !== "" ? <span>{app.caption}</span> : null}
              {app.ios !== "" ? (
                <a href={app.ios} target="_blank" className="item-author expand-info">
                  <span style={{ color: '#007AFF', padding: '2.55px', border: '1px solid #007AFF', borderWidth: 1 }}>
                    Download on App Store
                  </span>
                </a>
              ) : null}
              {app.android !== "" ? (
                <a href={app.android} target="_blank" className="item-author expand-info">
                  <span style={{ color: '#007AFF', padding: '2.55px', border: '1px solid #007AFF' }}>
                    Download on Play Store
                  </span>
                </a>
              ) : null}
            </div>
          </div>
        </section>
        <section>
          <div className="title-bar">
            <div className="title-container">
              <h2 className="ellipsis">Description</h2>
            </div>
          </div>
          <div className="content-container description">
            <p>{app.description}</p>
          </div>
          <div className="divider"></div>
        </section>
        <section className="screenshot item-group landscape-tablet">
          <div className="title-bar">
            <div className="title-container">
              <h2 className="ellipsis">Screenshots</h2>
            </div>
          </div>
          <div className="item-list hscroll">
            <div className="left scroll-assist"></div>
            <div className="overflow-container">
              {Screenshots.data.map((item, index) => (
                <Link href="#" key={index} className="scroll-item">
      
                    <div className="thumbnail-container">
                      <LazyLoadImage
                        src={item}
                        width={Screenshots.screenshotsWidth}
                        height={Screenshots.screenshotsHeight}
                        className="item-thumbnail"
                        alt="Image Alt"
                        effect="blur"
                      />
                    </div>
               
                </Link>
              ))}
            </div>
            <div className="right scroll-assist"></div>
          </div>
          <div className="divider"></div>
        </section>
        {/* Additional sections */}
      </main>
    </>
  );
}



export async function getServerSideProps({ params }) {
  // Fetch app data based on the title from the JSON file
  const title = params.title;
  const jsonDirectory = path.join(process.cwd(), 'json');
  const filePath = path.join(jsonDirectory, 'data.json');
  
  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    const jsonData = JSON.parse(fileContents);
    
    const appData = jsonData.find((app) => app.title === title);
    
    return {
      props: {
        app: appData || null, // Return null if the app is not found
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        app: null, // Return null if there is an error reading or parsing the JSON file
      },
    };
  }
}
