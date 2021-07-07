import React from 'react';
// import Head from 'next/head';
import PropType from 'proptypes';
import { Helmet } from 'react-helmet';

export default function Meta({ title, description }) {
  const siteTitle = 'Nonviolent Communication (NVC) Social Change Stories';
  return (
    <Helmet
      title={title}
      titleTemplate={siteTitle ? `%s | ${siteTitle}` : null}
      meta={[
        {
          name: 'description',
          content: description,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: description,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        // {
        //   name: 'twitter:creator',
        //   content: twitter,
        // },
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:description',
          content: description,
        },
      ]}
    />
  );
}

Meta.propTypes = {
  title: PropType.string,
  description: PropType.string,
};
