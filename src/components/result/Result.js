import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import mockData from "../../mockData.json";
import "./result.scss";

function Result({ isHome, searching }) {
  function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((item) => (
            <tr>
              <td>
                <span className="tableColLeft col">
                  <span className="country">{item[4]}</span>
                  <span className="nameYear">
                    {item[0]} - {item[3].substr(-4)}
                  </span>
                </span>
                <span className="tableColRight col">
                  <span className="email">Email: {item[2]}</span>
                </span>
              </td>
            </tr>
          ))}
      </>
    );
  }

  function PaginatedItems({ itemsPerPage }) {
    var localOrderBy = localStorage.getItem("orderBy");
    var localSearchedString = localStorage.getItem("searchingList");
    var localSearchedObject = JSON.parse(localSearchedString);

    if (
      localOrderBy !== "nameAsc" &&
      localOrderBy !== "nameDesc" &&
      localOrderBy !== "yearAsc" &&
      localOrderBy !== "yearDesc"
    ) {
      localOrderBy = "nameAsc";
      localStorage.setItem("orderBy", "nameAsc");
    }

    var items;

    if (localSearchedObject) {
      items = localSearchedObject;
    } else {
      items = mockData.data;
    }

    const [currentItems, setCurrentItems] = useState(items ? items : null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [showOrderBy, setShowOrderBy] = useState(false);
    const [orderBy, setOrderBy] = useState(
      localOrderBy ? localOrderBy : "nameAsc"
    );

    useEffect(() => {
      localOrderBy && setOrderBy(localOrderBy);
    }, []);

    useEffect(() => {
      setShowOrderBy(!showOrderBy);

      var localSearched = JSON.parse(localStorage.getItem("searchingList"));

      var searchedListNameAsc = () => {
        localStorage.setItem(
          "searchingList",
          JSON.stringify(localSearched.sort((a, b) => a[0].localeCompare(b[0])))
        );
      };

      var mockDataNameAsc = () => {
        localStorage.setItem(
          "mockData",
          JSON.stringify(mockData.data.sort((a, b) => a[0].localeCompare(b[0])))
        );
      };
      var searchedListNameDesc = () => {
        localStorage.setItem(
          "searchingList",
          JSON.stringify(localSearched.sort((a, b) => b[0].localeCompare(a[0])))
        );
      };
      var mockDataNameDesc = () => {
        localStorage.setItem(
          "mockData",
          JSON.stringify(mockData.data.sort((a, b) => b[0].localeCompare(a[0])))
        );
      };

      var searchedListYearAsc = () => {
        localStorage.setItem(
          "searchingList",
          JSON.stringify(
            localSearched.sort((a, b) =>
              a[3].substr(-4).localeCompare(b[3].substr(-4))
            )
          )
        );
      };

      var mockDataYearAsc = () => {
        localStorage.setItem(
          "mockData",
          JSON.stringify(
            mockData.data.sort((a, b) =>
              a[3].substr(-4).localeCompare(b[3].substr(-4))
            )
          )
        );
      };

      var searchedListYearDesc = () => {
        localStorage.setItem(
          "searchingList",
          JSON.stringify(
            localSearched.sort((a, b) =>
              b[3].substr(-4).localeCompare(a[3].substr(-4))
            )
          )
        );
      };

      var mockDataYearDesc = () => {
        localStorage.setItem(
          "mockData",
          JSON.stringify(
            mockData.data.sort((a, b) =>
              b[3].substr(-4).localeCompare(a[3].substr(-4))
            )
          )
        );
      };

      localStorage.setItem("orderBy", orderBy);

      if (orderBy === "nameAsc") {
        localSearched ? searchedListNameAsc() : mockDataNameAsc();
      } else if (orderBy === "nameDesc") {
        localSearched ? searchedListNameDesc() : mockDataNameDesc();
      } else if (orderBy === "yearAsc") {
        localSearched ? searchedListYearAsc() : mockDataYearAsc();
      } else if (orderBy === "yearDesc") {
        localSearched ? searchedListYearDesc() : mockDataYearDesc();
      }
    }, [orderBy]);

    useEffect(() => {
      const localSearchedString = localStorage.getItem("searchingList");
      const localSearchedObject = JSON.parse(localSearchedString);

      var items;

      if (localSearchedObject) {
        items = localSearchedObject;
      } else {
        items = mockData.data;
      }

      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(items.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, searching, orderBy]);

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      setItemOffset(newOffset);
    };

    return (
      <>
        <div className={isHome ? "resultBox" : "resultBoxResultPage"}>
          <div className={isHome ? "result" : "resultResultPage"}>
            {!isHome && (
              <div className="orderBy">
                <button
                  className="orderByButton"
                  onClick={() => setShowOrderBy(!showOrderBy)}
                >
                  <i className="fa-solid fa-sort"></i> Order By:{" "}
                  {orderBy === "nameAsc"
                    ? "Name ascending"
                    : orderBy === "nameDesc"
                    ? "Name descending"
                    : orderBy === "yearAsc"
                    ? "Year ascending"
                    : orderBy === "yearDesc"
                    ? "Year descending"
                    : "Name ascending"}
                </button>
                {!showOrderBy && (
                  <div className="orderByList">
                    <ul>
                      {orderBy !== "nameAsc" && (
                        <li onClick={() => setOrderBy("nameAsc")}>
                          Name ascending
                        </li>
                      )}
                      {orderBy !== "nameDesc" && (
                        <li onClick={() => setOrderBy("nameDesc")}>
                          Name descending
                        </li>
                      )}
                      {orderBy !== "yearAsc" && (
                        <li onClick={() => setOrderBy("yearAsc")}>
                          Year ascending
                        </li>
                      )}
                      {orderBy !== "yearDesc" && (
                        <li onClick={() => setOrderBy("yearDesc")}>
                          Year descending
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            )}
            <table>
              <tbody>
                <Items currentItems={currentItems} />
              </tbody>
            </table>
            {isHome && items?.length > 3 ? (
              <Link to={"/results"} style={{ textDecoration: "none" }}>
                <span className="showMore">Show more..</span>
              </Link>
            ) : items?.length < 4 ? (
              <span className="showMoreNull"></span>
            ) : (
              <div className="pagination">
                <ReactPaginate
                  breakLabel="..."
                  nextLabel="Next"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={pageCount}
                  previousLabel="Previous"
                  renderOnZeroPageCount={null}
                />
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {isHome ? (
        <PaginatedItems itemsPerPage={3} />
      ) : (
        <PaginatedItems itemsPerPage={6} />
      )}
    </>
  );
}

export default Result;
