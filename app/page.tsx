'use client';
import Link from 'next/link';
import { FiType, FiArrowRight, FiSearch, FiHash, FiCode, FiSmartphone, FiKey, FiClock } from 'react-icons/fi';

const tools = [
  {
    id: 'case-converter',
    title: 'Case Converter',
    description: 'Convert text between different cases: uppercase, lowercase, title case, camel case, and more',
    icon: <FiType />,
    category: 'Text Tools',
    popularity: 'high'
  },
  {
    id: 'word-counter',
    title: 'Word Counter',
    description: 'Count words, characters, paragraphs, and reading time for any text',
    icon: <FiHash />,
    category: 'Text Tools',
    popularity: 'high'
  },
  {
    id: 'find-replace',
    title: 'Find & Replace',
    description: 'Find and replace text with support for regex patterns and bulk operations',
    icon: <FiSearch />,
    category: 'Text Tools',
    popularity: 'high'
  },
  {
    id: 'json-formatter',
    title: 'JSON Formatter',
    description: 'Format, validate, and beautify JSON data with syntax highlighting',
    icon: <FiCode />,
    category: 'Developer',
    popularity: 'high'
  },
  {
    id: 'mock-json-generator',
    title: 'Mock JSON Generator',
    description: 'Generate realistic mock JSON data from schemas instantly. Perfect for API testing, development, and prototyping with customizable fake data generation.',
    icon: <FiCode />,
    category: 'Generators',
    popularity: 'high',
    tags: ['mock', 'json', 'generator', 'api', 'testing']
  },
  {
    id: 'password-generator',
    title: 'Password Generator',
    description: 'Generate secure, random passwords with customizable length and character sets',
    icon: <FiKey />,
    category: 'Generators',
    popularity: 'high'
  },
  {
    id: 'qr-generator',
    title: 'QR Code Generator',
    description: 'Generate QR codes for URLs, text, WiFi, and more with customization options',
    icon: <FiSmartphone />,
    category: 'Generators',
    popularity: 'high'
  },
  {
    id: 'cron-expression',
    title: 'Cron Expression Builder',
    description: 'Create and validate cron expressions with visual builder for automated tasks and jobs',
    icon: <FiClock />,
    category: 'Developer',
    popularity: 'high'
  }
];

export default function Home() {
  const popularTools = tools.filter(tool => tool.popularity === 'high');
  
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

      {/* Popular Tools Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Tools</h2>
          <p className="text-gray-600">Most used tools by our community</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {popularTools.map((tool) => (
            <Link
              key={tool.id}
              href={`/tools/${tool.id}`}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-indigo-300 transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600 group-hover:bg-indigo-200">
                  {tool.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{tool.title}</h3>
                  <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded">{tool.category}</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm">{tool.description}</p>
            </Link>
          ))}
        </div>
       {/* Stats Section */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Why Choose Our Tools?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">25+</div>
              <div className="text-gray-900 font-medium">Free Tools</div>
              <div className="text-sm text-gray-500 mt-1">Always expanding</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-gray-900 font-medium">Privacy Protected</div>
              <div className="text-sm text-gray-500 mt-1">No data collection</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">0</div>
              <div className="text-gray-900 font-medium">Registration Required</div>
              <div className="text-sm text-gray-500 mt-1">Just open and use</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 bg-indigo-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Explore All Tools
          </h2>
          <p className="text-gray-600 mb-6">
            Discover our complete collection of text manipulation, encoding, developer, and generator tools.
          </p>
          <Link
            href="/tools"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Browse All Tools
            <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}