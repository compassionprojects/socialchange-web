import React from 'react';
import PropTypes from 'proptypes';
import NProgress from 'nprogress';
import Router from 'next/router';
import Header from 'components/Header';
import Footer from 'components/Footer';
import 'nprogress/nprogress.css';

// Add loading indicator to the page
Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

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
