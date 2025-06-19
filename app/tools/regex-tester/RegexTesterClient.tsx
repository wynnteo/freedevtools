'use client';
import { useState, useEffect } from 'react';
import { FiCopy, FiRefreshCw, FiGitMerge, FiHome, FiChevronRight, FiMinimize, FiLock, FiCode, FiCheckCircle, FiAlertCircle, FiSearch } from 'react-icons/fi';
import Link from 'next/link';

// Schema markup component
function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Regex Tester",
    "url": "https://freedevtools.dev/tools/regex-tester",
    "description": "Free online regex tester tool to test and debug regular expressions with real-time matching and explanations.",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Real-time regex testing",
      "Multiple flag support",
      "Common regex patterns",
      "Match highlighting",
      "Match details and groups",
      "Pattern explanation",
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
      <span className="text-gray-900 font-medium">Regex Tester</span>
    </nav>
  );
}

const COMMON_REGEX = [
  { name: 'Email', pattern: '[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}', description: 'Matches email addresses' },
  { name: 'URL', pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)', description: 'Matches HTTP/HTTPS URLs' },
  { name: 'Hex Color', pattern: '^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$', description: 'Matches hex color codes' },
  { name: 'Date (YYYY-MM-DD)', pattern: '\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])', description: 'Matches ISO date format' },
  { name: 'IP Address', pattern: '^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$', description: 'Matches IPv4 addresses' },
  { name: 'Phone Number', pattern: '^(\\+\\d{1,3}[- ]?)?\\d{10}$', description: 'Matches phone numbers' },
  { name: 'Credit Card', pattern: '^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9]{2})[0-9]{12})$', description: 'Matches major credit card formats' },
  { name: 'Username', pattern: '^[a-zA-Z0-9_]{3,16}$', description: 'Matches usernames (3-16 chars)' },
];

