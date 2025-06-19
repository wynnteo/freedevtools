'use client';
import { useState } from 'react';
import { FiCopy, FiRefreshCw, FiType, FiHome, FiChevronRight, FiSettings, FiZap, FiShuffle, FiScissors } from 'react-icons/fi';
import Link from 'next/link';

// Schema markup component
function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Text Formatter",
    "url": "https://freedevtools.dev/tools/text-formatter",
    "description": "Free online text formatter tool to convert text case, remove extra spaces, format lines, and transform text with multiple formatting options.",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Convert text case (uppercase, lowercase, title case, sentence case)",
      "Remove extra spaces and line breaks",
      "Add line numbers",
      "Reverse text and words",
      "Remove duplicate lines",
      "Sort lines alphabetically",
      "Trim whitespace",
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
      <span className="text-gray-900 font-medium">Text Formatter</span>
    </nav>
  );
}

// Main component
export default function TextFormatterClient() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [formatOptions, setFormatOptions] = useState({
    caseFormat: 'none' as 'none' | 'uppercase' | 'lowercase' | 'titlecase' | 'sentencecase',
    removeExtraSpaces: false,
    removeExtraLines: false,
    trimWhitespace: false,
    addLineNumbers: false,
    reverseText: false,
    reverseWords: false,
    removeDuplicateLines: false,
    sortLines: false,
    sortAlphabetically: 'none' as 'none' | 'asc' | 'desc'
  });
  const [copied, setCopied] = useState(false);

  const formatText = () => {
    if (!input.trim()) {
      setResult('');
      return;
    }

    let processedText = input;

    // Case formatting
    switch (formatOptions.caseFormat) {
      case 'uppercase':
        processedText = processedText.toUpperCase();
        break;
      case 'lowercase':
        processedText = processedText.toLowerCase();
        break;
      case 'titlecase':
        processedText = processedText.replace(/\w\S*/g, (txt) => 
          txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
        break;
      case 'sentencecase':
        processedText = processedText.toLowerCase().replace(/(^\s*\w|[\.\!\?\:]\s*\w)/gm, (txt) => 
          txt.toUpperCase()
        );
        break;
    }

    // Remove extra spaces
    if (formatOptions.removeExtraSpaces) {
      processedText = processedText.replace(/\s+/g, ' ');
    }

    // Remove extra line breaks
    if (formatOptions.removeExtraLines) {
      processedText = processedText.replace(/\n\s*\n/g, '\n');
    }

    // Trim whitespace
    if (formatOptions.trimWhitespace) {
      processedText = processedText.split('\n').map(line => line.trim()).join('\n');
    }

    // Remove duplicate lines
    if (formatOptions.removeDuplicateLines) {
      const lines = processedText.split('\n');
      const uniqueLines = [...new Set(lines)];
      processedText = uniqueLines.join('\n');
    }

    // Sort lines
    if (formatOptions.sortAlphabetically !== 'none') {
      const lines = processedText.split('\n');
      const sortedLines = lines.sort((a, b) => {
        if (formatOptions.sortAlphabetically === 'asc') {
          return a.localeCompare(b);
        } else {
          return b.localeCompare(a);
        }
      });
      processedText = sortedLines.join('\n');
    }

    // Reverse text
    if (formatOptions.reverseText) {
      processedText = processedText.split('').reverse().join('');
    }

    // Reverse words
    if (formatOptions.reverseWords && !formatOptions.reverseText) {
      processedText = processedText.split(/(\s+)/).reverse().join('');
    }

    // Add line numbers
    if (formatOptions.addLineNumbers) {
      const lines = processedText.split('\n');
      const numberedLines = lines.map((line, index) => `${index + 1}. ${line}`);
      processedText = numberedLines.join('\n');
    }

    setResult(processedText);
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

  const resetOptions = () => {
    setFormatOptions({
      caseFormat: 'none',
      removeExtraSpaces: false,
      removeExtraLines: false,
      trimWhitespace: false,
      addLineNumbers: false,
      reverseText: false,
      reverseWords: false,
      removeDuplicateLines: false,
      sortLines: false,
      sortAlphabetically: 'none'
    });
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
              <FiShuffle className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Text Formatter Tool
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Format and transform your text with multiple options. Convert case, remove extra spaces, 
              add line numbers, sort lines, and apply various text transformations instantly.
            </p>
          </div>

          {/* Main Tool */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter text to format:
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type or paste your text here..."
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-32 resize-none"
              />
            </div>

            {/* Case Formatting Options */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Case Formatting:</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <button
                  onClick={() => setFormatOptions(prev => ({...prev, caseFormat: 'none'}))}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    formatOptions.caseFormat === 'none'
                      ? 'bg-gray-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  No Change
                </button>
                
                <button
                  onClick={() => setFormatOptions(prev => ({...prev, caseFormat: 'uppercase'}))}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    formatOptions.caseFormat === 'uppercase'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  UPPERCASE
                </button>
                
                <button
                  onClick={() => setFormatOptions(prev => ({...prev, caseFormat: 'lowercase'}))}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    formatOptions.caseFormat === 'lowercase'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  lowercase
                </button>
                
                <button
                  onClick={() => setFormatOptions(prev => ({...prev, caseFormat: 'titlecase'}))}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    formatOptions.caseFormat === 'titlecase'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  Title Case
                </button>
                
                <button
                  onClick={() => setFormatOptions(prev => ({...prev, caseFormat: 'sentencecase'}))}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    formatOptions.caseFormat === 'sentencecase'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  Sentence case
                </button>
              </div>
            </div>

            {/* Cleaning Options */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Text Cleaning:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  onClick={() => setFormatOptions(prev => ({...prev, removeExtraSpaces: !prev.removeExtraSpaces}))}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    formatOptions.removeExtraSpaces
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  Remove Extra Spaces
                </button>
                
                <button
                  onClick={() => setFormatOptions(prev => ({...prev, removeExtraLines: !prev.removeExtraLines}))}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    formatOptions.removeExtraLines
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  Remove Extra Lines
                </button>
                
                <button
                  onClick={() => setFormatOptions(prev => ({...prev, trimWhitespace: !prev.trimWhitespace}))}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    formatOptions.trimWhitespace
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  Trim Whitespace
                </button>
                
                <button
                  onClick={() => setFormatOptions(prev => ({...prev, removeDuplicateLines: !prev.removeDuplicateLines}))}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    formatOptions.removeDuplicateLines
                      ? 'bg-yellow-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  Remove Duplicates
                </button>
              </div>
            </div>

            {/* Transform Options */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Text Transformations:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  onClick={() => setFormatOptions(prev => ({...prev, addLineNumbers: !prev.addLineNumbers}))}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    formatOptions.addLineNumbers
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  Add Line Numbers
                </button>
                
                <button
                  onClick={() => setFormatOptions(prev => ({...prev, reverseText: !prev.reverseText}))}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    formatOptions.reverseText
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  Reverse Text
                </button>
                
                <button
                  onClick={() => setFormatOptions(prev => ({...prev, reverseWords: !prev.reverseWords}))}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    formatOptions.reverseWords
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  Reverse Words
                </button>
                
                <div className="relative">
                  <select
                    value={formatOptions.sortAlphabetically}
                    onChange={(e) => setFormatOptions(prev => ({...prev, sortAlphabetically: e.target.value as 'none' | 'asc' | 'desc'}))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-sm font-medium"
                  >
                    <option value="none">Don't Sort</option>
                    <option value="asc">Sort A-Z</option>
                    <option value="desc">Sort Z-A</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={formatText}
                disabled={!input.trim()}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 font-medium cursor-pointer transition-colors"
              >
                <FiZap />
                Format Text
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
              
              <button
                onClick={resetFields}
                className="bg-red-100 hover:bg-red-200 text-red-600 px-6 py-3 rounded-lg flex items-center gap-2 font-medium cursor-pointer transition-colors"
              >
                <FiRefreshCw />
                Reset Text
              </button>
              
              <button
                onClick={resetOptions}
                className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-6 py-3 rounded-lg flex items-center gap-2 font-medium cursor-pointer transition-colors"
              >
                <FiSettings />
                Reset Options
              </button>
            </div>

            {/* Result */}
            {result && (
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Formatted Result:
                </label>
                <div className="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <div className="max-h-64 overflow-y-auto">
                    <pre className="p-3 bg-white rounded border text-sm font-mono whitespace-pre-wrap">
                      {result}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* How to Use Guide */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FiType className="text-indigo-600" />
              How to Use the Text Formatter
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Step-by-Step Guide</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Enter or paste the text you want to format in the input field</li>
                  <li>Choose your case formatting option:</li>
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li><strong>UPPERCASE:</strong> Converts all text to capital letters</li>
                    <li><strong>lowercase:</strong> Converts all text to small letters</li>
                    <li><strong>Title Case:</strong> Capitalizes the first letter of each word</li>
                    <li><strong>Sentence case:</strong> Capitalizes the first letter of each sentence</li>
                  </ul>
                  <li>Select cleaning options to remove extra spaces, lines, or duplicates</li>
                  <li>Apply transformations like line numbers, reversing, or sorting</li>
                  <li>Click "Format Text" to apply all selected formatting</li>
                  <li>Copy the result using the "Copy Result" button</li>
                </ol>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">💡 Pro Tips</h4>
                <ul className="list-disc list-inside space-y-1 text-blue-700">
                  <li>Use "Remove Extra Spaces" to clean up messy copy-pasted text</li>
                  <li>Combine "Trim Whitespace" with "Remove Extra Lines" for clean formatting</li>
                  <li>"Remove Duplicates" is perfect for cleaning up lists</li>
                  <li>Use "Add Line Numbers" for creating numbered lists or code snippets</li>
                  <li>Sort options help organize lists alphabetically</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Examples */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Text Formatting Examples</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-green-700">Case Conversion</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded border">
                    <div className="text-sm text-gray-600 mb-1">Original:</div>
                    <code className="text-sm">hello WORLD from TEXT formatter</code>
                  </div>
                  <div className="bg-green-50 p-3 rounded border">
                    <div className="text-sm text-green-600 mb-1">Title Case Result:</div>
                    <code className="text-sm">Hello World From Text Formatter</code>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Text Cleaning</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded border">
                    <div className="text-sm text-gray-600 mb-1">Original (messy):</div>
                    <code className="text-sm whitespace-pre">  apple  

  banana  
  apple  
  cherry   </code>
                  </div>
                  <div className="bg-blue-50 p-3 rounded border">
                    <div className="text-sm text-blue-600 mb-1">Cleaned Result:</div>
                    <code className="text-sm whitespace-pre">apple
banana
cherry</code>
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
              
              <Link href="/tools/text-joiner" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiRefreshCw className="text-indigo-600" />
                  <h3 className="font-semibold">Text Joiner</h3>
                </div>
                <p className="text-sm text-gray-600">Join multiple text lines with custom separators</p>
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