import React from 'react';
import PropType from 'proptypes';
import qs from 'qs';
import { Input, Button } from 'reactstrap';
import Meta from 'components/Meta';
import Link from 'components/Link';
import ProjectsList from 'components/ProjectsList';

export default function Projects(props) {
  const { projects, categories } = props;
  return (
    <div className="container py-5">
      <Meta title="Projects | NVC Social Change" />
      <div className="row align-items-center">
        <div className="col-sm-12 col-md-6 col-lg-8">
          <h1>Projects</h1>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4">
          <form action="/projects/search" className="my-2 my-sm-0 form-inline">
            <div className="d-flex">
              <Input
                required
                placeholder="Search projects"
                type="search"
                className="mr-1"
                name="q"
              />
              <Button color="primary" type="submit" className="flex-shrink-0">
                Search
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-3">
        These are some Social Change projects that our community members have
        added where NVC has been a part of.
      </div>
      <div className="row">
        <div className="col-lg-8 col-sm-12 order-lg-1 order-2">
          <ProjectsList projects={projects} />
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
  projects: PropType.array,
  categories: PropType.array,
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
    props: { projects, count, categories },
  };
}
