import React from 'react';
import PropType from 'proptypes';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import Link from 'components/Link';
import Meta from 'components/Meta';
import ProjectsList from 'components/ProjectsList';

export default function Category(props) {
  const { category, projects } = props;
  return (
    <div className="container pb-5">
      <Breadcrumb className="my-4 pt-1" listClassName="bg-light">
        <BreadcrumbItem>
          <Link href="/projects">Projects</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>{category.name}</BreadcrumbItem>
      </Breadcrumb>
      <h1>{category.name}</h1>
      <Meta title={`${category.name}`} />
      {category.description}
      <ProjectsList projects={projects} />
    </div>
  );
}

Category.propTypes = {
  category: PropType.object,
  projects: PropType.array,
};

export async function getServerSideProps(ctx) {
  const { category_id } = ctx.query;
  const cres = await fetch(
    `${process.env.API_ROOT}/api/categories/${category_id}`
  );
  const category = await cres.json();

  const pres = await fetch(
    `${process.env.API_ROOT}/api/projects?category_id=${category_id}`
  );
  const { projects, count } = await pres.json();

  return {
    props: { category, projects, count },
  };
}
