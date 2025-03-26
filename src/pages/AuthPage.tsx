import { useState, FormEvent } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuthState";
import { AlertCircle, Mail, Lock, User, ArrowRight } from "lucide-react";
import { Header } from "../components/Header";

type AuthMode = "signin" | "register";

interface AuthPageProps {
  mode?: AuthMode;
}

export function AuthPage({ mode: initialMode = "signin" }: AuthPageProps) {
  const { user, signIn, register, isLoading, authInitialized } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  // Show nothing while checking auth state
  if (!authInitialized) {
    return null;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const email = formData.email.trim();
    const password = formData.password;

    try {
      if (mode === "register") {
        if (password !== formData.confirmPassword) {
          throw new Error("Passwords do not match");
          return;
        }
        if (password.length < 6) {
          throw new Error("Password must be at least 6 characters long");
          return;
        }
        const user = await register(email, password, formData.firstName, formData.lastName);
        if (user) {
          navigate('/dashboard', { replace: true });
        }
      } else {
        const user = await signIn(email, password);
        if (user) {
          navigate('/dashboard', { replace: true });
        }
      }
    } catch (err: any) {
      const errorMessages: Record<string, string> = {
        'auth/email-already-in-use': 'An account with this email already exists.',
        'auth/invalid-email': 'Invalid email address.',
        'auth/operation-not-allowed': 'Email/password sign-in is not enabled.',
        'auth/weak-password': 'Password is too weak.',
        'auth/user-not-found': 'No account found with this email.',
        'auth/wrong-password': 'Incorrect password.',
        'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
        'auth/user-disabled': 'This account has been disabled.',
        'auth/network-request-failed': 'Network error. Please check your connection.',
        'auth/invalid-credential': 'Invalid email or password.',
        'auth/missing-password': 'Please enter a password.',
      };
      const errorMessage = err.code ? errorMessages[err.code] : err.message;
      setError(errorMessage || 'An error occurred during authentication');
      console.error('Authentication error:', err);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="pt-24 flex justify-center items-center p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">
            {mode === "signin" ? "Sign In" : "Create Account"}
          </h1>
          <button
            onClick={() => {
              navigate(mode === "signin" ? "/register" : "/signin");
              setError(null);
              setFormData({ email: "", password: "", confirmPassword: "", firstName: "", lastName: "" });
            }}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
          >
            {mode === "signin" ? "Register" : "Sign In"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={mode === "signin" ? "Enter your password" : "Choose a password"}
                required
              />
            </div>
          </div>

          {mode === "register" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>
          )}

          {mode === "register" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="firstName">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your first name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="lastName">
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your last name"
                    required
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-md shadow hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={isLoading}
          >
            {isLoading
              ? mode === "signin" ? "Signing in..." : "Creating Account..."
              : mode === "signin" ? "Sign In" : "Create Account"}
          </button>
        </form>

        {error && (
          <div className="mt-4 flex items-center gap-2 bg-red-100 text-red-700 p-3 rounded-md">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}