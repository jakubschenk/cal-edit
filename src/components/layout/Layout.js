import Header from "../header/Header";

const Layout = ({ children, reloadEvents }) => {
  return (
    <>
      <header>
        <Header reloadEvents={reloadEvents} />
      </header>
      <main className="container pt-10">{children}</main>
    </>
  );
};

export default Layout;
