import React from 'react';
import PropTypes from 'proptypes';
import Meta from 'components/Meta';
import { useSession, getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import ProjectAddEditForm from 'components/ProjectAddEditForm';
import 'react-datepicker/dist/react-datepicker.css';
import 'leaflet/dist/leaflet.css';

export default function EditProject({ project, categories }) {
  const [session] = useSession();
  const router = useRouter();
  if (!session && typeof window !== 'undefined') {
    router.push('/signin');
    return null;
  }
  const updateProject = async (project) => {
    try {
      const res = await fetch(`/api/projects/${project.id}/update`, {
        method: 'post',
        body: JSON.stringify(project),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await res.json();
      router.push(`/projects/${project.id}`);
    } catch (e) {
      console.log(e);
      // @todo display error with proper details so that user understands
      // and corrects what's wrong
    }
  };

  return (
    <div className="container py-5">
      <h1>Edit {project.title}</h1>
      <Meta title={`Edit ${project.title} | NVC Social Change`} />
      <ProjectAddEditForm
        onSubmit={updateProject}
        project={project}
        categories={categories}
      />
    </div>
  );
}

EditProject.propTypes = {
  project: PropTypes.object,
  categories: PropTypes.array,
};

export async function getServerSideProps(ctx) {
  const { project_id } = ctx.query;
  const session = await getSession(ctx);
  const cres = await fetch(`${process.env.API_ROOT}/api/categories`);
  const categories = await cres.json();

  const pres = await fetch(
    `${process.env.API_ROOT}/api/projects/${project_id}`
  );
  const project = await pres.json();

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/signin',
      },
    };
  }
  return {
    props: { session, categories, project },
  };
}
