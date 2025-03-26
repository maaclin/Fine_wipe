import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-[#482BE7] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">FineWipe</h3>
            <p className="text-white/80">
              By signing up, you agree to our Terms of Use and Privacy Policy
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link to="/features" className="text-white/80 hover:text-white">Features</Link></li>
              <li><Link to="/pricing" className="text-white/80 hover:text-white">Pricing</Link></li>
              <li><Link to="/terms" className="text-white/80 hover:text-white">Terms of Use</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Work</h4>
            <ul className="space-y-2">
              <li><Link to="/portfolio" className="text-white/80 hover:text-white">Our Portfolio</Link></li>
              <li><Link to="/testimonials" className="text-white/80 hover:text-white">Testimonials</Link></li>
              <li><Link to="/help" className="text-white/80 hover:text-white">Help Desk</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Stuff</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-white/80 hover:text-white">Privacy</Link></li>
              <li><Link to="/support" className="text-white/80 hover:text-white">Support</Link></li>
              <li><Link to="/faq" className="text-white/80 hover:text-white">FAQs</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/20 text-center text-white/60">
          <p>&copy; {new Date().getFullYear()} FineWipe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}