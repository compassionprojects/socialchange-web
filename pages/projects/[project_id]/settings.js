import React from 'react';
import PropTypes from 'proptypes';
import Meta from 'components/Meta';
import { useSession, getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { FiChevronLeft } from 'react-icons/fi';
import Link from 'components/Link';
import ProjectNav from 'components/ProjectNav';

export default function ProjectSettings({ project }) {
  const [session] = useSession();
  const router = useRouter();
  if (!session && typeof window !== 'undefined') {
    router.push('/signin');
    return null;
  }

  return (
    <div className="container py-5">
      <Meta title={`Settings for ${project.title}`} />

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
          <h1>Settings</h1>
          {/* @todo collect reason for archiving */}
          {/* @todo display archived project separately */}
          {/* @todo do a project deletion separately */}
          <Link
            className="btn btn-outline-danger mt-5"
            onClick={async (e) => {
              e.preventDefault();
              if (
                !window.confirm(
                  'Are you sure you want to archive this project?'
                )
              ) {
                return;
              }

              await fetch(`/api/projects/${project.id}/archive`, {
                method: 'POST',
              });

              router.push('/projects');
              // @todo display notification
            }}
            href="/">
            Archive project
          </Link>
        </div>
      </div>
    </div>
  );
}

ProjectSettings.propTypes = {
  project: PropTypes.object,
};

export async function getServerSideProps(ctx) {
  const { project_id } = ctx.query;
  const session = await getSession(ctx);

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
    props: { session, project },
  };
}
