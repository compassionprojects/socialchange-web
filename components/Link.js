import React from 'react';
import PropTypes from 'prop-types';
import _Link from 'next/link';

export default function Link({ href, as, ...props }) {
  return (
    <_Link href={href} as={as || href}>
      <a {...props} />
    </_Link>
  );
}

Link.propTypes = {
  href: PropTypes.string,
  as: PropTypes.string,
};
