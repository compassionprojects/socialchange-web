import React from 'react';
import PropTypes from 'proptypes';
import Meta from 'components/Meta';
import { useSession, getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import ProjectAddEditForm from 'components/ProjectAddEditForm';
import 'react-datepicker/dist/react-datepicker.css';
import 'leaflet/dist/leaflet.css';

export default function AddProject({ categories }) {
  const [session] = useSession();
  const router = useRouter();
  if (!session && typeof window !== 'undefined') {
    router.push('/signin');
    return null;
  }
  const createProject = async (project) => {
    try {
      const res = await fetch('/api/projects/create', {
        method: 'post',
        body: JSON.stringify(project),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const created = await res.json();
      router.push(`/projects/${created.id}`);
    } catch (e) {
      console.log(e);
      // @todo display error with proper details so that user understands
      // and corrects what's wrong
    }
  };

  return (
    <div className="container py-5">
      <h1>Add project</h1>
      <Meta title="Add project | NVC Social Change" />
      <div className="mt-2 mb-4 text-muted">
        Write a short description about what to write and why we are collecting
        this data.
      </div>
      <ProjectAddEditForm
        onSubmit={createProject}
        project={{}}
        categories={categories}
      />
    </div>
  );
}

AddProject.propTypes = {
  categories: PropTypes.array,
};

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  const res = await fetch(`${process.env.API_ROOT}/api/categories`);
  const categories = await res.json();

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/signin',
      },
    };
  }
  return {
    props: { session, categories },
  };
}
