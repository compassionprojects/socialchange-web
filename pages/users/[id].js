import React from 'react';
import PropType from 'proptypes';
import Meta from 'components/Meta';
import ProjectsList from 'components/ProjectsList';

export default function Users(props) {
  const { user, projects } = props;
  return (
    <div className="container py-5">
      <h1>{user.name}</h1>
      <Meta title={`${user.name} | NVC Social Change`} />
      Projects added by {user.name}
      <ProjectsList projects={projects} />
    </div>
  );
}

Users.propTypes = {
  user: PropType.object,
  projects: PropType.array,
};

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;
  const ures = await fetch(`${process.env.API_ROOT}/api/users/${id}`);
  const user = await ures.json();

  const pres = await fetch(`${process.env.API_ROOT}/api/projects?user=${id}`);
  const projects = await pres.json();

  return {
    props: { user, projects },
  };
}
