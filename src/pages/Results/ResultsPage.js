import React, { useState } from "react";
import Search from "../../components/search/Search";
import Result from "../../components/result/Result";
import Logo from "../../components/logo/Logo";
import "./ResultsPage.scss";

function Results() {
  const [searching, setSearching] = useState(false);

  return (
    <>
      <Logo isHome={false} />
      <Search isHome={false} onClick={() => setSearching(!searching)} />
      <Result isHome={false} searching={searching} />
    </>
  );
}

export default Results;
