import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">
        CINE<span>LOG</span>
      </NavLink>
      <div className="navbar-links">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
        >
          Início
        </NavLink>
        <NavLink
          to="/criar"
          className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
        >
          + Novo Filme
        </NavLink>
      </div>
    </nav>
  );
}
