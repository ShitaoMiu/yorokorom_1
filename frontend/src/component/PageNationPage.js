import React from "react";
import { useState, useEffect, useContext } from "react";
import { BbsSettingContext } from "../common/Board";

const PageNationPage = ({ totalCount }) => {
  const boardSetData = useContext(BbsSettingContext);

  const [currentPage, setCurrentPage] = useState(1);
  // const [currentBlock, setCurrentBlock] = useState(1);
  const pagePerArti = boardSetData ? boardSetData.pagePerArti : 10;
  const grpPerPage = boardSetData ? boardSetData.grpPerPage : 10;
  const totalItems = totalCount;
  // 페이지 번호 배열 생성
  const pageNumbers = [];
  const totalPages = Math.ceil(totalItems / pagePerArti);
  const startPage = Math.ceil(currentPage / grpPerPage);
  let endPage = startPage + (grpPerPage - 1);
  if (endPage > totalPages) {
    endPage = totalPages;
  }

  // 현재 블록 번호 계산
  useEffect(() => {
    // setCurrentBlock(Math.ceil(currentPage / grpPerPage));
  }, [currentPage, grpPerPage]);

  if (pagePerArti) {
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
  }

  //페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  return (
    <div className="pageNation">
      <ul className="pagination">
        <li>
          <button onClick={handleFirstPage}>&lt;&lt; 처음</button>
        </li>
        <li>
          <button onClick={handlePreviousPage}>&lt; 이전</button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => handlePageChange(number)}
              className={number === currentPage ? "active" : ""}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button onClick={handleNextPage}>다음 &gt;</button>
        </li>
        <li>
          <button onClick={handleLastPage}>끝 &gt;&gt;</button>
        </li>
      </ul>
    </div>
  );
};
export default PageNationPage;
