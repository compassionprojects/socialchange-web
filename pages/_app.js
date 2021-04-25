import React from 'react';
import PropTypes from 'proptypes';
import NProgress from 'nprogress';
import { createGlobalStyle } from 'styled-components';
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
      <GlobalStyles />
      <header>
        <Header />
      </header>
      <main role="main" className="flex-shrink-0">
        <Component {...pageProps} />
      </main>
      <footer className="py-5 border-top bg-light mt-auto">
        <Footer />
      </footer>
    </>
  );
}

export default App;

App.propTypes = {
  Component: PropTypes.node,
  pageProps: PropTypes.object,
};

const GlobalStyles = createGlobalStyle`
  html {
    height: 100%;
  }
  #__next {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;
