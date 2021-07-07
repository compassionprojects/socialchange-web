import React from 'react';
import PropType from 'proptypes';
import Link from 'components/Link';
import Meta from 'components/Meta';

export default function Categories(props) {
  const { categories } = props;
  return (
    <div className="container py-5">
      <h1 className="mb-3">Categories</h1>
      <Meta title="Categories" />

      {categories.map((c, i) => (
        <span key={c.id}>
          <Link href={`/categories/${c.id}`}>
            {c.name} ({c.count_projects})
          </Link>
          {i !== categories.length - 1 && ','}{' '}
        </span>
      ))}
    </div>
  );
}

Categories.propTypes = {
  categories: PropType.array,
};

export async function getServerSideProps() {
  const res = await fetch(`${process.env.API_ROOT}/api/categories`);
  const categories = await res.json();

  return {
    props: { categories }, // will be passed to the page component as props
  };
}
