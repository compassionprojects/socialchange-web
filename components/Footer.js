import React from 'react';
import { useSession } from 'next-auth/client';
import { FiArrowUpRight } from 'react-icons/fi';
import Link from 'components/Link';

export default function Footer() {
  const [session, loading] = useSession();
  const listItemClass = 'mt-3 mt-sm-2';

  return (
    <div className="container py-3">
      <div className="row">
        <div className="col-lg-3 col-sm-6 col-12">
          <div className="text-black-50 border-bottom pb-3">
            NVC Social Change
          </div>
          <ul className="list-unstyled pt-2">
            <li className={listItemClass}>
              <Link className="text-reset" href="/#about">
                About
              </Link>
            </li>
            <li className={listItemClass}>
              <Link className="text-reset" href="mailto:nvc@socialchange.io">
                Contact
              </Link>
            </li>
            <li className={listItemClass}>
              <Link className="text-reset" href="/projects">
                Projects
              </Link>
            </li>
            {!loading && !session && (
              <li className={listItemClass}>
                <Link className="text-reset" href="/signin">
                  Sign in
                </Link>
              </li>
            )}
          </ul>
        </div>

        <div className="col-lg-3 col-sm-6 col-12 mt-sm-0 mt-4">
          <div className="text-black-50 border-bottom pb-3">Community</div>
          <ul className="list-unstyled pt-2">
            <li className={listItemClass}>
              <a
                className="text-reset"
                href="https://github.com/nvcsocialchange/forum/discussions"
                target="_blank"
                rel="noopener noreferrer">
                Forum <FiArrowUpRight />
              </a>
            </li>
            <li className={listItemClass}>
              <a
                className="text-reset"
                href="https://opencollective.com/nvc-social-change"
                target="_blank"
                rel="noopener noreferrer">
                Open Collective <FiArrowUpRight />
              </a>
            </li>
            <li className={listItemClass}>
              <a
                className="text-reset"
                href="https://opencollective.com/nvc-social-change"
                target="_blank"
                rel="noopener noreferrer">
                Donate <FiArrowUpRight />
              </a>
            </li>
            <li className={listItemClass}>
              <a
                className="text-reset"
                href="https://github.com/nvcsocialchange"
                target="_blank"
                rel="noopener noreferrer">
                GitHub <FiArrowUpRight />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
