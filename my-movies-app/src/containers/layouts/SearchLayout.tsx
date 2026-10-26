import React from "react";
import LayoutShell from "./shared/LayoutShell";
import SearchList from "../pages/SearchList";

function SearchLayout() {
  return (
    <>
      <LayoutShell>
        <SearchList />
      </LayoutShell>
    </>
  );
}

export default SearchLayout;
