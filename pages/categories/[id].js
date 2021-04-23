import React from 'react';
import PropType from 'proptypes';
import Meta from 'components/Meta';
import ProjectsList from 'components/ProjectsList';

export default function Category(props) {
  const { category, projects } = props;
  return (
    <div className="container py-5">
      <h1>{category.name}</h1>
      <Meta title={`${category.name} | NVC Social Change`} />
      Projects under category {category.name}
      <ProjectsList projects={projects} />
    </div>
  );
}

Category.propTypes = {
  category: PropType.object,
  projects: PropType.array,
};

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;
  const cres = await fetch(`${process.env.API_ROOT}/api/categories/${id}`);
  const category = await cres.json();

  const pres = await fetch(
    `${process.env.API_ROOT}/api/projects?category=${id}`
  );
  const projects = await pres.json();

  return {
    props: { category, projects },
  };
}
