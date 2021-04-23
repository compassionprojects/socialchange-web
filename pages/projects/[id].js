import React from 'react';
import PropType from 'proptypes';
import Meta from 'components/Meta';
import Link from 'components/Link';
import TimeAgo from 'react-timeago';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

const Map = dynamic(import('components/Map'), {
  ssr: false,
  loading: function Loading() {
    return <div className="text-center py-5 my-5">Loading...</div>;
  },
});

export default function Project(props) {
  const { project: p } = props;
  return (
    <>
      <div className="container pt-5">
        <h1>{p.title}</h1>

        <Meta title={`${p.title} | NVC Social Change`} />

        <div className="text-muted small">
          <TimeAgo date={p.created_at} /> by{' '}
          <Link href={`/users/${p.author.id}`}>{p.author.name}</Link> in{' '}
          <Link href={`/categories/${p.category.id}`}>{p.category.name}</Link>
        </div>

        <section className="py-4">
          <h3>Description</h3>
          <p>{p.description}</p>
        </section>
        <section className="py-4">
          <h3>
            Intentions <small className="text-muted">of the project</small>
          </h3>
          <p>{p.intentions}</p>
        </section>
      </div>

      <Map position={[p.location.lat, p.location.lng]} title={p.title} />

      <div className="container pt-4 pb-5">
        <section className="py-4">
          <h3>
            Outcomes <small className="text-muted">after using NVC</small>
          </h3>
          <p>{p.outcomes}</p>
        </section>
        <section className="py-4">
          <h3>
            Observed Societal Change{' '}
            <small className="text-muted">as a result of this project</small>
          </h3>
          <p>{p.societal_change}</p>
        </section>
      </div>
    </>
  );
}

Project.propTypes = {
  project: PropType.object,
};

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;
  const res = await fetch(`${process.env.API_ROOT}/api/projects/${id}`);
  const project = await res.json();

  return {
    props: { project },
  };
}
