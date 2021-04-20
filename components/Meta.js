import React from 'react';
import Head from 'next/head';
import PropType from 'proptypes';

export default function Meta({ title, description }) {
  return (
    <Head>
      <title>{title}</title>
      <meta description={description} />
    </Head>
  );
}

Meta.propTypes = {
  title: PropType.string,
  description: PropType.string,
};
