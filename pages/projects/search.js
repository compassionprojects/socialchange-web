import React from 'react';
import PropType from 'proptypes';
import qs from 'qs';
import { useRouter } from 'next/router';
import Meta from 'components/Meta';
import Link from 'components/Link';
import SearchBox from 'components/SearchBox';
import ProjectsList from 'components/ProjectsList';

export default function SearchResults(props) {
  const { results, q } = props;
  const router = useRouter();
  return (
    <div className="container py-5">
      <Meta title={`Search results for ${q}`} />
      <div className="row align-items-center">
        <div className="col-sm-12 col-md-6 col-lg-8">
          <Link
            className="btn btn-outline-secondary mb-4"
            onClick={() => router.back()}
            href="/">
            Back
          </Link>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4">
          <SearchBox className="my-2 my-sm-0 form-inline" />
        </div>
      </div>
      <h1>
        {results.length > 0 ? 'Search' : 'No'} results for {q}
      </h1>
      <div className="row">
        <div className="col-lg-8 col-sm-12 order-lg-1 order-2">
          <ProjectsList projects={results} />
        </div>
      </div>
    </div>
  );
}

SearchResults.propTypes = {
  results: PropType.array,
  q: PropType.string,
};

export async function getServerSideProps(ctx) {
  const query = qs.stringify(ctx.query);
  const pres = await fetch(
    `${process.env.API_ROOT}/api/projects/search?${query}`
  );
  const { results } = await pres.json();

  return {
    props: { results, q: ctx.query.q },
  };
}
