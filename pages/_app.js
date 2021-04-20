import React from 'react';
import PropTypes from 'proptypes';
import Header from 'components/Header';
import Footer from 'components/Footer';

function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default App;

App.propTypes = {
  Component: PropTypes.node,
  pageProps: PropTypes.object,
};
