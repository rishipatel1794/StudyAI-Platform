// import { ExamSelect } from "@/components/ExamSelect";
import React, { useState } from "react";
// import Link  from "next/link";
import {
	ChevronDown,
	BookOpen,
	Zap,
	FileText,
	Calendar,
	Star,
	Check,
	ArrowRight,
} from "lucide-react";
import { Link } from "react-router";

export function Welcome() {

	return (
		<div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-black overflow-hidden">
			{/* Background Pattern */}
			
			<div className="absolute inset-0 opacity-30 dark:opacity-40">
				<div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
				<div className="absolute top-40 right-20 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
				<div className="absolute bottom-20 left-1/2 w-72 h-72 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
			</div>

			<div className="relative z-10 flex flex-col items-center justify-center text-center gap-8 p-8 max-w-4xl mx-auto min-h-screen">
				{/* Hero Badge */}
				<div className="inline-flex items-center gap-2 bg-white/80 dark:bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200 dark:border-gray-700 shadow-sm">
					<Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
					<span className="text-sm font-medium text-gray-700 dark:text-gray-200">
						India's #1 AI Study Assistant
					</span>
				</div>

				{/* Main Heading */}
				<div className="space-y-4">
					<h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
						StudyAI
					</h1>
					<div className="flex items-center justify-center gap-2 text-2xl text-gray-600 dark:text-gray-300">
						<Zap className="w-6 h-6 text-yellow-500" />
						<span>Crack Any Exam with AI</span>
					</div>
				</div>

				{/* Description */}
				<p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
					Prepare for UPSC, GATE, NEET, and more with India's smartest AI
					assistant. Get instant doubt resolution, personalized
					quizzes, and intelligent study planning.
				</p>

				{/* Exam Selection */}
				{/* <div className="w-full max-w-md"><ExamSelect /></div> */}

				{/* CTA Buttons */}
				<div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
					
						<Link
							to="/signup"
							className="relative z-10 flex items-center justify-center gap-2 flex-1 group overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
						>
							Get Started
							<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
						</Link>
						<div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
					

					
						<Link to="/login" className="flex-1 bg-white/80 dark:bg-white/10 backdrop-blur-sm text-gray-700 dark:text-gray-200 px-8 py-4 rounded-xl font-semibold border border-gray-200 dark:border-gray-700 hover:bg-white hover:dark:bg-gray-900 hover:shadow-md transition-all duration-300">Login</Link>
				</div>

				{/* Social Proof */}
				<div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mt-8">
					<div className="flex items-center gap-1">
						<Check className="w-4 h-4 text-green-500" />
						<span>10,000+ Students</span>
					</div>
					<div className="flex items-center gap-1">
						<Check className="w-4 h-4 text-green-500" />
						<span>95% Success Rate</span>
					</div>
					<div className="flex items-center gap-1">
						<Check className="w-4 h-4 text-green-500" />
						<span>24/7 AI Support</span>
					</div>
				</div>
			</div>
			
		</div>
	);
}
