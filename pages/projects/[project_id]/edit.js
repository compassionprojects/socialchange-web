import React from 'react';
import PropTypes from 'proptypes';
import Meta from 'components/Meta';
import { useSession, getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { FiChevronLeft } from 'react-icons/fi';
import ProjectAddEditForm from 'components/ProjectAddEditForm';
import Link from 'components/Link';
import ProjectNav from 'components/ProjectNav';
import 'react-datepicker/dist/react-datepicker.css';
import 'leaflet/dist/leaflet.css';

export default function EditProject({ project, categories }) {
  const [session] = useSession();
  const router = useRouter();
  if (!session && typeof window !== 'undefined') {
    router.push('/signin');
    return null;
  }

  const updateProject = async (p) => {
    try {
      const res = await fetch(`/api/projects/${p.id}/update`, {
        method: 'post',
        body: JSON.stringify(p),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await res.json();
      router.push(`/projects/${p.id}`);
    } catch (e) {
      console.log(e);
      // @todo display error with proper details so that user understands
      // and corrects what's wrong
    }
  };

  return (
    <div className="container py-5">
      <Meta title={`Edit ${project.title}`} />
      <div className="row">
        <div className="col-md-3">
          <Link
            className="btn btn-outline-secondary mb-4"
            href={`/projects/${project.id}`}>
            <FiChevronLeft /> Back
          </Link>
          <ProjectNav className="my-5" />
        </div>
        <div className="col-md-9">
          <h1>Edit</h1>
          <ProjectAddEditForm
            onSubmit={updateProject}
            project={project}
            categories={categories}
          />
        </div>
      </div>
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

  // authorization check
  if (session.user.id !== project.author_id) {
    return {
      redirect: {
        permanent: false,
        destination: `/projects/${project_id}`,
      },
    };
  }

  return {
    props: { session, categories, project },
  };
}
