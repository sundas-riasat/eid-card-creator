// File: components/Navbar.js
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-pink-200 text-gray-800 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold">Eid Card Creator</span>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link href="/" className="px-3 py-2 rounded hover:bg-pink-300">
                Home
              </Link>
              <Link href="/" className="px-3 py-2 rounded hover:bg-pink-300">
                Gallery
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
