'use client';
import { useState } from 'react';
import { FiArrowRight, FiCopy, FiRefreshCw, FiScissors, FiHome, FiChevronRight, FiType, FiAlignLeft, FiMaximize2 } from 'react-icons/fi';
import Link from 'next/link';

// Schema markup component
function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Text Splitter",
    "url": "https://freedevtools.dev/tools/text-splitter",
    "description": "Free online text splitter tool to split text by various delimiters with customizable options.",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Split text by custom delimiter",
      "Split by lines, words, or characters",
      "Remove empty entries",
      "Trim whitespace",
      "Support for multiline text",
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
      <span className="text-gray-900 font-medium">Text Splitter</span>
    </nav>
  );
}

// Main component
export default function TextSplitterClient() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string[]>([]);
  const [delimiter, setDelimiter] = useState(',');
  const [splitMode, setSplitMode] = useState<'custom' | 'lines' | 'words' | 'chars'>('custom');
  const [options, setOptions] = useState({
    removeEmpty: true,
    trimWhitespace: true,
  });
  const [copied, setCopied] = useState(false);

  const splitText = () => {
    if (!input.trim()) {
      setResult([]);
      return;
    }

    let parts: string[] = [];

    switch (splitMode) {
      case 'lines':
        parts = input.split('\n');
        break;
      case 'words':
        parts = input.split(/\s+/);
        break;
      case 'chars':
        parts = input.split('');
        break;
      case 'custom':
      default:
        parts = input.split(delimiter);
        break;
    }

    if (options.trimWhitespace) {
      parts = parts.map(part => part.trim());
    }

    if (options.removeEmpty) {
      parts = parts.filter(part => part.length > 0);
    }

    setResult(parts);
  };

  const copyToClipboard = async () => {
    try {
      const textToCopy = result.join('\n');
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      alert('Failed to copy to clipboard');
    }
  };

  const resetFields = () => {
    setInput('');
    setResult([]);
  };

  const handleModeChange = (mode: 'custom' | 'lines' | 'words' | 'chars') => {
    setSplitMode(mode);
    if (mode === 'lines') setDelimiter('\n');
    else if (mode === 'words') setDelimiter(' ');
    else if (mode === 'chars') setDelimiter('');
    else if (mode === 'custom' && delimiter === '\n') setDelimiter(',');
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
              <FiScissors className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Text Splitter Tool
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Split text into parts using custom delimiters, lines, words, or characters. 
              Perfect for data processing, text analysis, and content organization.
            </p>
          </div>

          {/* Main Tool */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter text to split:
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type or paste your text here..."
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-32 resize-none"
              />
            </div>

            {/* Split Mode Options */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Split Mode:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <button
                  onClick={() => handleModeChange('custom')}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    splitMode === 'custom'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <FiMaximize2 className="w-4 h-4 mx-auto mb-1" />
                  Custom
                </button>
                
                <button
                  onClick={() => handleModeChange('lines')}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    splitMode === 'lines'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <FiAlignLeft className="w-4 h-4 mx-auto mb-1" />
                  Lines
                </button>
                
                <button
                  onClick={() => handleModeChange('words')}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    splitMode === 'words'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <FiType className="w-4 h-4 mx-auto mb-1" />
                  Words
                </button>
                
                <button
                  onClick={() => handleModeChange('chars')}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    splitMode === 'chars'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <FiScissors className="w-4 h-4 mx-auto mb-1" />
                  Characters
                </button>
              </div>

              {/* Custom Delimiter Input */}
              {splitMode === 'custom' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom Delimiter:
                  </label>
                  <input
                    type="text"
                    value={delimiter}
                    onChange={(e) => setDelimiter(e.target.value)}
                    placeholder="Enter delimiter (e.g., ,, ;, |)"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              )}
            </div>

            {/* Options */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Options:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
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
                onClick={splitText}
                disabled={!input.trim()}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 font-medium cursor-pointer transition-colors"
              >
                <FiScissors />
                Split Text
              </button>
              
              {result.length > 0 && (
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
            {result.length > 0 && (
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Split Result ({result.length} parts):
                </label>
                <div className="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <div className="max-h-64 overflow-y-auto">
                    {result.map((part, index) => (
                      <div key={index} className=" p-1 text-sm">
                        <span className="text-gray-500 text-xs mr-2">{index + 1}:</span>
                        <span className="font-mono">{part || '(empty)'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* How to Use Guide */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FiType className="text-indigo-600" />
              How to Use the Text Splitter
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Step-by-Step Guide</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Enter or paste the text you want to split in the input field</li>
                  <li>Choose your split mode:</li>
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li><strong>Custom:</strong> Split by your own delimiter (comma, semicolon, etc.)</li>
                    <li><strong>Lines:</strong> Split by line breaks</li>
                    <li><strong>Words:</strong> Split by spaces to get individual words</li>
                    <li><strong>Characters:</strong> Split into individual characters</li>
                  </ul>
                  <li>Configure options (remove empty parts, trim whitespace)</li>
                  <li>Click "Split Text" to generate the split result</li>
                  <li>Copy the result using the "Copy Result" button</li>
                </ol>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">💡 Pro Tips</h4>
                <ul className="list-disc list-inside space-y-1 text-blue-700">
                  <li>Use custom delimiters for CSV processing (comma, semicolon, pipe)</li>
                  <li>Line splitting is perfect for processing lists</li>
                  <li>Word splitting helps with text analysis and word counting</li>
                  <li>Character splitting is useful for cryptography and puzzles</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Examples */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Text Splitting Examples</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-green-700">Comma Splitting</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded border">
                    <div className="text-sm text-gray-600 mb-1">Original:</div>
                    <code className="text-sm">apple,banana,cherry,date</code>
                  </div>
                  <div className="bg-green-50 p-3 rounded border">
                    <div className="text-sm text-green-600 mb-1">Split Result:</div>
                    <div className="text-sm space-y-1">
                      <div>1: apple</div>
                      <div>2: banana</div>
                      <div>3: cherry</div>
                      <div>4: date</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Line Splitting</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded border">
                    <div className="text-sm text-gray-600 mb-1">Original:</div>
                    <code className="text-sm whitespace-pre">
  {`First line
Second line
Third line`}
</code>
                  </div>
                  <div className="bg-blue-50 p-3 rounded border">
                    <div className="text-sm text-blue-600 mb-1">Split Result:</div>
                    <div className="text-sm space-y-1">
                      <div>1: First line</div>
                      <div>2: Second line</div>
                      <div>3: Third line</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Tools */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Text Tools</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/tools/text-joiner" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiRefreshCw className="text-indigo-600" />
                  <h3 className="font-semibold">Text Joiner</h3>
                </div>
                <p className="text-sm text-gray-600">Join multiple text lines with custom separators</p>
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