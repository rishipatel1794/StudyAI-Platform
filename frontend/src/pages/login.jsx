import React from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail, Lock, ShieldCheck, ArrowLeft } from "lucide-react";
import { Link } from "react-router";

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		console.log("Login data:", data);
	};

	return (
		<div className="relative flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-black overflow-hidden px-4">
			<Card className="w-full max-w-md shadow-xl rounded-2xl transition-opacity duration-300 ease-in-out animate-fade-in">
				<CardContent className="p-6 space-y-6">
					<Link
						to="/"
						className="flex items-center text-sm text-purple-600 hover:underline dark:text-purple-400 mb-4"
					>
						<ArrowLeft className="w-4 h-4 mr-1" />
						Back to Home
					</Link>
					<h2 className="text-2xl font-bold text-center mb-4">
						Welcome Back 👋
					</h2>

					<form
						onSubmit={handleSubmit(onSubmit)}
						className="space-y-4"
					>
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								icon={<Mail className="h-4 w-4" />}
								placeholder="Enter your email"
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
								id="password"
								type="password"
								icon={<Lock className="h-4 w-4" />}
								placeholder="Enter your password"
								{...register("password", {
									required: "Password is required",
								})}
							/>
							{errors.password && (
								<p className="text-sm text-red-500">
									{errors.password.message}
								</p>
							)}
						</div>

						<p className="text-right text-sm">
							<Link
								to="/forgot-password"
								className="text-blue-600 hover:underline dark:text-blue-400"
							>
								Forgot Password?
							</Link>
						</p>

						<div className="space-y-2">
							<Label htmlFor="role">Select Role</Label>
							<select
								id="role"
								className="w-full p-2 border rounded-md dark:bg-black dark:text-white"
								{...register("role", {
									required: "Role is required",
								})}
							>
								<option value="">-- Select Role --</option>
								<option value="student">Student</option>
								<option value="mentor">Mentor</option>
								<option value="admin">Admin</option>
							</select>
							{errors.role && (
								<p className="text-sm text-red-500">
									{errors.role.message}
								</p>
							)}
						</div>

						<Button type="submit" className="w-full">
							<ShieldCheck className="h-4 w-4 mr-2" /> Login
						</Button>
					</form>
				</CardContent>
				<p className="text-sm text-center mt-4">
					Don’t have an account?{" "}
					<Link
						to="/signup"
						className="text-blue-600 hover:underline dark:text-blue-400"
					>
						Sign up
					</Link>
				</p>
			</Card>
		</div>
	);
};

export default Login;
