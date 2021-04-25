import React from 'react';
import Head from 'next/head';
import PropType from 'proptypes';

export default function Meta({ title, description }) {
  return (
    <Head>
      <title>{title}</title>
      <meta description={description} />
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  );
}

Meta.propTypes = {
  title: PropType.string,
  description: PropType.string,
};
