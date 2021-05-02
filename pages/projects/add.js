import React from 'react';
import Meta from 'components/Meta';
import { useSession, getSession } from 'next-auth/client';
import { useRouter } from 'next/router';

export default function AddProject() {
  const [session] = useSession();
  const router = useRouter();
  if (!session && typeof window !== 'undefined') {
    router.push('/signin');
    return null;
  }
  return (
    <div className="container py-5">
      <h1>Add project</h1>
      <Meta title="Add project | NVC Social Change" />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/signin',
      },
    };
  }
  return {
    props: { session },
  };
}
