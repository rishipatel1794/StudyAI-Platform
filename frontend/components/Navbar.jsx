import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/mode-toggle";
import { Link } from "react-router";
import { useLocation } from "react-router";

export function Navbar() {
  const location = useLocation();
    if (["/login", "/signup"].includes(location.pathname)) return null;

  return (
    <nav className="w-full flex justify-between items-center p-4 border-b bg-white dark:bg-gray-900">
      <Link to="/" className="text-2xl font-bold text-primary">
        StudyAI
      </Link>

      <div className="hidden md:flex gap-6 items-center">
        <a href="#features" className="text-muted-foreground hover:text-primary">
          Features
        </a>
        <a href="#exams" className="text-muted-foreground hover:text-primary">
          Exams
        </a>
        <a href="#faq" className="text-muted-foreground hover:text-primary">
          FAQ
        </a>
      </div>

      <div className="flex gap-3 items-center">
        <ModeToggle />
        <Button variant="outline" asChild>
          <Link to="/login">Login</Link>
        </Button>
        <Button asChild>
          <Link to="/signup" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">Get Started</Link>
        </Button>
      </div>
    </nav>
  );
}
