import React from 'react';
import PropType from 'proptypes';
import qs from 'qs';
import Meta from 'components/Meta';
import Link from 'components/Link';
import ProjectsList from 'components/ProjectsList';

export default function SearchResults(props) {
  const { results, q } = props;
  return (
    <div className="container py-5">
      <Meta title={`Search results for ${q} | NVC Social Change`} />
      <Link
        className="btn btn-outline-secondary mb-4"
        onClick={(e) => {
          e.preventDefault();
          window.history.back();
        }}
        href="/">
        Back
      </Link>
      <h1>
        {results.length > 0 ? 'Search' : 'No'} results for {q}
      </h1>
      <div className="row">
        <div className="col-lg-8 col-sm-12 order-lg-1 order-2">
          <ProjectsList projects={results} />
        </div>
        {/* <div className="col-sm-12 col-lg-4 order-lg-2 order-1 pt-5">
          <h2>Categories</h2>
          {categories.map((c) => (
            <div className="py-1" key={c.id}>
              <Link href={`/categories/${c.id}`}>
                {c.name} ({c.count_projects})
              </Link>
            </div>
          ))}
        </div> */}
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
