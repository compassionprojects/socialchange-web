import React from 'react';
import PropType from 'proptypes';
import Meta from 'components/Meta';

export default function Users(props) {
  const { user } = props;
  return (
    <div className="container py-5">
      <h1>{user.name}</h1>
      <Meta title={`${user.name} | NVC Social Change`} />
    </div>
  );
}

Users.propTypes = {
  user: PropType.object,
};

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;
  const res = await fetch(`${process.env.API_ROOT}/api/users/${id}`);
  const user = await res.json();

  return {
    props: { user },
  };
}
