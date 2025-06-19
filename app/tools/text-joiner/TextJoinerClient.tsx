'use client';
import { useState } from 'react';
import { FiArrowRight, FiCopy, FiRefreshCw, FiLink, FiHome, FiChevronRight, FiType, FiAlignLeft, FiPlus, FiScissors } from 'react-icons/fi';
import Link from 'next/link';

// Schema markup component
function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Text Joiner",
    "url": "https://freedevtools.dev/tools/text-joiner",
    "description": "Free online text joiner tool to combine multiple text lines with custom separators and formatting options.",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Join text with custom separator",
      "Multiple join modes (lines, words, custom)",
      "Remove empty entries",
      "Trim whitespace",
      "Support for multiline text input",
      "One-click copy to clipboard"
    ],
    "provider": {
      "@type": "Organization",
      "name": "Free Developer Tools"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Breadcrumb component
function Breadcrumb() {
  return (
    <nav className="flex items-center text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
      <Link href="/" className="hover:text-indigo-600 flex items-center">
        <FiHome className="w-4 h-4 mr-1" />
        Home
      </Link>
      <FiChevronRight className="w-4 h-4 mx-2" />
      <Link href="/tools" className="hover:text-indigo-600">
        Tools
      </Link>
      <FiChevronRight className="w-4 h-4 mx-2" />
      <span className="text-gray-900 font-medium">Text Joiner</span>
    </nav>
  );
}

// Main component
export default function TextJoinerClient() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [separator, setSeparator] = useState(',');
  const [joinMode, setJoinMode] = useState<'lines' | 'words' | 'custom'>('lines');
  const [options, setOptions] = useState({
    removeEmpty: true,
    trimWhitespace: true,
    addSpaceAfterSeparator: false,
  });
  const [copied, setCopied] = useState(false);

  const joinText = () => {
    if (!input.trim()) {
      setResult('');
      return;
    }

    let parts: string[] = [];

    switch (joinMode) {
      case 'lines':
        parts = input.split('\n');
        break;
      case 'words':
        parts = input.split(/\s+/);
        break;
      case 'custom':
        // For custom mode, treat each line as a separate item to join
        parts = input.split('\n');
        break;
      default:
        parts = input.split('\n');
        break;
    }

    if (options.trimWhitespace) {
      parts = parts.map(part => part.trim());
    }

    if (options.removeEmpty) {
      parts = parts.filter(part => part.length > 0);
    }

    const finalSeparator = options.addSpaceAfterSeparator ? separator + ' ' : separator;
    const joinedText = parts.join(finalSeparator);
    
    setResult(joinedText);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      alert('Failed to copy to clipboard');
    }
  };

  const resetFields = () => {
    setInput('');
    setResult('');
  };

  const handleModeChange = (mode: 'lines' | 'words' | 'custom') => {
    setJoinMode(mode);
    if (mode === 'lines' && separator === ' ') setSeparator(',');
    else if (mode === 'words' && separator === ',') setSeparator(' ');
  };

  return (
    <>
      <SchemaMarkup />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Breadcrumb />
          
          {/* Hero Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <FiRefreshCw className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Text Joiner Tool
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join multiple text lines or words into a single string using custom separators. 
              Perfect for creating CSV data, concatenating lists, and formatting text output.
            </p>
          </div>

          {/* Main Tool */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter text to join (each line will be joined):
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter text here, each line will be joined together..."
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-32 resize-none"
              />
            </div>

            {/* Join Mode Options */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Join Mode:</h3>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <button
                  onClick={() => handleModeChange('lines')}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    joinMode === 'lines'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <FiAlignLeft className="w-4 h-4 mx-auto mb-1" />
                  Join Lines
                </button>
                
                <button
                  onClick={() => handleModeChange('words')}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    joinMode === 'words'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <FiType className="w-4 h-4 mx-auto mb-1" />
                  Join Words
                </button>
                
                <button
                  onClick={() => handleModeChange('custom')}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    joinMode === 'custom'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <FiPlus className="w-4 h-4 mx-auto mb-1" />
                  Custom
                </button>
              </div>

              {/* Separator Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Separator:
                </label>
                <input
                  type="text"
                  value={separator}
                  onChange={(e) => setSeparator(e.target.value)}
                  placeholder="Enter separator (e.g., ,, ;, |, -)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Options */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Options:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  onClick={() => setOptions(prev => ({...prev, removeEmpty: !prev.removeEmpty}))}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    options.removeEmpty
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  Remove Empty
                </button>
                
                <button
                  onClick={() => setOptions(prev => ({...prev, trimWhitespace: !prev.trimWhitespace}))}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    options.trimWhitespace
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  Trim Whitespace
                </button>
                
                <button
                  onClick={() => setOptions(prev => ({...prev, addSpaceAfterSeparator: !prev.addSpaceAfterSeparator}))}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    options.addSpaceAfterSeparator
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  Add Space After
                </button>
                
                <button
                  onClick={resetFields}
                  className="p-3 rounded-lg text-sm font-medium bg-red-100 hover:bg-red-200 text-red-600 cursor-pointer transition-colors"
                >
                  <FiRefreshCw className="w-4 h-4 mx-auto mb-1" />
                  Reset
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={joinText}
                disabled={!input.trim()}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 font-medium cursor-pointer transition-colors"
              >
                <FiLink />
                Join Text
              </button>
              
              {result && (
                <button
                  onClick={copyToClipboard}
                  className="bg-gray-200 px-6 py-3 rounded-lg hover:bg-gray-300 flex items-center gap-2 font-medium cursor-pointer transition-colors"
                >
                  {copied ? <FiRefreshCw className="text-green-600" /> : <FiCopy />}
                  {copied ? 'Copied!' : 'Copy Result'}
                </button>
              )}
            </div>

            {/* Result */}
            {result && (
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Joined Result:
                </label>
                <div className="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <div className="max-h-64 overflow-y-auto">
                    <div className="p-3 bg-white rounded border text-sm font-mono">
                      {result}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* How to Use Guide */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FiType className="text-indigo-600" />
              How to Use the Text Joiner
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Step-by-Step Guide</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Enter or paste the text you want to join in the input field</li>
                  <li>Choose your join mode:</li>
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li><strong>Join Lines:</strong> Combine each line with your separator</li>
                    <li><strong>Join Words:</strong> Combine words with your separator</li>
                    <li><strong>Custom:</strong> Use custom logic for joining text</li>
                  </ul>
                  <li>Enter your desired separator (comma, semicolon, pipe, etc.)</li>
                  <li>Configure options (remove empty parts, trim whitespace, add spaces)</li>
                  <li>Click "Join Text" to generate the joined result</li>
                  <li>Copy the result using the "Copy Result" button</li>
                </ol>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">💡 Pro Tips</h4>
                <ul className="list-disc list-inside space-y-1 text-blue-700">
                  <li>Use comma separator for creating CSV data</li>
                  <li>Use pipe (|) separator for creating database-friendly formats</li>
                  <li>Enable "Add Space After" for more readable output</li>
                  <li>Perfect for combining lists, creating tags, or formatting data</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Examples */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Text Joining Examples</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-green-700">Comma Joining</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded border">
                    <div className="text-sm text-gray-600 mb-1">Original Lines:</div>
                    <code className="text-sm whitespace-pre">apple
banana
cherry
date</code>
                  </div>
                  <div className="bg-green-50 p-3 rounded border">
                    <div className="text-sm text-green-600 mb-1">Joined Result:</div>
                    <code className="text-sm">apple, banana, cherry, date</code>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Pipe Joining</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded border">
                    <div className="text-sm text-gray-600 mb-1">Original Lines:</div>
                    <code className="text-sm whitespace-pre">Name
Email
Phone
Address</code>
                  </div>
                  <div className="bg-blue-50 p-3 rounded border">
                    <div className="text-sm text-blue-600 mb-1">Joined Result:</div>
                    <code className="text-sm">Name|Email|Phone|Address</code>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Tools */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Text Tools</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/tools/text-splitter" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiScissors className="text-indigo-600" />
                  <h3 className="font-semibold">Text Splitter</h3>
                </div>
                <p className="text-sm text-gray-600">Split text by custom delimiters, lines, or words</p>
              </Link>
              
              <Link href="/tools/text-reverser" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiArrowRight className="text-indigo-600" />
                  <h3 className="font-semibold">Text Reverser</h3>
                </div>
                <p className="text-sm text-gray-600">Reverse text, words, or lines</p>
              </Link>
              
              <Link href="/tools/case-converter" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiType className="text-indigo-600" />
                  <h3 className="font-semibold">Case Converter</h3>
                </div>
                <p className="text-sm text-gray-600">Convert text to uppercase, lowercase, title case</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}