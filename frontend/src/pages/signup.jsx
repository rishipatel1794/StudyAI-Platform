import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { User, Mail, Lock } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

const Signup = () => {
	const [step, setStep] = useState(1);
	const [role, setRole] = useState("student");
	const {
		register,
		handleSubmit,
		formState: { errors },
		trigger,
		watch,
	} = useForm();

	const onNext = async () => {
		const valid = await trigger();
		if (valid && step < 2) setStep(step + 1);
	};

	const onBack = () => setStep(step - 1);

	const onSubmit = (data) => {
		console.log("Form Submitted:", data);
	};

	return (
		<div className="relative flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-black overflow-hidden">
			<Card className="w-full max-w-xl shadow-xl rounded-2xl transition-opacity duration-300 ease-in-out animate-fade-in my-4">
				<CardContent className="p-6 space-y-5">
					<Link
						to="/"
						className="flex items-center text-sm text-purple-600 hover:underline dark:text-purple-400 mb-4"
					>
						<ArrowLeft className="w-4 h-4 mr-1" />
						Back to Home
					</Link>
					<h1 className="text-3xl md:text-3xl text-center font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
						StudyAI
					</h1>

					<h2 className="text-2xl font-bold text-center mb-4">
						Create Account
					</h2>
					<Progress
						value={step === 1 ? 50 : 100}
						className="mb-4 bg-gray-200 dark:bg-gray-700 [&>div]:bg-gradient-to-r [&>div]:from-blue-600 [&>div]:via-purple-600 [&>div]:to-indigo-600"
					/>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="space-y-4"
					>
						{step === 1 && (
							<>
								<div className="space-y-2">
									<Label htmlFor="fullName">Full Name</Label>
									<Input
										icon={<User className="h-4 w-4" />}
										id="fullName"
										placeholder="Enter your full name"
										{...register("fullName", {
											required: "Full name is required",
										})}
									/>
									{errors.fullName && (
										<p className="text-sm text-red-500">
											{errors.fullName.message}
										</p>
									)}
								</div>

								<div className="space-y-2">
									<Label htmlFor="email">Email</Label>
									<Input
										icon={<Mail className="h-4 w-4" />}
										id="email"
										placeholder="Enter your email"
										type="email"
										{...register("email", {
											required: "Email is required",
										})}
									/>
									{errors.email && (
										<p className="text-sm text-red-500">
											{errors.email.message}
										</p>
									)}
								</div>

								<div className="space-y-2">
									<Label htmlFor="password">Password</Label>
									<Input
										icon={<Lock className="h-4 w-4" />}
										id="password"
										placeholder="Enter your password"
										type="password"
										{...register("password", {
											required: "Password is required",
											minLength: {
												value: 6,
												message: "Min length is 6",
											},
										})}
									/>
									{errors.password && (
										<p className="text-sm text-red-500">
											{errors.password.message}
										</p>
									)}
								</div>

								<div className="space-y-2">
									<Label htmlFor="confirmPassword">
										Confirm Password
									</Label>
									<Input
										icon={<Lock className="h-4 w-4" />}
										id="confirmPassword"
										placeholder="Re-enter your password"
										type="password"
										{...register("confirmPassword", {
											required:
												"Please confirm your password",
											validate: (value) =>
												value === watch("password") ||
												"Passwords do not match",
										})}
									/>
									{errors.confirmPassword && (
										<p className="text-sm text-red-500">
											{errors.confirmPassword.message}
										</p>
									)}
								</div>

								<div className="space-y-2">
									<Label htmlFor="role">Select Role</Label>
									<select
										id="role"
										className="w-full p-2 border rounded-md dark:bg-black dark:text-white"
										{...register("role", {
											required: true,
										})}
										onChange={(e) =>
											setRole(e.target.value)
										}
									>
										<option value="student">Student</option>
										<option value="mentor">Mentor</option>
										<option value="admin">Admin</option>
									</select>
								</div>
								<p className="text-right text-sm">
									<Link
										to="/forgot-password"
										className="text-blue-600 hover:underline dark:text-blue-400"
									>
										Forgot Password?
									</Link>
								</p>
							</>
						)}

						{step === 2 && role === "student" && (
							<>
								<div className="space-y-2">
									<Label htmlFor="targetExam">
										Target Exam
									</Label>
									<select
										id="targetExam"
										className="w-full p-2 border rounded-md dark:bg-black dark:text-white"
										{...register("targetExam", {
											required: true,
										})}
									>
										<option>UPSC</option>
										<option>GATE</option>
										<option>NEET</option>
									</select>
								</div>

								<div className="space-y-2">
									<Label htmlFor="academicLevel">
										Academic Level
									</Label>
									<select
										id="academicLevel"
										className="w-full p-2 border rounded-md dark:bg-black dark:text-white"
										{...register("academicLevel", {
											required: true,
										})}
									>
										<option>10th</option>
										<option>12th</option>
										<option>UG</option>
										<option>PG</option>
										<option>Other</option>
									</select>
								</div>

								<div className="space-y-2">
									<Label htmlFor="studyGoal">
										Study Goal
									</Label>
									<Textarea
										id="studyGoal"
										placeholder="Describe your short-term study goal"
										{...register("studyGoal", {
											required: true,
										})}
									/>
								</div>
							</>
						)}

						{step === 2 && role === "mentor" && (
							<>
								<div className="space-y-2">
									<Label>Subjects of Expertise</Label>
									<select
										multiple
										className="w-full p-2 border rounded-md dark:bg-black dark:text-white"
										{...register("subjects", {
											required: true,
										})}
									>
										<option>Physics</option>
										<option>Chemistry</option>
										<option>Current Affairs</option>
									</select>
								</div>

								<div className="space-y-2">
									<Label>Years of Experience</Label>
									<Input
										type="number"
										placeholder="e.g. 3"
										{...register("experience", {
											required: true,
										})}
									/>
								</div>

								<div className="space-y-2">
									<Label>Short Bio</Label>
									<Textarea
										placeholder="Tell us about your teaching background"
										{...register("bio", { required: true })}
									/>
								</div>
							</>
						)}

						{step === 2 && role === "admin" && (
							<div className="space-y-2">
								<Label>Access Level</Label>
								<select
									className="w-full p-2 border rounded-md dark:bg-black dark:text-white"
									{...register("accessLevel", {
										required: true,
									})}
								>
									<option>Superadmin</option>
									<option>Content Manager</option>
									<option>Moderator</option>
								</select>
							</div>
						)}

						<div className="flex justify-between">
							{step > 1 && (
								<Button type="button" onClick={onBack}>
									Back
								</Button>
							)}
							{step < 2 && (
								<Button type="button" onClick={onNext}>
									Next
								</Button>
							)}
							{step === 2 && (
								<Button type="submit">Submit</Button>
							)}
						</div>
					</form>
					<p className="text-sm text-center">
						Already have an account?{" "}
						<Link
							to="/login"
							className="text-blue-600 hover:underline dark:text-blue-400"
						>
							Login
						</Link>
					</p>
				</CardContent>
			</Card>
		</div>
	);
};

export default Signup;
