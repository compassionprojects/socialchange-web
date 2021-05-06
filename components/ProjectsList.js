import React from 'react';
import PropType from 'proptypes';
import classnames from 'classnames';
import TimeAgo from 'react-timeago';
import truncate from 'truncate';
import Link from 'components/Link';
import { FiMapPin, FiClock } from 'react-icons/fi';
import moment from 'moment';
import { useSession } from 'next-auth/client';
import { mapCountry } from '../lib';

export default function ProjectsList(props) {
  const [session, loading] = useSession();
  const { projects } = props;
  return projects.map((p, idx) => (
    <div
      className={classnames('py-5', {
        'border-top': idx !== 0,
      })}
      key={p.id}>
      <Link href={`/projects/${p.id}`} className="text-reset">
        <span className="h5 d-inline-block">{p.title}</span>
      </Link>
      <div className="text-muted small">
        <TimeAgo date={p.created_at} minPeriod={60} />
        {(p.author_id || p.author_name) && (
          <> by {p.author_name || `User#${p.author_id}`}</>
        )}
        {p.category_id && (
          <>
            {' '}
            in{' '}
            <Link href={`/categories/${p.category_id}`}>{p.category_name}</Link>
          </>
        )}
      </div>
      <div className="py-2">{truncate(p.description, 280)}</div>
      <div
        className="mt-2 mb-3 d-flex align-items-center text-muted"
        style={{ fontSize: '90%' }}>
        {p.country && (
          <span className="mr-4">
            <FiMapPin /> {mapCountry[p.country]}
          </span>
        )}
        {p.start_date && (
          <span>
            <FiClock />{' '}
            {moment(p.end_date || moment()).diff(
              moment(p.start_date),
              'months'
            )}{' '}
            months
          </span>
        )}
      </div>
      <Link
        className="btn btn-sm btn-outline-primary"
        href={`/projects/${p.id}`}>
        Read more
      </Link>{' '}
      {!loading && session && session.user.id === p.author_id && (
        <Link
          className="btn btn-sm btn-outline-primary"
          href={`/projects/${p.id}/edit`}>
          Edit
        </Link>
      )}
    </div>
  ));
}

ProjectsList.propTypes = {
  projects: PropType.array,
};
