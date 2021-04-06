import React from 'react';
import PropTypes from 'proptypes';
import Header from 'components/Header';

function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default App;

App.propTypes = {
  Component: PropTypes.node,
  pageProps: PropTypes.object,
};
