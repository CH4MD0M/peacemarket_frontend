import React from "react";

const Layout = ({ isAuthPage, children }) => {
  return isAuthPage ? <>{children}</> : <>{children}</>;
};

export default Layout;
