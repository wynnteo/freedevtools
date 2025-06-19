'use client';
import { useState, useEffect } from 'react';
import { FiCopy, FiRefreshCw, FiMinimize, FiSearch, FiHome, FiChevronRight, FiDownload, FiType, FiGitMerge } from 'react-icons/fi';
import Link from 'next/link';

// Schema markup component
function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Find & Replace Tool",
    "url": "https://freedevtools.dev/tools/find-replace",
    "description": "Free online find and replace tool with regex support, case-sensitive search, and bulk operations for text processing.",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Regex pattern support",
      "Case-sensitive search",
      "Real-time match counting",
      "Bulk text replacement",
      "Download modified text",
      "Copy to clipboard",
      "Auto-replace mode"
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
      <span className="text-gray-900 font-medium">Find & Replace</span>
    </nav>
  );
}
// Escape regex special characters if not using regex
const escapeRegExp = (string: string, useRegex: boolean) => {
  return useRegex ? string : string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

// Main component
export default function FindReplaceClient() {
  const [text, setText] = useState('');
  const [find, setFind] = useState('');
  const [replace, setReplace] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  const [matches, setMatches] = useState<number>(0);
  const [autoReplace, setAutoReplace] = useState(true);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  // Perform find and replace
  const replaceText = () => {
   if (!find) return text;
  
    try {
        const flags = caseSensitive ? 'g' : 'gi';
        const regex = new RegExp(escapeRegExp(find, useRegex), flags);
        // Remove this line: setError('');
        return text.replace(regex, replace);
    } catch (error) {
        // Remove this line: setError('Invalid regex pattern');
        return text;
    }
 };

  // Count matches
  useEffect(() => {
    if (!find) {
        setMatches(0);
        setError(''); // Clear error when find is empty
        return;
    }

    try {
        const flags = caseSensitive ? 'g' : 'gi';
        const regex = new RegExp(escapeRegExp(find, useRegex), flags);
        const matchCount = (text.match(regex) || []).length;
        setMatches(matchCount);
        setError(''); // Only clear error on successful regex
    } catch (error) {
        setMatches(0);
        setError('Invalid regex pattern');
    }
  }, [text, find, caseSensitive, useRegex]);

  // Copy to clipboard
  const copyToClipboard = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      alert('Failed to copy to clipboard');
    }
  };

  // Download modified text
  const downloadText = () => {
    const modifiedText = replaceText();
    const blob = new Blob([modifiedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'modified-text.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetFields = () => {
    setText('');
    setFind('');
    setReplace('');
    setMatches(0);
    setError('');
  };

  const highlightMatches = (inputText: string) => {
    if (!find || error) return inputText;
    
    try {
        const flags = caseSensitive ? 'g' : 'gi';
        const regex = new RegExp(`(${escapeRegExp(find, useRegex)})`, flags);
        return inputText.split(regex).map((part, index) => {
        if (regex.test(part)) {
            return `<mark class="bg-yellow-300">${part}</mark>`;
        }
        return part;
        }).join('');
    } catch {
        return inputText;
    }
 };

  return (
    <>
      <SchemaMarkup />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Breadcrumb />
          
          {/* Hero Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <FiSearch className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Find & Replace Tool
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Search and replace text with advanced options including regex support, case-sensitive matching, 
              and real-time preview. Perfect for bulk text editing and content modification.
            </p>
          </div>

          {/* Main Tool */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            {/* Search & Replace Inputs */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Find Text:
                </label>
                <input
                  type="text"
                  value={find}
                  onChange={(e) => setFind(e.target.value)}
                  placeholder="Enter text to find..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Replace With:
                </label>
                <input
                  type="text"
                  value={replace}
                  onChange={(e) => setReplace(e.target.value)}
                  placeholder="Enter replacement text..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
                />
              </div>
            </div>

            {/* Options */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Search Options:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  onClick={() => setCaseSensitive(!caseSensitive)}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    caseSensitive
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  Case Sensitive
                </button>
                
                <button
                  onClick={() => setUseRegex(!useRegex)}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    useRegex
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  Use Regex
                </button>
                
                <button
                  onClick={() => setAutoReplace(!autoReplace)}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    autoReplace
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  Auto Replace
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

            {/* Status */}
            {(matches > 0 || error) && (
              <div className="mb-6 p-3 rounded-lg bg-blue-50 border border-blue-200">
                {error ? (
                  <div className="text-red-600 font-medium">❌ {error}</div>
                ) : (
                  <div className="text-blue-800 font-medium">
                    🔍 Found {matches} match{matches !== 1 ? 'es' : ''}
                  </div>
                )}
              </div>
            )}

            {/* Text Areas */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Original Text:
                </label>
                <div className="relative">
                    <div className="absolute inset-0 p-4 font-mono text-sm whitespace-pre-wrap overflow-hidden text-transparent pointer-events-none border border-gray-300 rounded-lg">
                    {find && !error ? (
                        <div dangerouslySetInnerHTML={{ __html: highlightMatches(text) }} />
                    ) : (
                        text
                    )}
                    </div>
                    {/* Actual textarea on top */}
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Paste your text here..."
                        className="relative w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-64 resize-none font-mono text-sm bg-transparent"
                    />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {autoReplace ? 'Modified Text (Live Preview):' : 'Modified Text:'}
                </label>
                <div className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 h-64 overflow-auto font-mono text-sm whitespace-pre-wrap">
                  {autoReplace ?  replaceText()  : text}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => copyToClipboard(replaceText())}
                disabled={!text}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 font-medium cursor-pointer transition-colors"
              >
                {copied ? <FiRefreshCw className="text-white" /> : <FiCopy />}
                {copied ? 'Copied!' : 'Copy Result'}
              </button>
              
              <button
                onClick={downloadText}
                disabled={!text}
                className="bg-gray-200 px-6 py-3 rounded-lg hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed flex items-center gap-2 font-medium cursor-pointer transition-colors"
              >
                <FiDownload />
                Download
              </button>
              
              <div className="ml-auto flex items-center gap-4 text-sm text-gray-600">
                <span>Characters: <strong>{text.length}</strong></span>
                <span>Matches: <strong>{matches}</strong></span>
              </div>
            </div>
          </div>

          {/* How to Use Guide */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FiSearch className="text-indigo-600" />
              How to Use the Find & Replace Tool
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Step-by-Step Guide</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Paste or type your text in the original text area</li>
                  <li>Enter the text you want to find in the "Find Text" field</li>
                  <li>Enter the replacement text in the "Replace With" field</li>
                  <li>Configure your search options:</li>
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li><strong>Case Sensitive:</strong> Match exact letter cases</li>
                    <li><strong>Use Regex:</strong> Enable regular expression patterns</li>
                    <li><strong>Auto Replace:</strong> Show live preview as you type</li>
                  </ul>
                  <li>Review the highlighted matches and modified text</li>
                  <li>Copy the result or download as a text file</li>
                </ol>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">💡 Pro Tips</h4>
                <ul className="list-disc list-inside space-y-1 text-blue-700">
                  <li>Use regex for powerful pattern matching (e.g., \d+ for numbers)</li>
                  <li>Enable case-sensitive for exact matches</li>
                  <li>Auto replace shows changes in real-time</li>
                  <li>Empty replacement field will delete found text</li>
                  <li>Use \n for line breaks in replacement text</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Examples */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Find & Replace Examples</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-green-700">Basic Text Replace</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded border">
                    <div className="text-sm text-gray-600 mb-1">Find:</div>
                    <code className="text-sm">old</code>
                  </div>
                  <div className="bg-blue-50 p-3 rounded border">
                    <div className="text-sm text-blue-600 mb-1">Replace:</div>
                    <code className="text-sm">new</code>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded border">
                    <div className="text-sm text-yellow-700 mb-1">Result:</div>
                    <code className="text-sm">
                      "The <span className="bg-red-200">old</span> car" → "The <span className="bg-green-200">new</span> car"
                    </code>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Regex Pattern Replace</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded border">
                    <div className="text-sm text-gray-600 mb-1">Find (Regex):</div>
                    <code className="text-sm">\d{3}-\d{3}-\d{4}</code>
                  </div>
                  <div className="bg-blue-50 p-3 rounded border">
                    <div className="text-sm text-blue-600 mb-1">Replace:</div>
                    <code className="text-sm">[PHONE NUMBER]</code>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded border">
                    <div className="text-sm text-yellow-700 mb-1">Result:</div>
                    <code className="text-sm">
                      Replaces phone numbers like 555-123-4567
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Tools */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Text Tools</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/tools/case-converter" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiType className="text-indigo-600" />
                  <h3 className="font-semibold">Case Converter</h3>
                </div>
                <p className="text-sm text-gray-600">Convert text between different cases</p>
              </Link>
              
              <Link href="/tools/diff-checker" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiMinimize className="text-indigo-600" />
                  <h3 className="font-semibold">Text Diff Checker</h3>
                </div>
                <p className="text-sm text-gray-600">Compare two texts and highlight differences</p>
              </Link>
              
              <Link href="/tools/regex-tester" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiGitMerge className="text-indigo-600" />
                  <h3 className="font-semibold">Regex Tester</h3>
                </div>
                <p className="text-sm text-gray-600">Test and debug regular expressions</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}