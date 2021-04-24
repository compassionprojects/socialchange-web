import React from 'react';
import PropType from 'proptypes';
import classnames from 'classnames';
import TimeAgo from 'react-timeago';
import truncate from 'truncate';
import Link from 'components/Link';
import { FiMapPin, FiClock } from 'react-icons/fi';
import moment from 'moment';

export default function ProjectsList(props) {
  const { projects } = props;
  return projects.map((p, idx) => (
    <div
      className={classnames('py-5', {
        'border-top': idx !== 0,
      })}
      key={p.id}>
      <Link href={`/projects/${p.id}`}>
        <h2 className="d-inline-block">{p.title}</h2>
      </Link>
      <div className="text-muted small">
        <TimeAgo date={p.created_at} /> by {p.author_name} in{' '}
        <Link href={`/categories/${p.category_id}`}>{p.category_name}</Link>
      </div>
      <div className="py-2">{truncate(p.description, 280)}</div>
      <div
        className="mt-2 mb-3 d-flex align-items-center text-muted"
        style={{ fontSize: '90%' }}>
        {p.location && (
          <span className="mr-4">
            <FiMapPin /> {p.location.name}
          </span>
        )}
        <span>
          <FiClock />{' '}
          {moment(p.end_date || moment()).diff(moment(p.start_date), 'months')}{' '}
          months
        </span>
      </div>

      <Link className="btn btn-outline-primary" href={`/projects/${p.id}`}>
        Read more
      </Link>
    </div>
  ));
}

ProjectsList.propTypes = {
  projects: PropType.array,
};
