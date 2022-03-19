import React from "react";
import { useEffect, useState } from "react";
import mockData from "../../mockData.json";
import "./search.scss";

function Search({ isHome, onClick }) {
  var localSearchBy = localStorage.getItem("searchBy");

  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState(false);
  const [searchBy, setSearchBy] = useState(
    localSearchBy ? localSearchBy : "nameSurname"
  );

  var lastSearch = localStorage.getItem("lastSearch");

  useEffect(() => {
    if (searchText.length < 3) setError(false);
  }, [searchText]);

  const onChange = (e) => {
    setSearchText(e.currentTarget.value);
    localStorage.setItem("lastSearch", e.currentTarget.value);
  };

  const searching = () => {
    let searchArray = [];
    if (searchText.length > 2) {
      if (searchBy === "nameSurname") {
        mockData.data.find((user) => {
          if (user[0].toLowerCase().match(searchText.toLowerCase())) {
            searchArray.push(user);
            localStorage.setItem("searchingList", JSON.stringify(searchArray));
            setError(false);
          }
        });
      } else if (searchBy === "country") {
        mockData.data.find((user) => {
          if (user[4].toLowerCase().match(searchText.toLowerCase())) {
            searchArray.push(user);
            localStorage.setItem("searchingList", JSON.stringify(searchArray));
            setError(false);
          }
        });
      } else if (searchBy === "year") {
        mockData.data.find((user) => {
          if (
            user[3].substring(-4).toLowerCase().match(searchText.toLowerCase())
          ) {
            searchArray.push(user);
            localStorage.setItem("searchingList", JSON.stringify(searchArray));
            setError(false);
          }
        });
      } else if (searchBy === "email") {
        mockData.data.find((user) => {
          if (user[2].toLowerCase().match(searchText.toLowerCase())) {
            searchArray.push(user);
            localStorage.setItem("searchingList", JSON.stringify(searchArray));
            setError(false);
          }
        });
      }
    }
    if (searchText.length === 0) {
      setError(false);
      localStorage.removeItem("searchingList");
      localStorage.removeItem("orderBy");
      localStorage.setItem(
        "mockData",
        JSON.stringify(mockData.data.sort((a, b) => a[0].localeCompare(b[0])))
      );
    }

    if (searchText.length !== 0 && searchArray.length < 1) {
      setError(true);
    }
  };

  return (
    <>
      {isHome ? (
        <>
          <div className="searchBy">
            <span>Search By: </span>
            <span
              onClick={() => {
                setSearchBy("nameSurname");
                localStorage.setItem("searchBy", "nameSurname");
              }}
              className={searchBy === "nameSurname" ? "selected" : ""}
            >
              Name and Surname
            </span>
            <span
              onClick={() => {
                setSearchBy("country");
                localStorage.setItem("searchBy", "country");
              }}
              className={searchBy === "country" ? "selected" : ""}
            >
              Country
            </span>
            <span
              onClick={() => {
                setSearchBy("year");
                localStorage.setItem("searchBy", "year");
              }}
              className={searchBy === "year" ? "selected" : ""}
            >
              Year
            </span>
            <span
              onClick={() => {
                setSearchBy("email");
                localStorage.setItem("searchBy", "email");
              }}
              className={searchBy === "email" ? "selected" : ""}
            >
              Email
            </span>
          </div>
          <div className="searchBox">
            <input
              type="text"
              onChange={onChange}
              className={
                "searchInput " +
                (searchText.length > 2 ? "active " : "deactive ") +
                (error ? "searchInputError errorText" : null)
              }
              defaultValue={lastSearch && lastSearch}
              placeholder="If you want to reset the list, do an empty search."
            />
            <button
              className="searchButton"
              onClick={() => {
                searching();
                onClick();
              }}
            >
              Search
            </button>
          </div>

          {error ? (
            <span className="error">
              {searchText.length < 3
                ? "You must enter more than three characters."
                : "Not found!"}
            </span>
          ) : null}
        </>
      ) : (
        <>
          <div className="searchBoxTop">
            <div className="searchByTop">
              <span>Search By: </span>
              <span
                onClick={() => {
                  setSearchBy("nameSurname");
                  localStorage.setItem("searchBy", "nameSurname");
                }}
                className={searchBy === "nameSurname" ? "selected" : ""}
              >
                Name and Surname
              </span>
              <span
                onClick={() => {
                  setSearchBy("country");
                  localStorage.setItem("searchBy", "country");
                }}
                className={searchBy === "country" ? "selected" : ""}
              >
                Country
              </span>
              <span
                onClick={() => {
                  setSearchBy("year");
                  localStorage.setItem("searchBy", "year");
                }}
                className={searchBy === "year" ? "selected" : ""}
              >
                Year
              </span>
              <span
                onClick={() => {
                  setSearchBy("email");
                  localStorage.setItem("searchBy", "email");
                }}
                className={searchBy === "email" ? "selected" : ""}
              >
                Email
              </span>
            </div>

            <input
              type="text"
              onChange={onChange}
              className={
                "searchInput searchInputTop " +
                (searchText.length > 2 ? "active " : "deactive ") +
                (error ? "searchInputError errorText" : "")
              }
              defaultValue={lastSearch && lastSearch}
              placeholder="If you want to reset the list, do an empty search."
            />
            <button
              className="searchButton"
              onClick={() => {
                searching();
                onClick();
              }}
            >
              Search
            </button>
          </div>
          {error ? (
            <span className="errorTop">
              {searchText.length < 3
                ? "The number of characters entered is less than 3."
                : "Not found!"}
            </span>
          ) : null}
        </>
      )}
    </>
  );
}

export default Search;
