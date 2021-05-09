import React from 'react';
import PropTypes from 'proptypes';
import qs from 'qs';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { FiChevronLeft } from 'react-icons/fi';
import Meta from 'components/Meta';
import Link from 'components/Link';
import 'leaflet/dist/leaflet.css';

const Map = dynamic(import('components/Map'), {
  ssr: false,
  loading: function Loading() {
    return <div className="text-center py-5 my-5">Loading...</div>;
  },
});

const Marker = dynamic(
  import('react-leaflet').then((m) => m.Marker),
  { ssr: false }
);

const Popup = dynamic(
  import('react-leaflet').then((m) => m.Popup),
  { ssr: false }
);

export default function Maps(props) {
  const { projects } = props;
  const router = useRouter();

  return (
    <div className="py-5">
      <Meta title="Projects map | NVC Social Change" />
      <div className="container pb-4">
        <Link
          className="btn btn-outline-secondary mb-4"
          onClick={() => router.back()}
          href="/">
          <FiChevronLeft /> Back to list view
        </Link>
        <h1>Projects</h1>
        <div className="mt-3">
          Here you can see all social change projects where NVC has been a part
          of.
        </div>
      </div>

      <Map position={[0, 0]} zoom={2} height="50vh">
        {projects.map((p) => (
          <Marker position={JSON.parse(p.geo).coordinates} key={p.id}>
            <Popup>
              <h6>{p.title}</h6>
              <Link href={`/projects/${p.id}`}>view project</Link>
            </Popup>
          </Marker>
        ))}
      </Map>
    </div>
  );
}

Maps.propTypes = {
  projects: PropTypes.array,
};

export async function getServerSideProps(ctx) {
  const query = qs.stringify(ctx.query);
  const pres = await fetch(`${process.env.API_ROOT}/api/projects/map?${query}`);
  const { projects } = await pres.json();

  return {
    props: { projects },
  };
}
