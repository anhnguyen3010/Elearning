import React from "react";
import Header from "src/components/Header/";
import Footer from "src/components/Footer";
const AppLayout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default AppLayout;
