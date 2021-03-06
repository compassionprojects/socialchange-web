import React from 'react';
import PropType from 'proptypes';
import moment from 'moment';
import styled from 'styled-components';
import pluralize from 'pluralize';
import { Breadcrumb, BreadcrumbItem, Badge } from 'reactstrap';
import Meta from 'components/Meta';
import Link from 'components/Link';
import TimeAgo from 'react-timeago';
import {
  FiList,
  FiUsers,
  FiClock,
  FiMapPin,
  FiLink,
  FiArrowUpRight,
  FiGitCommit,
} from 'react-icons/fi';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/client';
import { mapCountry } from '../../../lib';
import 'leaflet/dist/leaflet.css';

const Map = dynamic(import('components/Map'), {
  ssr: false,
  loading: function Loading() {
    return <div className="text-center py-5 my-5">Loading...</div>;
  },
});

export default function Project(props) {
  const { project: p } = props;
  const [session, loading] = useSession();
  return (
    <>
      <div className="container">
        <Breadcrumb className="my-4 pt-1" listClassName="bg-light">
          <BreadcrumbItem>
            <Link href="/projects">Projects</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{p.title}</BreadcrumbItem>
        </Breadcrumb>

        <h1>
          {p.title}{' '}
          {!loading && session && session.user.id === p.author_id && (
            <Link
              className="btn btn-sm btn-outline-primary"
              href={`/projects/${p.id}/edit`}>
              Edit
            </Link>
          )}
        </h1>

        <Meta title={`${p.title}`} />

        <div className="text-muted small">
          <TimeAgo date={p.created_at} minPeriod={60} /> by{' '}
          {p.author_name || `User#${p.author_id}`} in{' '}
          <Link href={`/categories/${p.category_id}`}>{p.category_name}</Link>
        </div>

        <div className="row">
          <div className="col-lg-8 col-sm-12">
            <section className="py-4">
              <Paragraph>{p.description}</Paragraph>
            </section>
            {p.intentions && (
              <section className="py-4">
                <SectionTitle>
                  Intentions{' '}
                  <small className="text-muted">of the project</small>
                </SectionTitle>
                <Paragraph>{p.intentions}</Paragraph>
              </section>
            )}
            {p.outcomes && (
              <section className="py-4">
                <SectionTitle>
                  Outcomes <small className="text-muted">after using NVC</small>
                </SectionTitle>
                <Paragraph>{p.outcomes}</Paragraph>
              </section>
            )}
            {p.societal_change && (
              <section className="py-4">
                <SectionTitle>
                  Observed Societal Change{' '}
                  <small className="text-muted">
                    as a result of this project
                  </small>
                </SectionTitle>
                <Paragraph>{p.societal_change}</Paragraph>
              </section>
            )}
            {p.followups.length > 0 && (
              <div className="my-5">
                <h3>Follow ups</h3>
                <div className="p-4 h-100 position-relative">
                  <div
                    className="border-right h-100 position-absolute ml-5"
                    style={{ paddingRight: 4 }}
                  />
                  <div className="pt-4" />
                  {p.followups.map((f) => (
                    <div className="d-flex" key={f.id}>
                      <div className="text-muted flex-shrink-0">
                        {moment(f.date).format('MMM')}
                        <br />
                        {moment(f.date).format('YYYY')}
                      </div>
                      <div
                        className="bg-primary rounded-circle position-absolute ml-5 pr-2 mt-2"
                        style={{
                          width: 10,
                          height: 10,
                        }}
                      />
                      <div className="ml-5 mb-5">
                        <strong>{f.title}</strong>
                        <Paragraph className="mt-2 mb-2">
                          {f.description}
                        </Paragraph>
                        {/* <span>{f.updated_by}</span> */}
                        <span className="text-muted small">
                          <TimeAgo date={f.created_at} minPeriod={60} />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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

            {p.country && (
              <div className="py-1 d-flex align-items-center">
                <FiMapPin className="text-black-50" />
                <span className="ml-2">
                  <strong>Country</strong>: {mapCountry[p.country]}
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
                {moment
                  .duration(
                    moment(p.end_date || moment()).diff(moment(p.start_date))
                  )
                  .humanize()}{' '}
                {!p.end_date && (
                  <Badge color="warning" pill className="font-weight-normal">
                    ongoing
                  </Badge>
                )}
              </span>
            </div>

            {p.website && (
              <div className="py-1 d-flex">
                <FiLink className="text-black-50 mt-1" />
                <span className="ml-2">
                  <strong>Website</strong>:{' '}
                  <a href={p.website} rel="noopener noreferrer" target="_blank">
                    {p.website} <FiArrowUpRight />
                  </a>
                </span>
              </div>
            )}

            {p.followups.length > 0 && (
              <div className="py-1 d-flex">
                <FiGitCommit className="text-black-50 mt-1" />
                <span className="ml-2">
                  {p.followups.length}{' '}
                  {pluralize('follow ups', p.followups.length)}
                </span>
              </div>
            )}

            {p.geo && (
              <div className="mt-5">
                <Map
                  position={JSON.parse(p.geo).coordinates}
                  title={p.title}
                  zoom={5}
                  height={250}
                />
              </div>
            )}
          </div>
        </div>
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

const Paragraph = styled.div`
  white-space: pre-wrap;
`;
