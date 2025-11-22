'use client';

import { useState } from 'react';
import { FileText, CheckSquare, ClipboardList, Users, Download, BookOpen, Brain, Calendar } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { exportToPDF } from '../utils/pdfExport';

type ToolType = 'worksheet' | 'notes' | 'test' | 'attendance' | 'homework' | 'mindmap' | 'parent';

export default function TeacherTools() {
  const [selectedTool, setSelectedTool] = useState<ToolType>('worksheet');
  const [formData, setFormData] = useState({
    subject: 'Physics',
    topic: '',
    class: '10',
    difficulty: 'medium',
    questionCount: '10',
  });
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const tools = [
    { id: 'worksheet' as ToolType, name: 'Worksheet Generator', icon: FileText },
    { id: 'notes' as ToolType, name: 'Notes & Summary', icon: BookOpen },
    { id: 'mindmap' as ToolType, name: 'Mind Map', icon: Brain },
    { id: 'test' as ToolType, name: 'Test Paper', icon: CheckSquare },
    { id: 'attendance' as ToolType, name: 'Attendance Template', icon: Calendar },
    { id: 'homework' as ToolType, name: 'Homework Assignment', icon: ClipboardList },
    { id: 'parent' as ToolType, name: 'Parent Communication', icon: Users },
  ];

  const handleGenerate = async () => {
    if (!formData.topic.trim()) {
      alert('Please enter a topic!');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/teacher-tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolType: selectedTool,
          ...formData,
        }),
      });

      const data = await response.json();
      setGeneratedContent(data.content);
    } catch (error) {
      console.error('Error:', error);
      setGeneratedContent('Sorry! Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportPDF = () => {
    const element = document.getElementById('generated-content');
    if (element) {
      exportToPDF(element, `${selectedTool}-${formData.topic}`);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Sidebar */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Teacher Tools</h3>
          <div className="space-y-2">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                    selectedTool === tool.id
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium text-sm">{tool.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">
            {tools.find((t) => t.id === selectedTool)?.name}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Subject
              </label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Biology">Biology</option>
                <option value="English">English</option>
                <option value="Computer Science">Computer Science</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Class</label>
              <select
                value={formData.class}
                onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {[6, 7, 8, 9, 10, 11, 12].map((cls) => (
                  <option key={cls} value={cls}>
                    Class {cls}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Topic / Chapter
              </label>
              <input
                type="text"
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                placeholder="e.g., Newton's Laws of Motion, Photosynthesis, etc."
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {(selectedTool === 'worksheet' || selectedTool === 'test') && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Difficulty
                  </label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Number of Questions
                  </label>
                  <input
                    type="number"
                    value={formData.questionCount}
                    onChange={(e) => setFormData({ ...formData, questionCount: e.target.value })}
                    min="5"
                    max="50"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </>
            )}
          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl px-6 py-3 font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Generating...' : 'Generate Content'}
          </button>
        </div>

        {/* Generated Content */}
        {generatedContent && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Generated Content</h3>
              <button
                onClick={handleExportPDF}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2 font-semibold transition-colors"
              >
                <Download size={18} />
                Export PDF
              </button>
            </div>
            <div
              id="generated-content"
              className="markdown-content bg-gray-50 rounded-lg p-6 max-h-[600px] overflow-y-auto"
            >
              <ReactMarkdown>{generatedContent}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
