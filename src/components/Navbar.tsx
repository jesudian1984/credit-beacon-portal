
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-brandblue-700">Easy<span className="text-brandgreen-500">Lends</span></span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/" className="text-gray-700 hover:text-brandblue-600 px-3 py-2 text-sm font-medium">
              Home
            </Link>
            <Link to="/loans" className="text-gray-700 hover:text-brandblue-600 px-3 py-2 text-sm font-medium">
              Loans
            </Link>
            <Link to="/eligibility" className="text-gray-700 hover:text-brandblue-600 px-3 py-2 text-sm font-medium">
              Check Eligibility
            </Link>
            <Link to="/bank-comparison" className="text-gray-700 hover:text-brandblue-600 px-3 py-2 text-sm font-medium">
              Compare
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-brandblue-600 px-3 py-2 text-sm font-medium">
              Contact
            </Link>
            <Link to="/apply">
              <Button size="sm" className="ml-4 bg-brandblue-600 hover:bg-brandblue-700">
                Apply Now
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brandblue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-white border-t border-gray-200`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
            Home
          </Link>
          <Link to="/loans" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
            Loans
          </Link>
          <Link to="/eligibility" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
            Check Eligibility
          </Link>
          <Link to="/bank-comparison" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
            Compare
          </Link>
          <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
            Contact
          </Link>
          <Link to="/apply" className="block w-full">
            <Button className="w-full mt-3 bg-brandblue-600 hover:bg-brandblue-700">
              Apply Now
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
