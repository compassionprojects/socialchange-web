import React from 'react';
import PropTypes from 'proptypes';

function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default App;

App.propTypes = {
  Component: PropTypes.node,
  pageProps: PropTypes.object,
};
