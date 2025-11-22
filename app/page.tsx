'use client';

import { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import TeacherTools from './components/TeacherTools';
import { BookOpen, Users } from 'lucide-react';

type Mode = 'student' | 'teacher';

export default function Home() {
  const [mode, setMode] = useState<Mode>('student');

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
            SmartEd Tutor & Assistant
          </h1>
          <p className="text-gray-600 text-lg">
            AI-powered learning companion for Class 6-12 students
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl shadow-lg p-2 inline-flex gap-2">
            <button
              onClick={() => setMode('student')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                mode === 'student'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <BookOpen size={20} />
              Student Mode
            </button>
            <button
              onClick={() => setMode('teacher')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                mode === 'teacher'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Users size={20} />
              Teacher Mode
            </button>
          </div>
        </div>

        {/* Content */}
        {mode === 'student' ? <ChatInterface /> : <TeacherTools />}
      </div>
    </main>
  );
}
