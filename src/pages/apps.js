import Link from 'next/link';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Apps() {
  const { data, error } = useSWR('/api/staticdata', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  if (!Array.isArray(data)) {
    return <div>Data is not in the expected format.</div>;
  }

  return (

    <div className='grid-container'>

      {data.map((app) => (
          <div  key={app.title} className='grid-item'>
            <Link href={`/apps/${encodeURIComponent(app.title)}`}>
     
                <h2>{app.title}</h2>
                <img src={app.image} alt={app.title} style={{width:'100%'}} />
         
            </Link>
          </div>
        ))}

      </div>

  );
}
