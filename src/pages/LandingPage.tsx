import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Cloud, MessageSquare, Brain, Upload, PenTool, Share2 } from 'lucide-react';

export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-[#482BE7] to-[#3620B0] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Let's wipe away all those fines!
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Use artificial intelligence to reclaim unfair charges with no legal expertise required. 
              Simply upload your document and let us do all work!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-white text-[#482BE7] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Get Started
              </Link>
              <a
                href="#how-it-works"
                className="border border-white/30 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Benefits</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#482BE7]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cloud className="w-8 h-8 text-[#482BE7]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Storage</h3>
              <p className="text-gray-600">
                We store all of your pending documents so you can easily flick through and manage
                without constantly referring back to paper documents.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#482BE7]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-[#482BE7]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI One-Stop Shop</h3>
              <p className="text-gray-600">
                We integrate several different AI technologies on one platform making tasks effortless.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#482BE7]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-[#482BE7]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community Driven</h3>
              <p className="text-gray-600">
                We are training AI to draft better responses with every successful appeal, ultimately becoming a
                powerhouse in fighting big corporations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How does it work?</h2>
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-[#482BE7] rounded-full flex items-center justify-center flex-shrink-0">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Upload</h3>
                <p className="text-gray-600">Take a picture of the document and see how other community members fared battling similar fines.</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-[#482BE7] rounded-full flex items-center justify-center flex-shrink-0">
                <PenTool className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Compose</h3>
                <p className="text-gray-600">Effortlessly draft emails with AI-suggested content.</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-[#482BE7] rounded-full flex items-center justify-center flex-shrink-0">
                <Share2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Share</h3>
                <p className="text-gray-600">Store all pending documents and wait for a response.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#482BE7]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Too good to pass up, right? Start saving now.
          </h2>
          <div className="flex gap-4 justify-center">
            <Link
              to="/register"
              className="inline-block bg-white text-[#482BE7] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Started
            </Link>
            <Link
              to="/signin"
              className="inline-block bg-white/20 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/30 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}