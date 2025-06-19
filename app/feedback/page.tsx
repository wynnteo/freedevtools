// app/feedback/page.tsx
'use client';
import { useState } from 'react';
import emailjs from 'emailjs-com';

type FeedbackType = 'bug' | 'feature' | 'tool-request' | 'general';

export default function FeedbackPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('general');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    const templateParams = {
      name: name,
      email: email,
      feedback_type: feedbackType,
      title: title,
      message,
    };

    try {
      await emailjs.send(
        'service_deg3o15',
        'template_2h75vgl',
        templateParams,
        'Ayjet2yhrYaDnhJJ7'
      );

      setStatus('success');
      setName('');
      setEmail('');
      setFeedbackType('general');
      setTitle('');
      setMessage('');
    } catch (error) {
      console.error('Email send error:', error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Free Online Text & Developer Tools
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            A comprehensive collection of free, fast, and secure online tools for developers, writers, and digital professionals. No registration required.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
              ✅ 100% Free
            </div>
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
              🔒 Privacy First
            </div>
            <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
              ⚡ Instant Results
            </div>
            <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium">
              📱 Mobile Friendly
            </div>
          </div>
        </div>
      </div>
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 max-w-2xl mx-auto my-8">
      <h2 className="text-2xl font-semibold mb-4">Feedback & Contact</h2>
      
      {status === 'success' && (
        <div className="bg-green-100 p-4 rounded-lg mb-4 text-green-700">
          Thank you! Your feedback has been submitted.
        </div>
      )}

      {status === 'error' && (
        <div className="bg-red-100 p-4 rounded-lg mb-4 text-red-700">
          Something went wrong. Please try again later.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 font-medium">Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Your name"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Email *</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="your@email.com"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">What type of feedback is this? *</label>
          <select
            value={feedbackType}
            onChange={(e) => setFeedbackType(e.target.value as FeedbackType)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="general">General Feedback</option>
            <option value="bug">Bug Report</option>
            <option value="tool-request">New Tool Request</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 font-medium">Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Brief summary of your feedback"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Message *</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Describe your feedback, bug report, or new tool request..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50 font-medium"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
    </div>
    </div>
  );
}