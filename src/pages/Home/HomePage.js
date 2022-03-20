import React, { useState } from "react";
import Search from "../../components/search/Search";
import Result from "../../components/result/Result";
import Logo from "../../components/logo/Logo";
import mockData from "../../mockData.json";
import "./HomePage.scss";

function Home() {
  const [searching, setSearching] = useState(false);

  localStorage.setItem("mockData", JSON.stringify(mockData));

  return (
    <>
      <Logo isHome={true} />
      <Search isHome={true} onClick={() => setSearching(!searching)} />
      <Result isHome={true} searching={searching} />
    </>
  );
}

export default Home;
