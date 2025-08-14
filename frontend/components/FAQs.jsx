"use client";
import { useState } from "react";
import { ChevronDown } from 'lucide-react';

export function FAQs() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    { 
      q: "How does AI solve my doubts?", 
      a: "Our AI is powered by advanced language models trained on vast educational datasets. It understands context, provides step-by-step solutions, and offers exam-specific insights tailored to your preparation needs." 
    },
    { 
      q: "Can I change exams later?", 
      a: "Absolutely! You can switch between different exams anytime from your dashboard. Your progress and study materials will be automatically organized according to your new exam selection." 
    },
    { 
      q: "Is it free?", 
      a: "Yes, our Starter Plan is completely free and includes basic features like doubt solving and quiz generation. Premium features with advanced AI capabilities are available through our subscription plans." 
    },
    {
      q: "How accurate are the AI-generated answers?",
      a: "Our AI maintains 95%+ accuracy across all major competitive exams. We continuously update our models with the latest syllabus changes and exam patterns to ensure maximum reliability."
    },
    {
      q: "Can I use it offline?",
      a: "Currently, StudyAI requires an internet connection for real-time AI processing. However, you can download generated quizzes and summaries for offline study."
    }
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-black transition-colors duration-300" suppressHydrationWarning>
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Frequently Asked 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Questions</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Everything you need to know about StudyAI
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${openFAQ === index ? 'rotate-180' : ''}`}
                />
              </button>
              
              <div className={`px-8 overflow-hidden transition-all duration-300 ${openFAQ === index ? 'pb-6 max-h-96' : 'max-h-0'}`}>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400 mb-6">Still have questions?</p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
}
