import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex border-b-4">
      <Link to="/" className="p-6 font-bold">
        Text to Bionic
      </Link>
      <Link to="/fb" className="p-6 font-bold">
        Doc to bionic
      </Link>
      <Link to="/ab" className="p-6 font-bold">
        Audio to bionic
      </Link>
    </nav>
  );
};

export default Navbar;
