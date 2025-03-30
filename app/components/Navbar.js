// File: components/Navbar.js

const Navbar = () => {
  return (
    <nav className="bg-emerald-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold">Eid Card Creator</span>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <a href="#" className="px-3 py-2 rounded hover:bg-emerald-700">
                Home
              </a>
              <a href="#" className="px-3 py-2 rounded hover:bg-emerald-700">
                Gallery
              </a>
              <a href="#" className="px-3 py-2 rounded hover:bg-emerald-700">
                About
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
