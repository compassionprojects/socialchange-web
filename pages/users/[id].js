import React from 'react';
import PropType from 'proptypes';

export default function Users(props) {
  const { user } = props;
  return (
    <div className="container py-5">
      <h1>{user.name}</h1>
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
