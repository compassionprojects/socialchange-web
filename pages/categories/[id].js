import React from 'react';
import PropType from 'proptypes';
import Meta from 'components/Meta';

export default function Category(props) {
  const { category } = props;
  return (
    <div className="container py-5">
      <h1>{category.name}</h1>
      <Meta title={`${category.name} | NVC Social Change`} />
    </div>
  );
}

Category.propTypes = {
  category: PropType.object,
};

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;
  const res = await fetch(`${process.env.API_ROOT}/api/categories/${id}`);
  const category = await res.json();

  return {
    props: { category },
  };
}
