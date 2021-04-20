import React from 'react';
import PropType from 'proptypes';

export default function Category(props) {
  const { category } = props;
  return (
    <div className="container py-5">
      <h1>{category.name}</h1>
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
