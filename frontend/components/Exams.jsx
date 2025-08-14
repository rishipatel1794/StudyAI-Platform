import React, { useState } from "react";
import { BookOpen, Users, Trophy, Star, ChevronRight } from "lucide-react";
import "@/src/index.css";
import { useTheme } from "next-themes";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export function Exams() {
	const { theme } = useTheme();
	const navigate = useNavigate();
	const handleClick = (item) => {
		const toastConfig = {
			position: "top-right",
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: theme === "dark" ? "dark" : "light",
			className: "font-medium",
		};
		
		
	};

	const exams = [
		{
			name: "UPSC",
			fullName: "Union Public Service Commission",
			category: "Civil Services",
			students: "50,000+",
			difficulty: "Expert",
			icon: <Trophy className="w-8 h-8" />,
			color: "from-amber-400 to-orange-500",
			bgColor: "from-amber-50 to-orange-50",
			darkBgColor: "from-amber-900/20 to-orange-900/20",
		},
		{
			name: "GATE",
			fullName: "Graduate Aptitude Test in Engineering",
			category: "Engineering",
			students: "85,000+",
			difficulty: "Advanced",
			icon: <BookOpen className="w-8 h-8" />,
			color: "from-blue-400 to-indigo-500",
			bgColor: "from-blue-50 to-indigo-50",
			darkBgColor: "from-blue-900/20 to-indigo-900/20",
		},
		{
			name: "NEET",
			fullName: "National Eligibility cum Entrance Test",
			category: "Medical",
			students: "1,50,000+",
			difficulty: "Advanced",
			icon: <Users className="w-8 h-8" />,
			color: "from-green-400 to-emerald-500",
			bgColor: "from-green-50 to-emerald-50",
			darkBgColor: "from-green-900/20 to-emerald-900/20",
		},
		{
			name: "SSC",
			fullName: "Staff Selection Commission",
			category: "Government Jobs",
			students: "60,000+",
			difficulty: "Intermediate",
			icon: <Star className="w-8 h-8" />,
			color: "from-purple-400 to-pink-500",
			bgColor: "from-purple-50 to-pink-50",
			darkBgColor: "from-purple-900/20 to-pink-900/20",
		},
		{
			name: "JEE",
			fullName: "Joint Entrance Examination",
			category: "Engineering",
			students: "95,000+",
			difficulty: "Advanced",
			icon: <BookOpen className="w-8 h-8" />,
			color: "from-cyan-400 to-blue-500",
			bgColor: "from-cyan-50 to-blue-50",
			darkBgColor: "from-cyan-900/20 to-blue-900/20",
		},
		{
			name: "Banking",
			fullName: "Banking & Insurance Exams",
			category: "Finance",
			students: "40,000+",
			difficulty: "Intermediate",
			icon: <Trophy className="w-8 h-8" />,
			color: "from-rose-400 to-red-500",
			bgColor: "from-rose-50 to-red-50",
			darkBgColor: "from-rose-900/20 to-red-900/20",
		},
	];

	const getDifficultyColor = (difficulty) => {
		switch (difficulty) {
			case "Expert":
				return "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30";
			case "Advanced":
				return "text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30";
			case "Intermediate":
				return "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30";
			default:
				return "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30";
		}
	};

	return (
		<div
			className={"min-h-screen transition-all duration-300"}
			suppressHydrationWarning
		>
			<section className="py-24 px-6 bg-white dark:bg-gray-900 transition-colors duration-300">
				<div className="max-w-7xl mx-auto">
					{/* Header */}
					<div className="text-center mb-16">
						<div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 px-4 py-2 rounded-full mb-6">
							<BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
							<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
								Comprehensive Exam Coverage
							</span>
						</div>

						<h2 className="text-5xl font-bold mb-6">
							<span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
								Exams We Support
							</span>
						</h2>

						<p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
							Master India's toughest competitive exams with our
							AI-powered preparation platform. From UPSC to NEET,
							we've got you covered with personalized study plans
							and expert guidance.
						</p>
					</div>

					{/* Stats Bar */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
						{[
							{ label: "Total Students", value: "4,80,000+" },
							{ label: "Success Rate", value: "94.5%" },
							{ label: "Exam Categories", value: "15+" },
							{ label: "Study Hours", value: "2M+" },
						].map((stat, index) => (
							<div
								key={index}
								className="text-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-gray-200 dark:border-gray-600"
							>
								<div className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
									{stat.value}
								</div>
								<div className="text-sm text-gray-600 dark:text-gray-400">
									{stat.label}
								</div>
							</div>
						))}
					</div>

					{/* Exams Grid */}
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{exams.map((exam, index) => (
							<div
								key={exam.name}
								className="group relative overflow-hidden"
								style={{ animationDelay: `${index * 0.1}s` }}
							>
								<div
									className={`h-full bg-gradient-to-br ${
										theme == "dark" && exam.darkBgColor
									} dark:bg-gradient-to-br dark:${
										exam.darkBgColor
									} p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105`}
								>
									{/* Icon */}
									<div
										className={`w-16 h-16 rounded-xl bg-gradient-to-r ${exam.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
									>
										{exam.icon}
									</div>

									{/* Content */}
									<div className="space-y-4">
										<div>
											<h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
												{exam.name}
											</h3>
											<p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
												{exam.fullName}
											</p>
										</div>

										<div className="flex items-center gap-2">
											<span className="text-sm text-gray-500 dark:text-gray-400">
												Category:
											</span>
											<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
												{exam.category}
											</span>
										</div>

										<div className="flex items-center justify-between">
											<div className="flex items-center gap-2">
												<Users className="w-4 h-4 text-gray-500 dark:text-gray-400" />
												<span className="text-sm text-gray-600 dark:text-gray-400">
													{exam.students}
												</span>
											</div>
											<span
												className={`px-3 py-1 text-xs font-medium rounded-full ${getDifficultyColor(
													exam.difficulty
												)}`}
											>
												{exam.difficulty}
											</span>
										</div>

										<button
											className="cursor-pointer w-full flex items-center justify-center gap-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 dark:group-hover:text-blue-400"
											onClick={() => handleClick(exam)}
										>
											Start Preparation
											<ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
										</button>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* CTA Section */}
					<div className="text-center mt-16">
						<div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
							<h3 className="text-2xl font-bold mb-4">
								Don't See Your Exam?
							</h3>
							<p className="text-blue-100 mb-6 max-w-2xl mx-auto">
								We're constantly adding new exams and study
								materials. Request your exam and we'll
								prioritize it for our next update.
							</p>
							<button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors hover:shadow-lg transform hover:-translate-y-1">
								Request New Exam
							</button>
						</div>
					</div>

					{/* Popular Combinations */}
					<div className="mt-16">
						<h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">
							Popular Study Combinations
						</h3>
						<div className="grid md:grid-cols-3 gap-6">
							{[
								{
									exams: ["UPSC", "SSC"],
									title: "Civil Services Track",
								},
								{
									exams: ["GATE", "JEE"],
									title: "Engineering Track",
								},
								{
									exams: ["NEET", "Banking"],
									title: "Professional Track",
								},
							].map((combo, index) => (
								<div
									key={index}
									className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
								>
									<h4 className="font-semibold text-gray-800 dark:text-white mb-3">
										{combo.title}
									</h4>
									<div className="flex gap-2">
										{combo.exams.map((exam, idx) => (
											<span
												key={idx}
												className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
											>
												{exam}
											</span>
										))}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default Exams;
