import React from 'react';
import PropType from 'proptypes';

export default function Project(props) {
  const { project } = props;
  return (
    <div className="container py-5">
      <h1>{project.title}</h1>
    </div>
  );
}

Project.propTypes = {
  project: PropType.object,
};

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;
  const res = await fetch(`${process.env.API_ROOT}/api/projects/${id}`);
  const project = await res.json();

  return {
    props: { project }, // will be passed to the page component as props
  };
}
