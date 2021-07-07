import React from 'react';
import PropTypes from 'proptypes';
import Link from 'components/Link';
import Meta from 'components/Meta';
import { FiArrowUpRight } from 'react-icons/fi';
import { useSession } from 'next-auth/client';

export default function Home({ stats }) {
  const [session, loading] = useSession();
  return (
    <>
      <Meta
        title="NVC Social Change Stories"
        description="A global effort to collect all social change
      stories where Nonviolent Communication (NVC) has been a part of"
      />
      <div className="container">
        <section className="jumbotron bg-white text-center my-3 py-5">
          <div className="row">
            <div className="col-md-8 mx-auto">
              <h1>NVC and Social Change</h1>
              <p className="my-4">
                This project is a global effort to collect all social change
                stories where Nonviolent Communication has been a part of to
                influence policy and lessen the harms of punitive systems.
              </p>
              <div className="mt-4">
                <Link href="/projects" className="btn btn-primary">
                  Explore
                </Link>{' '}
                {session && !loading && (
                  <Link href="/projects/add" className="btn btn-link">
                    Add project
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        <a name="about"></a>
        <section className="my-3 py-5">
          <h2 className="text-center">About</h2>
          <div className="row mt-3">
            <div className="col-lg-8 col-md-12 mx-auto">
              <p>
                The goal of this project is to show the impact of NVC in social
                change to influence policy and lessen the harms of punitive
                systems.
              </p>
              <p>
                Current situation is that there is no one place on the internet
                where you can find all social change stories where NVC is
                involved. They are all spread across which makes it difficult to
                find, to be inspired, to learn and to take action.
              </p>

              <p>
                With our centralising of all stories, we hope to 1) show the
                impact of NVC 2) let people around the world inspire each other
                by telling their stories, inspiring each other 3) let people
                around the world engage with each other and build a community
                around and take action.
              </p>
              <p>
                If you are interested in helping out, please share this page
                with the relevant people.
              </p>

              <p>
                We are just a bunch of people inspired by NVC and it’s power, so
                we’ve started this project. We are doing all of this openly and
                transparently. If you find this project useful and see any value
                feel free to donate - we use opencollective which offers
                complete transparency on how your donation will be utilised.
              </p>
            </div>
          </div>
          <div className="text-center">
            <a
              href="https://opencollective.com/nvc-social-change"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary">
              Donate <FiArrowUpRight />
            </a>
          </div>
        </section>

        <section className="my-3 py-5">
          <div className="row text-center justify-content-center">
            <div className="col-sm-3 col-4 col-md-2">
              <h3>{stats.num_projects}</h3>Projects
            </div>
            <div className="col-sm-3 col-4 col-md-2">
              <h3>{stats.num_countries}</h3>Countries
            </div>
            <div className="col-sm-3 col-4 col-md-2">
              <h3>{stats.num_categories}</h3>Categories
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

Home.propTypes = {
  stats: PropTypes.object,
};

export async function getServerSideProps() {
  const res = await fetch(`${process.env.API_ROOT}/api/projects/stats`);
  const stats = await res.json();
  return {
    props: { stats },
  };
}
