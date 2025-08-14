import { useRef, useState } from "react";
import {
  ChevronDown,
  BookOpen,
  Zap,
  FileText,
  Calendar
} from "lucide-react";

export function Features() {
  const ref = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Doubt Solver",
      description:
        "Get AI-powered answers to any question within seconds. Our advanced models understand context and provide exam-specific solutions.",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Auto Quiz Generation",
      description:
        "Generate unlimited practice questions tailored to your exam pattern. Adaptive difficulty based on your performance.",
      color: "from-blue-400 to-purple-500"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "PDF/Text Summarizer",
      description:
        "Transform lengthy study materials into concise, digestible summaries. Extract key points and important formulas instantly.",
      color: "from-green-400 to-teal-500"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Smart Study Planner",
      description:
        "AI-driven personalized study schedules that adapt to your pace and exam dates. Never miss important topics again.",
      color: "from-purple-400 to-pink-500"
    }
  ];

  return (
    <section
      ref={ref}
      className="py-24 px-6 bg-white dark:bg-black transition-colors duration-300"
      suppressHydrationWarning
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Powerful Features for{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Every Learner
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover how our AI-powered tools can transform your exam
            preparation journey
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="h-full bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg dark:shadow-md border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-purple-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Glow Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
