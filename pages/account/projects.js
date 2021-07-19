import React from 'react';
import PropTypes from 'proptypes';
import qs from 'qs';
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Meta from 'components/Meta';
import ProjectsList from 'components/ProjectsList';
import Paginate from 'components/Paginate';

export default function MyProjects(props) {
  const { projects, count } = props;
  const router = useRouter();
  const { page, per_page } = router.query;
  const paginate = (page) => {
    router.push({
      pathname: '/projects',
      query: {
        ...router.query,
        page,
      },
    });
  };
  return (
    <div className="container py-5">
      <Meta title="Projects" />
      <div className="row">
        <div className="col-lg-8 col-md-12">
          <h1>My Projects</h1>

          <ProjectsList projects={projects} />
          <Paginate
            perPage={parseInt(per_page)}
            onSelect={paginate}
            total={count}
            current={parseInt(page || 1)}
          />
        </div>
      </div>
    </div>
  );
}

MyProjects.propTypes = {
  projects: PropTypes.array,
  count: PropTypes.number,
};

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  const query = qs.stringify({ ...ctx.query, author_id: session.user.id });
  const pres = await fetch(`${process.env.API_ROOT}/api/projects?${query}`);
  const { projects, count } = await pres.json();

  return {
    props: { projects, count: parseInt(count) },
  };
}
