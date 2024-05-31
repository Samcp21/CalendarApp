import { useAuthStore } from "../../hooks/useAuthStore";

export const Navbar = () => {
  const { startLogout, user } = useAuthStore();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 d-flex justify-content-between">
      <span className="navbar-brand">
        <i className="fas fa-calendar-alt">&nbsp;Calendar</i>
        &nbsp;
        {user?.name}
      </span>
      <button className="btn btn-outline-danger" onClick={startLogout}>
        <i className="fas fa-sign-out-alt"></i>
        &nbsp;
        <span>salir</span>
      </button>
    </nav>
  );
};
