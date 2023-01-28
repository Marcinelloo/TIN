import React from "react";
import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
import Navigation from "./components/common/Navigation";

const ContentWrapper = ({ children, handleLogout }) => {
  return (
    <>
      <Header />
      <Navigation handleLogout={handleLogout} />
      {children}
      <Footer />
    </>
  );
};

export default ContentWrapper;
