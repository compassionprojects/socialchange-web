import React from 'react';
import Link from 'components/Link';

export default function Home() {
  return (
    <div className="container">
      <section className="jumbotron bg-white text-center my-3 py-5">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <h1>NVC and Social Change</h1>
            <p className="my-4">
              This project is a global effort to collect all social change
              stories where NVC has been a part of - started by a few people who
              are passionate about social change and the impact of Nonviolent
              Communication around us.
            </p>
          </div>
        </div>
        <div className="row text-center my-4">
          <div className="col-lg-3 offset-md-1 col-md-12 border-primary rounded mx-auto px-3 py-5 mt-4 bg-primary text-white">
            <div>Do you have any NVC Social Change stories to share?</div>
            <Link href="/projects/add" className="btn mt-4 btn-outline-light">
              Get started
            </Link>
          </div>
          <div className="col-lg-3 offset-md-1 col-md-12 border rounded mx-auto px-3 py-5 mt-4">
            <div>Explore Social Change Stories</div>
            <Link href="/projects" className="btn btn-primary mt-4">
              Explore
            </Link>
          </div>
          <div className="col-lg-3 offset-md-1 col-md-12 border rounded mx-auto px-3 py-5 mt-4">
            <div>Do you know anyone who has many stories to tell?</div>
            <Link href="/" className="btn btn-outline-primary mt-4">
              Spread the word
            </Link>
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
              change.
            </p>
            <p>
              Current situation is that there is no one place on the internet
              where you can find all social change stories where NVC is
              involved. They are all spread across which makes it difficult to
              find, to be inspired, to learn and to take action.
            </p>

            <p>
              With our centralising of all stories, we hope to 1) show the
              impact of NVC 2) let people around the world inspire each other by
              telling their stories, inspiring each other 3) let people around
              the world engage with each other and build a community around and
              take action.
            </p>
            <p>
              If you are interested in helping out, please share this page with
              the relevant people.
            </p>

            <p>
              We are just a bunch of people inpired by NVC and it’s power, so
              we’ve started this project. We are doing all of this openly and
              transparently. If you find this project useful and see any value
              feel free to donate - we use opencollective which offers complete
              transparency on how your donation will be utilised.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
