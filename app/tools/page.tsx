import Link from 'next/link';
import { Metadata } from 'next';
import { FiMinimize, FiCalendar, FiTerminal, FiShuffle, FiColumns, FiType, FiArrowRight, FiLink, FiSearch, FiHash, FiLock, FiClock,FiScissors, FiCode, FiGitMerge, FiSmartphone, FiDroplet, FiKey, FiAlignLeft, FiShield, FiFilter } from 'react-icons/fi';

export const metadata: Metadata = {
  title: 'Free Developer Tools Directory - Text & Developer Utilities | Free Developer Tools',
  description: 'Browse our complete collection of free online tools for text manipulation, encoding, development, and more. All tools are free and require no registration.',
  keywords: ['online tools', 'text tools', 'developer tools', 'free utilities', 'web tools', 'text manipulation', 'encoding tools', 'developer utilities'],
};

const tools = [
  // Text Manipulation Tools
  {
    id: 'case-converter',
    title: 'Case Converter',
    description: 'Convert text between different cases: uppercase, lowercase, title case, camel case, and more',
    icon: <FiType />,
    category: 'Text Tools',
    popularity: 'high', // Keep - universal need
    tags: ['text', 'case', 'uppercase', 'lowercase', 'conversion']
  },
  {
    id: 'text-reverser', 
    title: 'Text Reverser',
    description: 'Reverse text, words, or lines with various options and formatting',
    icon: <FiArrowRight />,
    category: 'Text Tools',
    popularity: 'medium',
    tags: ['text', 'reverse', 'flip', 'mirror']
  },
  {
    id: 'slug-converter',
    title: 'Slug Generator',
    description: 'Convert text to URL-friendly slugs for web development and SEO',
    icon: <FiLink />,
    category: 'Text Tools',
    popularity: 'medium', // Demoted - more specialized
    tags: ['slug', 'url', 'seo', 'web', 'friendly']
  },
  {
    id: 'find-replace',
    title: 'Find & Replace',
    description: 'Find and replace text with support for regex patterns and bulk operations',
    icon: <FiSearch />,
    category: 'Text Tools',
    popularity: 'high', // Promoted - broad appeal for content creators
    tags: ['find', 'replace', 'search', 'regex', 'bulk']
  },
  {
    id: 'word-counter',
    title: 'Word Counter',
    description: 'Count words, characters, paragraphs, and reading time for any text',
    icon: <FiHash />,
    category: 'Text Tools',
    popularity: 'high', // Keep - writers, students, professionals use daily
    tags: ['count', 'words', 'characters', 'reading', 'statistics']
  },
  {
    id: 'text-splitter',
    title: 'Text Splitter',
    description: 'Split text into parts using custom delimiters, lines, words, or characters',
    icon: <FiScissors />,
    category: 'Text Tools',
    popularity: 'medium', // Keep as medium for now
    tags: ['split', 'text', 'delimiter', 'lines', 'words', 'characters']
  },
  {
    id: 'text-formatter',
    title: 'Text Formatter',
    description: 'Format text with options for indentation, line breaks, and more',
    icon: <FiShuffle />,
    category: 'Text Tools',
    popularity: 'medium',
    tags: ['format', 'text', 'indentation', 'line breaks']
  },

  // Encoding/Decoding Tools
  {
    id: 'base64-tool',
    title: 'Base64 Encoder/Decoder',
    description: 'Encode and decode Base64 strings with support for files and images',
    icon: <FiLock />,
    category: 'Encoding',
    popularity: 'medium', // Demoted - more niche developer tool
    tags: ['base64', 'encode', 'decode', 'encryption']
  },
  {
    id: 'html-encoder-decoder',
    title: 'HTML Encoder/Decoder',
    description: 'Encode and decode HTML entities for safe web content display',
    icon: <FiCode />,
    category: 'Encoding',
    popularity: 'medium',
    tags: ['html', 'entities', 'encode', 'decode', 'web']
  },
  {
    id: 'url-encoder-decoder',
    title: 'URL Encoder/Decoder',
    description: 'Encode and decode URLs for proper web transmission and display',
    icon: <FiLink />,
    category: 'Encoding',
    popularity: 'medium',
    tags: ['url', 'encode', 'decode', 'web', 'transmission']
  },

  // Developer Tools
  {
    id: 'json-formatter',
    title: 'JSON Formatter',
    description: 'Format, validate, and beautify JSON data with syntax highlighting',
    icon: <FiCode />,
    category: 'Developer',
    popularity: 'high', 
    tags: ['json', 'format', 'validate', 'beautify', 'syntax']
  },
  {
    id: 'css-formatter',
    title: 'CSS Formatter',
    description: 'Format, minify, and validate CSS code with syntax highlighting',
    icon: <FiTerminal />,
    category: 'Developer',
    popularity: 'medium',
    tags: ['css', 'format', 'minify', 'validate', 'syntax']
  },
  {
    id: 'csv-formatter',
    title: 'CSV Formatter',
    description: 'Format, validate, and convert CSV data with custom delimiters and options',
    icon: <FiColumns />,
    category: 'Developer',
    popularity: 'medium',
    tags: ['csv', 'format', 'validate', 'convert', 'delimiter']
  },
  {
    id: 'regex-tester',
    title: 'Regex Tester',
    description: 'Test and debug regular expressions with real-time matching and explanations',
    icon: <FiGitMerge />,
    category: 'Developer',
    popularity: 'medium',
    tags: ['regex', 'test', 'debug', 'pattern', 'matching']
  },
  {
    id: 'diff-checker',
    title: 'Text Diff Checker',
    description: 'Compare two texts and highlight differences line by line',
    icon: <FiMinimize />,
    category: 'Developer',
    popularity: 'medium',
    tags: ['diff', 'compare', 'text', 'differences', 'merge']
  },
  {
    id: 'number-base-converter',
    title: 'Number Base Converter',
    description: 'Convert numbers between different bases: binary, decimal, hexadecimal, octal, and more',
    icon: <FiHash />,
    category: 'Developer',
    popularity: 'medium',
    tags: ['number', 'base', 'binary', 'hex', 'octal', 'decimal', 'converter']
  },
  {
    id: 'timezone-converter',
    title: 'Timezone Converter',
    description: 'Convert dates and times between different timezones with ease',
    icon: <FiCalendar />,
    category: 'Developer',
    popularity: 'medium',
    tags: ['timezone', 'convert', 'date', 'time', 'utc']
  },
  {
    id: 'cron-expression',
    title: 'Cron Expression Builder',
    description: 'Create and validate cron expressions with our free visual builder. Generate cron schedules for automated tasks, jobs, and system administration with real-time validation.',
    icon: <FiClock />,
    category: 'Developer',
    popularity: 'high',
    tags: ['cron', 'expression', 'builder', 'scheduler', 'jobs']
  },

  // Generators
  {
    id: 'qr-generator',
    title: 'QR Code Generator',
    description: 'Generate QR codes for URLs, text, WiFi, and more with customization options',
    icon: <FiSmartphone />,
    category: 'Generators',
    popularity: 'high', // Keep - high demand, mobile-friendly
    tags: ['qr', 'code', 'generator', 'url', 'wifi']
  },
  {
    id: 'color-converter',
    title: 'Color Converter',
    description: 'Convert colors between HEX, RGB, HSL, and other color formats',
    icon: <FiDroplet />,
    category: 'Generators',
    popularity: 'medium',
    tags: ['color', 'convert', 'hex', 'rgb', 'hsl']
  },
  {
    id: 'password-generator',
    title: 'Password Generator',
    description: 'Generate secure, random passwords with customizable length and character sets',
    icon: <FiKey />,
    category: 'Generators',
    popularity: 'high', // Keep - security is always high priority
    tags: ['password', 'generate', 'secure', 'random', 'strong']
  },
  {
    id: 'bcrypt-tool',
    title: 'Bcrypt Hash Generator',
    description: 'Generate and verify secure bcrypt hashes for password protection',
    icon: <FiShield />,
    category: 'Generators',
    popularity: 'medium',
    tags: ['bcrypt', 'hash', 'password', 'security', 'encryption']
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
    id: 'api-code-generator',
    title: 'API Code Generator',
    description: 'Generate ready-to-use API request code snippets in 10+ programming languages. Includes authentication, error handling, and TypeScript support. Free online tool for developers.',
    icon: <FiTerminal />,
    category: 'Developer',
    popularity: 'high',
    tags: ['api', 'code', 'generator', 'http', 'request', 'snippets']
  },
  {
    id: 'lorem-ipsum',
    title: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text for design and development projects',
    icon: <FiAlignLeft />,
    category: 'Generators',
    popularity: 'medium',
    tags: ['lorem', 'ipsum', 'placeholder', 'text', 'dummy']
  },
];

