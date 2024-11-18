import { useId } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';

export default function Navbar({ onSearchChange }) {
  const inputId = useId();
  const { isLoggedIn, login, logout } = useUser();

  const handleSearchInput = (e) => {
    onSearchChange(e.target.value);
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-[#8091FF]">
      {/* Logo/Home Link */}
      <div>
        <Link to="/" className="flex items-center">
          <img src="/assets/images/Logo.png" alt="Logo" className="h-10 mr-2 ml-5" />
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative flex items-center w-1/2">
        <FontAwesomeIcon icon={faSearch} className="absolute left-3 text-gray-500" />
        <input
          type="text"
          id={inputId}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Search product..."
          onChange={handleSearchInput}
        />
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-4">
        {!isLoggedIn ? (
          <>
            <button
              onClick={login}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition duration-200"
            >
              Sign In
            </button>
            <Link
              to="/signup"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 active:bg-gray-400 transition duration-200"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/cart"
              className="text-white flex items-center gap-2 hover:text-gray-300 transition duration-200"
            >
              <FontAwesomeIcon icon={faShoppingCart} />
              <span>Cart</span>
            </Link>
            <Link
              to="/orders"
              className="text-white hover:text-gray-300 transition duration-200"
            >
              My Orders
            </Link>
            <div className="relative group">
              <button className="flex items-center gap-2 text-white hover:text-gray-300 transition duration-200">
                <FontAwesomeIcon icon={faUser} />
                <span>Account</span>
              </button>
              <div className="absolute right-0 mt-2 hidden group-hover:block bg-white rounded-lg shadow-lg w-40">
                <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Profile
                </Link>
                <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Settings
                </Link>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}