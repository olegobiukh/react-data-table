import React from "react";

const Pagination = ({
  isTop,
  page = 1,
  count = 20,
  perPage = 3,
  onPageChange
}) => {
  const pagesCount = Math.ceil(count / perPage) + 1;

  const pages = [];

  for (let i = 1; i < pagesCount; i++) {
    pages.push(i);
  }
  if (!isTop) {
    return (
      <div className="Pagination">
        {pages.map(item => (
          <button
            key={item}
            className={
              item === page
                ? "Pagination__active Pagination__btn"
                : "Pagination__btn"
            }
            onClick={() => onPageChange(item)}
          >
            {item}
          </button>
        ))}
      </div>
    );
  } else {
    return (
      <div className="Pagination">
        {page !== 1 && (
          <button
            className="Pagination__back"
            onClick={() => onPageChange(page - 1)}
          >
            &#8592;
          </button>
        )}
        {pages.map(item => {
          if (item === page || item === page + 1 || item === page - 1) {
            return (
              <button
                key={item}
                className={
                  item === page
                    ? "Pagination__active Pagination__btn"
                    : "Pagination__btn"
                }
                onClick={() => onPageChange(item)}
              >
                {item}
              </button>
            );
          }
        })}
        {page !== pages.length && (
          <button
            className="Pagination__next"
            onClick={() => onPageChange(page + 1)}
          >
            &#8594;
          </button>
        )}
      </div>
    );
  }
};

export default Pagination;
