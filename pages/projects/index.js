import React from 'react';
import PropType from 'proptypes';
import Meta from 'components/Meta';
import ProjectsList from 'components/ProjectsList';

export default function Projects(props) {
  const { projects } = props;
  return (
    <div className="container py-5">
      <h1>Projects</h1>
      <Meta title="Projects | NVC Social Change" />
      <div className="mt-3">
        These are some Social Change projects that our community members have
        added where NVC has been a part of.
      </div>
      <ProjectsList projects={projects} />
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
