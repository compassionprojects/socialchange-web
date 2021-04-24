import React from 'react';
import Link from 'components/Link';
import { FiArrowUpRight } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="py-5 border-top bg-light">
      <div className="container">
        <ul className="list-inline">
          <li className="list-inline-item mr-4 text-muted">
            <Link className="text-reset" href="/#about">
              About
            </Link>
          </li>
          <li className="list-inline-item mr-4 text-muted">
            <Link className="text-reset" href="/projects">
              Projects
            </Link>
          </li>
          <li className="list-inline-item mr-4 text-muted">
            <a className="text-reset" href="mailto:madhu@nomaddev.co">
              Contact
            </a>
          </li>
          <li className="list-inline-item mr-4 text-muted">
            <a
              className="text-reset"
              href="https://opencollective.com/nvc-social-change"
              target="_blank"
              rel="noopener noreferrer">
              Community <FiArrowUpRight />
            </a>
          </li>
          <li className="list-inline-item mr-4 text-muted">
            <a
              className="text-reset"
              href="https://opencollective.com/nvc-social-change"
              target="_blank"
              rel="noopener noreferrer">
              Donate <FiArrowUpRight />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
