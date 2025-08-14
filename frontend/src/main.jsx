import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "@/src/pages/login";
import Signup from "@/src/pages/signup";
import Footer from "@/components/Footer";

createRoot(document.getElementById("root")).render(
	<ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<App />}></Route>
				<Route path="/signup" element={<Signup />}></Route>
				<Route path="/login" element={<Login />}></Route>
			</Routes>
			<Footer />
		</BrowserRouter>
	</ThemeProvider>
);
