import Header from "../header/Header";

const Layout = ({ children }) => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main className="container pt-10">{children}</main>
    </>
  );
};

export default Layout;
