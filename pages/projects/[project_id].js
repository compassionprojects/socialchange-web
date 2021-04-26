import React from 'react';
import PropType from 'proptypes';
import moment from 'moment';
import styled from 'styled-components';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import Meta from 'components/Meta';
import Link from 'components/Link';
import TimeAgo from 'react-timeago';
import { FiList, FiUsers, FiClock, FiMapPin } from 'react-icons/fi';
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
      <div className="container">
        <Breadcrumb className="my-4 pt-1" listClassName="bg-light">
          <BreadcrumbItem>
            <Link href="/projects">Projects</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{p.title}</BreadcrumbItem>
        </Breadcrumb>

        <h1>{p.title}</h1>

        <Meta title={`${p.title} | NVC Social Change`} />

        <div className="text-muted small">
          <TimeAgo date={p.created_at} /> by {p.author_name} in{' '}
          <Link href={`/categories/${p.category_id}`}>{p.category_name}</Link>
        </div>

        <div className="row">
          <div className="col-lg-8 col-sm-12">
            <section className="py-4">
              <SectionTitle>Description</SectionTitle>
              <p>{p.description}</p>
            </section>
            {p.intentions && (
              <section className="py-4">
                <SectionTitle>
                  Intentions{' '}
                  <small className="text-muted">of the project</small>
                </SectionTitle>
                <p>{p.intentions}</p>
              </section>
            )}
          </div>
          <div className="col-lg-4 col-sm-12 pb-4">
            <div className="py-1 d-flex align-items-center">
              <FiList className="text-black-50" />
              <span className="ml-2">
                <strong>Category</strong>:{' '}
                <Link href={`/categories/${p.category_id}`}>
                  {p.category_name}
                </Link>
              </span>
            </div>

            {p.location && (
              <div className="py-1 d-flex align-items-center">
                <FiMapPin className="text-black-50" />
                <span className="ml-2">
                  <strong>Location</strong>: {p.location.name}
                </span>
              </div>
            )}

            {p.num_people && (
              <div className="py-1 d-flex align-items-center">
                <FiUsers className="text-black-50" />
                <span className="ml-2">
                  <strong># of people</strong>: {p.num_people}
                </span>
              </div>
            )}

            <div className="py-1 d-flex align-items-center">
              <FiClock className="text-black-50" />
              <span className="ml-2">
                <strong>Duration</strong>:{' '}
                {moment(p.end_date || moment()).diff(
                  moment(p.start_date),
                  'months'
                )}{' '}
                months
              </span>
            </div>
          </div>
        </div>
      </div>

      <Map position={JSON.parse(p.geo).coordinates.reverse()} title={p.title} />

      <div className="container pt-4 pb-5">
        {p.outcomes && (
          <section className="py-4">
            <SectionTitle>
              Outcomes <small className="text-muted">after using NVC</small>
            </SectionTitle>
            <p>{p.outcomes}</p>
          </section>
        )}
        {p.societal_change && (
          <section className="py-4">
            <SectionTitle>
              Observed Societal Change{' '}
              <small className="text-muted">as a result of this project</small>
            </SectionTitle>
            <p>{p.societal_change}</p>
          </section>
        )}
      </div>
    </>
  );
}

Project.propTypes = {
  project: PropType.object,
};

export async function getServerSideProps(ctx) {
  const { project_id } = ctx.query;
  const res = await fetch(`${process.env.API_ROOT}/api/projects/${project_id}`);
  const project = await res.json();

  return {
    props: { project },
  };
}

const SectionTitle = styled.div.attrs({
  className: 'h5',
})``;
