// components/Breadcrumb.js
import { useRouter } from 'next/router';
import Link from 'next/link';

const Breadcrumb = () => {
  const router = useRouter();
  const pathSegments = router.asPath.split('/').filter((segment) => segment);

  return (
    <div className="breadcrumb">
      <Link href="/">Home</Link>
      {pathSegments.map((segment, index) => (
        <><span key={index}> / </span><Link href={`/${pathSegments.slice(0, index + 1).join('/')}`}>{segment}</Link></>
      ))}
    </div>
  );
};

export default Breadcrumb;
