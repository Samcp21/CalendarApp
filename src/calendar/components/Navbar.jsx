export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 d-flex justify-content-between">
      <span className="navbar-brand">
        <i className="fas fa-calendar-alt">&nbsp;Calendar</i>
      </span>
      <button className="btn btn-outline-danger">
        <i className="fas fa-sign-out-alt"></i>
        <span>salir</span>
      </button>
    </nav>
  );
};
