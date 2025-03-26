import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuthState';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-[#482BE7]">
          FineWipe
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6">
            <Link to="/features" className="text-gray-600 hover:text-[#482BE7] transition-colors">
              Features
            </Link>
            <Link to="/faq" className="text-gray-600 hover:text-[#482BE7] transition-colors">
              FAQ
            </Link>
            <Link to="/pricing" className="text-gray-600 hover:text-[#482BE7] transition-colors">
              Pricing
            </Link>
            {user ? (
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-[#482BE7] transition-colors"
              >
                Sign Out
              </button>
            ) : (
              <Link to="/signin" className="text-gray-600 hover:text-[#482BE7] transition-colors">
                Sign In
              </Link>
            )}
          </div>
          {!user && (
            <Link
              to="/register"
              className="bg-[#482BE7] text-white px-6 py-2 rounded-full hover:bg-[#3620B0] transition-colors"
            >
              Get Started
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link
              to="/features"
              className="text-gray-600 hover:text-[#482BE7] transition-colors py-2"
            >
              Features
            </Link>
            <Link
              to="/faq"
              className="text-gray-600 hover:text-[#482BE7] transition-colors py-2"
            >
              FAQ
            </Link>
            <Link
              to="/pricing"
              className="text-gray-600 hover:text-[#482BE7] transition-colors py-2"
            >
              Pricing
            </Link>
            {!user && (
              <>
                <Link
                  to="/register"
                  className="bg-[#482BE7] text-white px-6 py-2 rounded-full text-center hover:bg-[#3620B0] transition-colors"
                >
                  Get Started
                </Link>
                <Link
                  to="/signin"
                  className="text-gray-600 hover:text-[#482BE7] transition-colors py-2"
                >
                  Sign In
                </Link>
              </>
            )}
            {user && (
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-[#482BE7] transition-colors py-2 text-left w-full"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}