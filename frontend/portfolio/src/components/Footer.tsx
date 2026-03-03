import { useState, useEffect } from "react";
import { Heart, X } from "lucide-react";

const Footer = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [showLogin, setShowLogin] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    setIsLoggedIn(!!loggedIn);
  }, []);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ code, password }),
      });

      if (!res.ok) {
        alert("Invalid credentials");
        return;
      }

      localStorage.setItem("loggedIn", JSON.stringify(true));
      setIsLoggedIn(true);
      setShowLogin(false);
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const handleSignUp = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/user/signUp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, code, password }),
      });

      if (!res.ok) {
        alert("Signup failed");
        return;
      }

      alert("Signup successful! Please log in.");
      setIsLoginMode(true);
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    setIsLoggedIn(false);
  };

  return (
    <>
      <footer className="py-8 px-4 border-t border-primary/20">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p
              className="text-sm text-muted-foreground flex items-center gap-2 cursor-pointer"
              onClick={() => {
                if (isLoggedIn) handleLogout();
                else setShowLogin(true);
              }}
            >
              <Heart className="w-4 h-4 text-primary fill-primary animate-pulse" />
              <span className="hover:text-primary transition-colors font-medium flex items-center gap-1">
                {isLoggedIn ? (
                  <>
                    Neeraj Mittal 
                  </>
                ) : (
                  <>Neeraj Mittal</>
                )}
              </span>
              <Heart className="w-4 h-4 text-primary fill-primary animate-pulse" />
            </p>

            <div className="flex gap-6">
              <a href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                About
              </a>
              <a href="#projects" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Projects
              </a>
              <a href="#experience" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Experience
              </a>
              <a href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* LOGIN / SIGNUP MODAL */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-background border border-primary/20 rounded-xl p-8 w-[350px] relative shadow-lg">
            <button
              className="absolute top-3 right-3 hover:text-primary"
              onClick={() => setShowLogin(false)}
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-semibold mb-6 text-center">
              {isLoginMode ? "Login" : "Sign Up"}
            </h2>

            <form
              onSubmit={isLoginMode ? handleLogin : handleSignUp}
              className="space-y-4"
            >
              {!isLoginMode && (
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-2 rounded-md bg-input border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              )}
              <input
                type="text"
                placeholder="Code"
                className="w-full px-4 py-2 rounded-md bg-input border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                onChange={(e) => setCode(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 rounded-md bg-input border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="submit"
                className="w-full mt-2 bg-primary text-primary-foreground py-2 rounded-md hover:opacity-90 transition"
              >
                {isLoginMode ? "Login" : "Sign Up"}
              </button>

              <p className="text-sm text-center text-muted-foreground mt-3">
                {isLoginMode ? (
                  <>
                    Don’t have an account?{" "}
                    <span
                      onClick={() => setIsLoginMode(false)}
                      className="text-primary cursor-pointer hover:underline"
                    >
                      Sign Up
                    </span>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <span
                      onClick={() => setIsLoginMode(true)}
                      className="text-primary cursor-pointer hover:underline"
                    >
                      Login
                    </span>
                  </>
                )}
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