// Main component
export default function RegexTesterClient() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('gi');
  const [testString, setTestString] = useState('');
  const [matches, setMatches] = useState<RegExpMatchArray[]>([]);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    testRegex();
  }, [pattern, flags, testString]);

  const testRegex = () => {
    if (!pattern) {
      setMatches([]);
      setError('');
      return;
    }

    try {
      setError('');
      const regex = new RegExp(pattern, flags);
      const allMatches = [...testString.matchAll(regex)];
      setMatches(allMatches);
    } catch (e) {
      setError('Invalid regular expression');
      setMatches([]);
    }
  };

  const highlightText = () => {
    if (!pattern || !testString || error) {
      return testString;
    }

    try {
      const regex = new RegExp(pattern, flags);
      let lastIndex = 0;
      const parts = [];
      
      matches.forEach((match, i) => {
        if (match.index !== undefined) {
          // Add text before match
          parts.push(testString.slice(lastIndex, match.index));
          // Add highlighted match
          parts.push(
            <mark key={i} className="bg-yellow-200 px-1 rounded">
              {match[0]}
            </mark>
          );
          lastIndex = match.index + match[0].length;
        }
      });
      
      // Add remaining text
      parts.push(testString.slice(lastIndex));
      
      return parts;
    } catch (e) {
      return testString;
    }
  };

  const copyPattern = async () => {
    try {
      await navigator.clipboard.writeText(pattern);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      alert('Failed to copy to clipboard');
    }
  };

  const resetFields = () => {
    setPattern('');
    setTestString('');
    setFlags('gi');
    setMatches([]);
    setError('');
  };

  const loadCommonPattern = (commonPattern: typeof COMMON_REGEX[0]) => {
    setPattern(commonPattern.pattern);
  };

  const toggleFlag = (flag: string) => {
    setFlags(prevFlags => 
      prevFlags.includes(flag) 
        ? prevFlags.replace(flag, '') 
        : prevFlags + flag
    );
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
              <FiGitMerge className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Regex Tester & Debugger
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Test and debug regular expressions with real-time matching, explanations, and common patterns. 
              Perfect for developers, data analysts, and anyone working with pattern matching.
            </p>
          </div>

          {/* Main Tool */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column - Pattern Input */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Regular Expression Pattern:
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={pattern}
                      onChange={(e) => setPattern(e.target.value)}
                      placeholder="Enter regex pattern (e.g., \d+)"
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono"
                    />
                    {pattern && (
                      <button
                        onClick={copyPattern}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600"
                        title="Copy pattern"
                      >
                        {copied ? <FiCheckCircle className="text-green-600" /> : <FiCopy />}
                      </button>
                    )}
                  </div>
                  {error && (
                    <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                      <FiAlertCircle className="w-4 h-4" />
                      {error}
                    </div>
                  )}
                </div>

                {/* Flags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Regex Flags:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { flag: 'g', label: 'Global', desc: 'Find all matches' },
                      { flag: 'i', label: 'Ignore Case', desc: 'Case insensitive' },
                      { flag: 'm', label: 'Multiline', desc: '^$ match line breaks' },
                      { flag: 's', label: 'Single Line', desc: '. matches newlines' },
                    ].map(({ flag, label, desc }) => (
                      <button
                        key={flag}
                        onClick={() => toggleFlag(flag)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          flags.includes(flag)
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                        title={desc}
                      >
                        {flag.toUpperCase()} - {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Common Patterns */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Common Patterns:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {COMMON_REGEX.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => loadCommonPattern(item)}
                        className="text-left p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        title={item.description}
                      >
                        <div className="font-medium text-sm">{item.name}</div>
                        <div className="text-xs text-gray-600 font-mono truncate">
                          {item.pattern.slice(0, 30)}...
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={resetFields}
                    className="bg-gray-200 px-6 py-3 rounded-lg hover:bg-gray-300 flex items-center gap-2 font-medium transition-colors"
                  >
                    <FiRefreshCw />
                    Reset All
                  </button>
                </div>
              </div>

              {/* Right Column - Test Input */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Test String:
                  </label>
                  <textarea
                    value={testString}
                    onChange={(e) => setTestString(e.target.value)}
                    placeholder="Enter text to test your regex pattern against..."
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-48 resize-none font-mono"
                  />
                </div>

                {/* Results */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      Matches Found: 
                      <span className={`ml-2 px-2 py-1 rounded text-xs ${
                        matches.length > 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {matches.length}
                      </span>
                    </label>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 min-h-48 overflow-auto">
                    <div className="font-mono whitespace-pre-wrap break-words">
                      {testString ? highlightText() : (
                        <span className="text-gray-400 italic">
                          Enter test string above to see matches highlighted here...
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Match Details */}
            {matches.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FiSearch className="text-indigo-600" />
                  Match Details
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-2 text-left">#</th>
                        <th className="px-4 py-2 text-left">Match</th>
                        <th className="px-4 py-2 text-left">Position</th>
                        <th className="px-4 py-2 text-left">Length</th>
                        <th className="px-4 py-2 text-left">Groups</th>
                      </tr>
                    </thead>
                    <tbody>
                      {matches.map((match, index) => (
                        <tr key={index} className="border-t">
                          <td className="px-4 py-2 font-mono">{index + 1}</td>
                          <td className="px-4 py-2 font-mono bg-yellow-50">
                            "{match[0]}"
                          </td>
                          <td className="px-4 py-2 font-mono">{match.index}</td>
                          <td className="px-4 py-2 font-mono">{match[0].length}</td>
                          <td className="px-4 py-2 font-mono">
                            {match.length > 1 ? match.slice(1).join(', ') : 'None'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* How to Use Guide */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FiCode className="text-indigo-600" />
              How to Use the Regex Tester
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Step-by-Step Guide</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Enter your regular expression pattern in the pattern field</li>
                  <li>Select appropriate flags (Global, Ignore Case, Multiline, Single Line)</li>
                  <li>Input test text in the test string area</li>
                  <li>See real-time highlighting of matches in the results area</li>
                  <li>Review detailed match information in the table below</li>
                  <li>Use common patterns as starting points for your own regex</li>
                </ol>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">💡 Pro Tips</h4>
                  <ul className="list-disc list-inside space-y-1 text-blue-700">
                    <li>Use the global flag (g) to find all matches</li>
                    <li>Case insensitive flag (i) ignores upper/lowercase</li>
                    <li>Test with edge cases and boundary conditions</li>
                    <li>Use capturing groups () to extract specific parts</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Common Gotchas</h4>
                  <ul className="list-disc list-inside space-y-1 text-yellow-700">
                    <li>Escape special characters with backslashes</li>
                    <li>Use double backslashes in strings: \\d instead of \d</li>
                    <li>Test multiline patterns with actual line breaks</li>
                    <li>Remember that . doesn't match newlines by default</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Examples */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Regex Examples</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-green-700">Email Validation</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded border">
                    <div className="text-sm text-gray-600 mb-1">Pattern:</div>
                    <code className="text-sm font-mono">{"[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}"}</code>
                  </div>
                  <div className="bg-green-50 p-3 rounded border">
                    <div className="text-sm text-green-600 mb-1">Test String:</div>
                    <code className="text-sm">Contact us at support@example.com or admin@test.org</code>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Phone Numbers</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded border">
                    <div className="text-sm text-gray-600 mb-1">Pattern:</div>
                    <code className="text-sm font-mono">{"^(\\+\\d{1,3}[- ]?)?\\d{10}$"}</code>
                  </div>
                  <div className="bg-blue-50 p-3 rounded border">
                    <div className="text-sm text-blue-600 mb-1">Test String:</div>
                    <div className="text-sm font-mono">
                        <div>+1-555-123-4567</div>
                        <div>555-987-6543</div>
                        <div>+44 20 7946 0958</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Tools */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Developer Tools</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/tools/json-formatter" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiCode className="text-indigo-600" />
                  <h3 className="font-semibold">JSON Formatter</h3>
                </div>
                <p className="text-sm text-gray-600">Format and validate JSON data with syntax highlighting</p>
              </Link>
              
              <Link href="/tools/diff-checker" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiMinimize className="text-indigo-600" />
                  <h3 className="font-semibold">Text Diff Checker</h3>
                </div>
                <p className="text-sm text-gray-600">Compare texts and highlight differences line by line</p>
              </Link>
              
              <Link href="/tools/base64-tool" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiLock className="text-indigo-600" />
                  <h3 className="font-semibold">Base64 Encoder</h3>
                </div>
                <p className="text-sm text-gray-600">Encode and decode Base64 strings and files</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}