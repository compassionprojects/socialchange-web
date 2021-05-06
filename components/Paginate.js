import React from 'react';
import PropTypes from 'prop-types';
import {
  createUltimatePagination,
  ITEM_TYPES,
} from 'react-ultimate-pagination';

// @todo
// Show only next and prev on mobile

// https://github.com/ultimate-pagination/react-ultimate-pagination

const WrapperComponent = ({ children }) => (
  <ul className="pagination justify-content-center">{children}</ul>
);

WrapperComponent.propTypes = {
  children: PropTypes.node,
};

const withPreventDefault = (fn) => (event) => {
  event.preventDefault();
  fn();
};

const PreviousPageLink = ({ onClick }) => (
  <li className="page-item">
    <a className="page-link" href="#" onClick={withPreventDefault(onClick)}>
      &lsaquo; Previous
    </a>
  </li>
);

PreviousPageLink.propTypes = {
  onClick: PropTypes.func,
};

const NextPageLink = ({ onClick }) => (
  <li className="page-item">
    <a className="page-link" href="#" onClick={withPreventDefault(onClick)}>
      Next &rsaquo;
    </a>
  </li>
);

NextPageLink.propTypes = {
  onClick: PropTypes.func,
};

const itemTypeToComponent = {
  [ITEM_TYPES.PAGE]: () => null,
  [ITEM_TYPES.ELLIPSIS]: () => null,
  [ITEM_TYPES.FIRST_PAGE_LINK]: () => null,
  [ITEM_TYPES.PREVIOUS_PAGE_LINK]: PreviousPageLink,
  [ITEM_TYPES.NEXT_PAGE_LINK]: NextPageLink,
  [ITEM_TYPES.LAST_PAGE_LINK]: () => null,
};

const UltimatePagination = createUltimatePagination({
  itemTypeToComponent,
  WrapperComponent,
});

export default function Paginate(props) {
  const { current, total, perPage, onSelect } = props;
  console.log(props);
  if (!total) return null;
  const totalPages = Math.ceil(total / perPage) || 1;
  if (totalPages <= 1) return null;
  const currentPage = parseInt(current);
  if (currentPage > totalPages) return null;
  const onChange = (page) => onSelect(page);
  return (
    <div className="text-center">
      <UltimatePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onChange={onChange}
      />
      <br />
      Page {currentPage} / {totalPages}
    </div>
  );
}

Paginate.propTypes = {
  current: PropTypes.number,
  total: PropTypes.number,
  perPage: PropTypes.number,
  onSelect: PropTypes.func.isRequired,
};

Paginate.defaultProps = {
  perPage: 10,
};
