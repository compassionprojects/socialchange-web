import React from 'react';
import PropTypes from 'proptypes';
import qs from 'qs';
import { FiMap } from 'react-icons/fi';
import Meta from 'components/Meta';
import Link from 'components/Link';
import SearchBox from 'components/SearchBox';
import ProjectsList from 'components/ProjectsList';
import Paginate from 'components/Paginate';
import { useRouter } from 'next/router';

export default function Projects(props) {
  const { projects, count, categories } = props;
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
      <div className="row align-items-center">
        <div className="col-sm-12 col-md-6 col-lg-8">
          <h1>Projects</h1>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4">
          <SearchBox className="my-2 my-sm-0 form-inline" />
        </div>
      </div>

      <div className="mt-3">
        These are some Social Change projects that our community members have
        added where NVC has been a part of.
      </div>
      <div className="row">
        <div className="col-lg-8 col-sm-12 order-lg-1 order-2">
          <div className="bg-light rounded text-right py-2 pr-3 mt-4">
            <Link href="/projects/map">
              <FiMap /> map view
            </Link>
          </div>
          <ProjectsList projects={projects} />
          <Paginate
            perPage={parseInt(per_page)}
            onSelect={paginate}
            total={count}
            current={parseInt(page || 1)}
          />
        </div>
        <div className="col-sm-12 col-lg-4 order-lg-2 order-1 pt-5">
          <h2>Categories</h2>
          {categories.map((c) => (
            <div className="py-1" key={c.id}>
              <Link href={`/categories/${c.id}`}>
                {c.name} ({c.count_projects})
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Projects.propTypes = {
  projects: PropTypes.array,
  categories: PropTypes.array,
  count: PropTypes.number,
};

export async function getServerSideProps(ctx) {
  const query = qs.stringify(ctx.query);
  const pres = await fetch(`${process.env.API_ROOT}/api/projects?${query}`);
  const { projects, count } = await pres.json();

  const cres = await fetch(
    `${process.env.API_ROOT}/api/categories/count?${query}`
  );
  const categories = await cres.json();

  return {
    props: { projects, count: parseInt(count), categories },
  };
}
