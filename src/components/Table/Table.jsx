import React, { useState } from "react";
import "./Table.css";

const Table = ({ data, columns, rowsPerPage = 5, onRowClick }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = data.slice(startIndex, startIndex + rowsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight" && currentPage < totalPages) {
      nextPage();
    }
    if (e.key === "ArrowLeft" && currentPage > 1) {
      prevPage();
    }
    if (e.key === "Enter") {
      if (e.target.id === "prev-btn" && currentPage > 1) {
        prevPage();
      }
      if (e.target.id === "next-btn" && currentPage < totalPages) {
        nextPage();
      }
    }
  };

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>
                <span className="th-seperator">|</span>
                <span>{col.headerName}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={() => onRowClick && onRowClick(row)}
              role="row"
              tabIndex="0"
              onKeyDown={(e) =>
                e.key === "Enter" && onRowClick && onRowClick(row)
              }
            >
              {columns.map((col, colIndex) => (
                <td key={colIndex}>{row[col.field]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination" role="navigation" aria-label="Pagination">
        <button
          id="prev-btn"
          onClick={prevPage}
          onKeyDown={handleKeyDown}
          disabled={currentPage === 1}
          aria-disabled={currentPage === 1}
          aria-label="Previous Page"
        >
          Previous
        </button>

        <span
          aria-live="polite"
          aria-label={`Page ${currentPage} of ${totalPages}`}
        >
          Page {currentPage} of {totalPages}
        </span>

        <button
          id="next-btn"
          className="next-btn"
          onClick={nextPage}
          onKeyDown={handleKeyDown}
          disabled={currentPage === totalPages}
          aria-disabled={currentPage === totalPages}
          aria-label="Next Page"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
