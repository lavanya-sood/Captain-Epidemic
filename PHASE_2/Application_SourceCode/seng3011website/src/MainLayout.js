import React from "react";
import Header from "./PageHeader.js";
import Footer from "./PageFooter.js";

const mainLayout = Page => {
  return () => (
    <div>
      <Header />
      <Page />
      <Footer />
    </div>
  );
};

export default mainLayout;