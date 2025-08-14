'use client';
import React, { useState, useRef } from 'react';
import { ChevronDown, BookOpen, Zap, FileText, Calendar, Star, Check, ArrowRight } from 'lucide-react';

export const ExamSelect = () => {
  const [selectedExam, setSelectedExam] = useState('');
  const exams = ['UPSC', 'GATE', 'NEET', 'JEE', 'SSC', 'Banking'];

  return (
    <div className="relative w-full max-w-md" suppressHydrationWarning>
      <select 
        value={selectedExam}
        onChange={(e) => setSelectedExam(e.target.value)}
        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none appearance-none text-gray-700 font-medium dark:bg-gray-900 dark:text-white"
      >
        <option value="">Select Your Target Exam</option>
        {exams.map(exam => (
          <option key={exam} value={exam}>{exam}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
    </div>
  );
};