const categories = [
  { name: 'All Tools', count: tools.length },
  { name: 'Text Tools', count: tools.filter(t => t.category === 'Text Tools').length },
  { name: 'Encoding', count: tools.filter(t => t.category === 'Encoding').length },
  { name: 'Developer', count: tools.filter(t => t.category === 'Developer').length },
  { name: 'Generators', count: tools.filter(t => t.category === 'Generators').length },
];

export default function ToolsDirectory() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Free Online Text & Developer Tools Directory
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Complete collection of {tools.length} free developer tools for text manipulation, 
              encoding, development, and more. All tools work in your browser with no registration required.
            </p>
          </div>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`#${category.name}`}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <FiFilter className="mr-2 h-4 w-4" />
                {category.name} ({category.count})
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Popular Tools Section */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Popular Tools</h2>
            <span className="ml-3 px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
              Most Used
            </span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.filter(tool => tool.popularity === 'high').map((tool) => (
              <Link
                key={tool.id}
                href={`/tools/${tool.id}`}
                className="bg-white p-6 rounded-lg shadow-sm border-2 border-yellow-200 hover:shadow-md hover:border-yellow-300 transition-all group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600 group-hover:bg-yellow-200">
                    {tool.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{tool.title}</h3>
                    <span className="text-xs text-yellow-600 bg-yellow-50 px-2 py-1 rounded">{tool.category}</span>
                  </div>
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-medium">Popular</span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{tool.description}</p>
                <div className="flex flex-wrap gap-1">
                  {tool.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* All Tools by Category */}
        {['Text Tools', 'Encoding', 'Developer', 'Generators'].map((categoryName) => (
          <div id={categoryName} key={categoryName} className="mb-12">
            <div className="flex items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{categoryName}</h2>
              <span className="ml-3 px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full">
                {tools.filter(t => t.category === categoryName).length} tools
              </span>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.filter(tool => tool.category === categoryName).map((tool) => (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.id}`}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-indigo-300 transition-all group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600 group-hover:bg-indigo-200">
                      {tool.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{tool.title}</h3>
                      <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded">{tool.category}</span>
                    </div>
                    {tool.popularity === 'high' && (
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Popular</span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{tool.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {tool.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* CTA Section */}
        <div className="text-center mt-16 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Can't find the tool you need?
          </h2>
          <p className="text-gray-600 mb-6">
            We're constantly adding new tools to our collection. Bookmark this page and check back regularly for updates.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Back to Home
            </Link>
            <Link  href="/feedback" className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg border border-indigo-200 hover:bg-indigo-50 transition-colors">
              Request a Tool
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}