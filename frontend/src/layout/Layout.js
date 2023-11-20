import React from "react";
import HeaderLogoArea from "./HeaderLogoArea";
import MenuArea from "./MenuArea";
import LeftMenu from "./LeftMenu";
import Footer from "./Footer";

const Layout = ({ mainContent, children }) => {
  return (
    <>
      <header>
        <div className="NavBar">
          <HeaderLogoArea />
          <MenuArea />
        </div>
      </header>

      {mainContent ? (
        <main className="test">{children} </main>
      ) : (
        <main className="test">
          <div className="leftSide test">
            <LeftMenu />
          </div>
          <div className="content test">{children}</div>
        </main>
      )}

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Layout;
