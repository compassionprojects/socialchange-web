import React from 'react';
import PropType from 'proptypes';
import classnames from 'classnames';
import TimeAgo from 'react-timeago';
import truncate from 'truncate';
import Link from 'components/Link';
import { FiMapPin, FiClock } from 'react-icons/fi';
import moment from 'moment';
import Meta from 'components/Meta';

export default function Projects(props) {
  const { projects } = props;
  return (
    <div className="container py-5">
      <h1>Projects</h1>

      <Meta title="Projects | NVC Social Change" />

      {projects.map((p, idx) => (
        <div
          className={classnames('py-5', {
            'border-top': idx !== 0,
          })}
          key={p.id}>
          <Link href={`/projects/${p.id}`}>
            <h2 className="d-inline-block">{p.title}</h2>
          </Link>
          <div className="text-muted small">
            <TimeAgo date={p.created_at} /> by{' '}
            <Link href={`/users/${p.author.id}`}>{p.author.name}</Link> in{' '}
            {p.categories.map((c) => (
              <Link key={c.id} href={`/categories/${c.id}`} className="mr-1">
                {c.name}
              </Link>
            ))}
          </div>
          <div className="row py-2">
            <div
              className={classnames('col-sm-12', {
                'col-lg-6': p.image_urls.length > 0,
              })}>
              {truncate(p.introduction, 140)}
            </div>
            {p.image_urls.length > 0 && (
              <div className="col-sm-12 col-lg-6 my-lg-0 my-2">
                {p.image_urls.slice(0, 2).map((url, i) => (
                  <Link href={`/projects/${p.id}`} key={i}>
                    <img
                      src={url}
                      style={{ height: 75 }}
                      className="img-fluid rounded mr-2"
                    />
                  </Link>
                ))}
                {p.image_urls.length > 2 && (
                  <span className="h5 ml-3">+{p.image_urls.length - 2}</span>
                )}
              </div>
            )}
          </div>
          <div className="mt-2 mb-3 d-flex align-items-center text-muted">
            <span className="mr-4">
              <FiMapPin /> {p.location.name}
            </span>
            <span>
              <FiClock />{' '}
              {moment(p.end_date).diff(moment(p.start_date), 'months')} months
            </span>
          </div>

          <Link className="btn btn-outline-primary" href={`/projects/${p.id}`}>
            Read more
          </Link>
        </div>
      ))}
    </div>
  );
}

Projects.propTypes = {
  projects: PropType.array,
};

export async function getServerSideProps() {
  const res = await fetch(`${process.env.API_ROOT}/api/projects`);
  const projects = await res.json();

  return {
    props: { projects }, // will be passed to the page component as props
  };
}
