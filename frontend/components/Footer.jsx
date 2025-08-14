import React from "react";
import { useLocation } from "react-router";

const Footer = () => {
	const location = useLocation();
	if (["/login", "/signup"].includes(location.pathname)) return null;

	return (
		<footer className="bg-zinc-900 text-zinc-300 px-4 sm:px-6 py-8 sm:py-10">
			<div className="max-w-7xl mx-auto">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
					{/* Brand Info */}
					<div className="sm:col-span-2 lg:col-span-1">
						<h2 className="text-xl font-bold text-white">StudyAI</h2>
						<p className="mt-2 text-sm leading-relaxed">
							Crack any exam with India's smartest AI study assistant.
						</p>
						<p className="mt-4 text-xs text-zinc-400">
							© 2025 StudyAI. All rights reserved.
						</p>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className="font-semibold text-white mb-3 text-base">
							Quick Links
						</h3>
						<ul className="space-y-2 text-sm">
							<li>
								<a 
									href="/features" 
									className="hover:text-white transition-colors duration-200"
								>
									Features
								</a>
							</li>
							<li>
								<a 
									href="/exams"
									className="hover:text-white transition-colors duration-200"
								>
									Exams
								</a>
							</li>
							<li>
								<a 
									href="/faq"
									className="hover:text-white transition-colors duration-200"
								>
									FAQs
								</a>
							</li>
							<li>
								<a 
									href="/login"
									className="hover:text-white transition-colors duration-200"
								>
									Login
								</a>
							</li>
							<li>
								<a 
									href="/signup"
									className="hover:text-white transition-colors duration-200"
								>
									Get Started
								</a>
							</li>
						</ul>
					</div>

					{/* Exams */}
					<div>
						<h3 className="font-semibold text-white mb-3 text-base">
							Popular Exams
						</h3>
						<ul className="space-y-2 text-sm">
							<li className="hover:text-white transition-colors duration-200 cursor-pointer">UPSC</li>
							<li className="hover:text-white transition-colors duration-200 cursor-pointer">GATE</li>
							<li className="hover:text-white transition-colors duration-200 cursor-pointer">NEET</li>
							<li className="hover:text-white transition-colors duration-200 cursor-pointer">SSC</li>
							<li className="hover:text-white transition-colors duration-200 cursor-pointer">JEE</li>
							<li className="hover:text-white transition-colors duration-200 cursor-pointer">Banking</li>
						</ul>
					</div>

					{/* Support / Contact */}
					<div>
						<h3 className="font-semibold text-white mb-3 text-base">Support</h3>
						<ul className="space-y-2 text-sm">
							<li>
								<a 
									href="/contact"
									className="hover:text-white transition-colors duration-200"
								>
									Contact Us
								</a>
							</li>
							<li>
								<a 
									href="/support"
									className="hover:text-white transition-colors duration-200"
								>
									Help Center
								</a>
							</li>
							<li>
								<a 
									href="/privacy"
									className="hover:text-white transition-colors duration-200"
								>
									Privacy Policy
								</a>
							</li>
							<li>
								<a 
									href="/terms"
									className="hover:text-white transition-colors duration-200"
								>
									Terms of Service
								</a>
							</li>
						</ul>
					</div>
				</div>

				{/* Bottom divider and social links (optional) */}
				<div className="border-t border-zinc-800 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center">
					<p className="text-xs text-zinc-400 mb-4 sm:mb-0">
						Made with ❤️ for Indian students
					</p>
					<div className="flex space-x-4">
						{/* Add social media icons if needed */}
						<a 
							href="#" 
							className="text-zinc-400 hover:text-white transition-colors duration-200"
							aria-label="Twitter"
						>
					
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;