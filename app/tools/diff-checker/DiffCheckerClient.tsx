'use client';
import { useState, useEffect } from 'react';
import { FiCopy, FiMinimize, FiRefreshCw, FiGitMerge, FiHome, FiChevronRight, FiEye, FiColumns, FiCode, FiType, FiAlignLeft, FiLock } from 'react-icons/fi';
import Link from 'next/link';

// Simple diff function to replace external dependency
function diffChars(oldStr: string, newStr: string) {
  const diffs = [];
  let i = 0, j = 0;
  
  while (i < oldStr.length || j < newStr.length) {
    if (i >= oldStr.length) {
      // Remaining new characters are additions
      diffs.push({ value: newStr.slice(j), added: true });
      break;
    } else if (j >= newStr.length) {
      // Remaining old characters are deletions
      diffs.push({ value: oldStr.slice(i), removed: true });
      break;
    } else if (oldStr[i] === newStr[j]) {
      // Characters match, find the end of matching sequence
      let start = i;
      while (i < oldStr.length && j < newStr.length && oldStr[i] === newStr[j]) {
        i++;
        j++;
      }
      diffs.push({ value: oldStr.slice(start, i) });
    } else {
      // Characters don't match, find next matching point
      let oldEnd = i + 1;
      let newEnd = j + 1;
      
      // Simple approach: take one character from each as diff
      diffs.push({ value: oldStr[i], removed: true });
      diffs.push({ value: newStr[j], added: true });
      i++;
      j++;
    }
  }
  
  return diffs;
}

function diffLines(oldStr: string, newStr: string) {
  const oldLines = oldStr.split('\n');
  const newLines = newStr.split('\n');
  const diffs = [];
  
  let i = 0, j = 0;
  
  while (i < oldLines.length || j < newLines.length) {
    if (i >= oldLines.length) {
      // Remaining new lines are additions
      for (let k = j; k < newLines.length; k++) {
        diffs.push({ value: newLines[k] + '\n', added: true });
      }
      break;
    } else if (j >= newLines.length) {
      // Remaining old lines are deletions
      for (let k = i; k < oldLines.length; k++) {
        diffs.push({ value: oldLines[k] + '\n', removed: true });
      }
      break;
    } else if (oldLines[i] === newLines[j]) {
      // Lines match
      diffs.push({ value: oldLines[i] + '\n' });
      i++;
      j++;
    } else {
      // Lines don't match
      diffs.push({ value: oldLines[i] + '\n', removed: true });
      diffs.push({ value: newLines[j] + '\n', added: true });
      i++;
      j++;
    }
  }
  
  return diffs;
}

function diffWords(oldStr: string, newStr: string) {
  const oldWords = oldStr.split(/(\s+)/);
  const newWords = newStr.split(/(\s+)/);
  const diffs = [];
  
  let i = 0, j = 0;
  
  while (i < oldWords.length || j < newWords.length) {
    if (i >= oldWords.length) {
      // Remaining new words are additions
      for (let k = j; k < newWords.length; k++) {
        diffs.push({ value: newWords[k], added: true });
      }
      break;
    } else if (j >= newWords.length) {
      // Remaining old words are deletions
      for (let k = i; k < oldWords.length; k++) {
        diffs.push({ value: oldWords[k], removed: true });
      }
      break;
    } else if (oldWords[i] === newWords[j]) {
      // Words match
      diffs.push({ value: oldWords[i] });
      i++;
      j++;
    } else {
      // Words don't match
      diffs.push({ value: oldWords[i], removed: true });
      diffs.push({ value: newWords[j], added: true });
      i++;
      j++;
    }
  }
  
  return diffs;
}

// Schema markup component
function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Text Diff Checker",
    "url": "https://freedevtools.dev/tools/diff-checker",
    "description": "Free online text diff checker tool to compare two texts and highlight differences line by line or character by character.",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Character-level comparison",
      "Line-level comparison",
      "Side-by-side view",
      "Inline view",
      "Real-time comparison",
      "Change statistics",
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
      <span className="text-gray-900 font-medium">Text Diff Checker</span>
    </nav>
  );
}

// Main component
export default function DiffCheckerClient() {
  const [leftText, setLeftText] = useState('');
  const [rightText, setRightText] = useState('');
  const [diffs, setDiffs] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<'inline' | 'side-by-side'>('inline');
  const [diffMethod, setDiffMethod] = useState<'chars' | 'lines' | 'words'>('words');
  const [autoCheck, setAutoCheck] = useState(true);
  const [copied, setCopied] = useState(false);

  // Real-time comparison with debounce
  useEffect(() => {
    if (!autoCheck || (!leftText && !rightText)) return;
    const timer = setTimeout(() => compareTexts(), 300);
    return () => clearTimeout(timer);
  }, [leftText, rightText, diffMethod, autoCheck]);

  const compareTexts = () => {
    if (!leftText && !rightText) {
        setDiffs([]);
        return;
    }
    
    let diffFunction;
    switch (diffMethod) {
        case 'chars':
        diffFunction = diffChars;
        break;
        case 'lines':
        diffFunction = diffLines;
        break;
        case 'words':
        diffFunction = diffWords;
        break;
        default:
        diffFunction = diffWords;
    }
    
    const results = diffFunction(leftText, rightText);
    setDiffs(results);
    };

  const swapTexts = () => {
    const temp = leftText;
    setLeftText(rightText);
    setRightText(temp);
  };

  const resetFields = () => {
    setLeftText('');
    setRightText('');
    setDiffs([]);
  };

  const countChanges = () => {
    return diffs.reduce((acc, diff) => ({
      added: acc.added + (diff.added ? 1 : 0),
      removed: acc.removed + (diff.removed ? 1 : 0)
    }), { added: 0, removed: 0 });
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      alert('Failed to copy to clipboard');
    }
  };

  const copyDiffResult = () => {
    const diffText = diffs.map(diff => {
      if (diff.added) return `+ ${diff.value}`;
      if (diff.removed) return `- ${diff.value}`;
      return `  ${diff.value}`;
    }).join('');
    copyToClipboard(diffText);
  };

  const changes = countChanges();

  return (
    <>
      <SchemaMarkup />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Breadcrumb />
          
          {/* Hero Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <FiMinimize className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Text Diff Checker Tool
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Compare two texts and highlight differences instantly. Perfect for comparing code changes, 
              document revisions, and content updates with character or line-level precision.
            </p>
          </div>

          {/* Main Tool */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            {/* Options */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Comparison Options:</h3>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                <button
                    onClick={() => setDiffMethod('words')}
                    className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    diffMethod === 'words'
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                >
                    <FiType className="w-4 h-4 mx-auto mb-1" />
                    Word Level
                </button>
                
                <button
                    onClick={() => setDiffMethod('chars')}
                    className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    diffMethod === 'chars'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                >
                    <FiType className="w-4 h-4 mx-auto mb-1" />
                    Character Level
                </button>
                
                <button
                    onClick={() => setDiffMethod('lines')}
                    className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    diffMethod === 'lines'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                >
                    <FiAlignLeft className="w-4 h-4 mx-auto mb-1" />
                    Line Level
                </button>
                
                <button
                  onClick={() => setViewMode(viewMode === 'inline' ? 'side-by-side' : 'inline')}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    viewMode === 'side-by-side'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {viewMode === 'inline' ? <FiColumns className="w-4 h-4 mx-auto mb-1" /> : <FiEye className="w-4 h-4 mx-auto mb-1" />}
                  {viewMode === 'inline' ? 'Side View' : 'Inline View'}
                </button>
                
                <button
                  onClick={() => setAutoCheck(!autoCheck)}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    autoCheck
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <FiRefreshCw className="w-4 h-4 mx-auto mb-1" />
                  Auto Compare
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

            {/* Text Areas */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Original Text:
                </label>
                <textarea
                  value={leftText}
                  onChange={(e) => setLeftText(e.target.value)}
                  placeholder="Paste original text here..."
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-48 resize-none font-mono text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Modified Text:
                </label>
                <textarea
                  value={rightText}
                  onChange={(e) => setRightText(e.target.value)}
                  placeholder="Paste modified text here..."
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-48 resize-none font-mono text-sm"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={compareTexts}
                disabled={autoCheck || (!leftText && !rightText)}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 font-medium cursor-pointer transition-colors"
              >
                <FiGitMerge />
                {autoCheck ? 'Auto Comparing...' : 'Compare Texts'}
              </button>
              
              <button
                onClick={swapTexts}
                disabled={!leftText && !rightText}
                className="bg-gray-200 px-6 py-3 rounded-lg hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed flex items-center gap-2 font-medium cursor-pointer transition-colors"
              >
                <FiRefreshCw />
                Swap Texts
              </button>
              
              {diffs.length > 0 && (
                <button
                  onClick={copyDiffResult}
                  className="bg-gray-200 px-6 py-3 rounded-lg hover:bg-gray-300 flex items-center gap-2 font-medium cursor-pointer transition-colors"
                >
                  {copied ? <FiRefreshCw className="text-green-600" /> : <FiCopy />}
                  {copied ? 'Copied!' : 'Copy Diff'}
                </button>
              )}
            </div>

            {/* Results */}
            {diffs.length > 0 && (
              <div className="mt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    Changes Found: {changes.added} additions, {changes.removed} deletions
                  </h3>
                </div>

                {viewMode === 'inline' ? (
                  <div className="border rounded-lg p-4 bg-gray-50 font-mono text-sm whitespace-pre-wrap overflow-x-auto">
                    {diffs.map((diff, i) => (
                      <span
                        key={i}
                        className={
                          diff.added ? 'bg-green-200 text-green-800 px-1 rounded' : 
                          diff.removed ? 'bg-red-200 text-red-800 px-1 rounded line-through' : ''
                        }
                      >
                        {diff.value}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4 bg-red-50">
                      <h4 className="font-medium text-red-800 mb-2">Removed</h4>
                      <div className="font-mono text-sm whitespace-pre-wrap">
                        {diffs.filter(d => d.removed).map((d, i) => (
                          <div key={i} className="bg-red-100 text-red-800 p-1 mb-1 rounded">- {d.value}</div>
                        ))}
                        {diffs.filter(d => d.removed).length === 0 && (
                          <div className="text-gray-500 italic">No deletions</div>
                        )}
                      </div>
                    </div>
                    <div className="border rounded-lg p-4 bg-green-50">
                      <h4 className="font-medium text-green-800 mb-2">Added</h4>
                      <div className="font-mono text-sm whitespace-pre-wrap">
                        {diffs.filter(d => d.added).map((d, i) => (
                          <div key={i} className="bg-green-100 text-green-800 p-1 mb-1 rounded">+ {d.value}</div>
                        ))}
                        {diffs.filter(d => d.added).length === 0 && (
                          <div className="text-gray-500 italic">No additions</div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* How to Use Guide */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FiGitMerge className="text-indigo-600" />
              How to Use the Text Diff Checker
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Step-by-Step Guide</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Paste or type your original text in the left text area</li>
                  <li>Paste or type your modified text in the right text area</li>
                  <li>Choose your comparison options:</li>
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li><strong>Word Level:</strong> Compare word by word (default)</li>
                    <li><strong>Character Level:</strong> Compare character by character</li>
                    <li><strong>Line Level:</strong> Compare line by line for better readability</li>
                    <li><strong>View Mode:</strong> Switch between inline and side-by-side views</li>
                    <li><strong>Auto Compare:</strong> Enable real-time comparison as you type</li>
                  </ul>
                  <li>Click "Compare Texts" if auto-compare is disabled</li>
                  <li>Review the highlighted differences in the results section</li>
                  <li>Copy the diff result using the "Copy Diff" button</li>
                </ol>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">💡 Pro Tips</h4>
                <ul className="list-disc list-inside space-y-1 text-blue-700">
                  <li>Use character-level comparison for small text changes</li>
                  <li>Use word-level comparison for word by word changes</li>
                  <li>Use line-level comparison for code or structured documents</li>
                  <li>Side-by-side view is better for reviewing large changes</li>
                  <li>Green highlighting shows additions, red shows deletions</li>
                  <li>Use the swap button to quickly reverse the comparison</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Examples */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Text Comparison Examples</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-green-700">Word-Level Diff</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded border">
                    <div className="text-sm text-gray-600 mb-1">Original:</div>
                    <code className="text-sm">Hello World!</code>
                  </div>
                  <div className="bg-blue-50 p-3 rounded border">
                    <div className="text-sm text-blue-600 mb-1">Modified:</div>
                    <code className="text-sm">Hi Universe!</code>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded border">
                    <div className="text-sm text-yellow-700 mb-1">Result:</div>
                    <code className="text-sm">
                      <span className="bg-red-200 text-red-800">Hello</span>{' '}
                      <span className="bg-green-200 text-green-800">Hi</span>{' '}
                      <span className="bg-red-200 text-red-800">World</span>
                      <span className="bg-green-200 text-green-800">Universe</span>!
                    </code>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Line-Level Diff</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded border">
                    <div className="text-sm text-gray-600 mb-1">Original:</div>
                    <code className="text-sm whitespace-pre">
                      {`Line 1
Line 2
Line 3`}
                    </code>
                  </div>
                  <div className="bg-blue-50 p-3 rounded border">
                    <div className="text-sm text-blue-600 mb-1">Modified:</div>
                    <code className="text-sm whitespace-pre">
                      {`Line 1
Line 2 Modified
Line 4`}
                    </code>
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
                <p className="text-sm text-gray-600">Format, validate, and beautify JSON data</p>
              </Link>
              
              <Link href="/tools/regex-tester" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiGitMerge className="text-indigo-600" />
                  <h3 className="font-semibold">Regex Tester</h3>
                </div>
                <p className="text-sm text-gray-600">Test and debug regular expressions</p>
              </Link>
              
              <Link href="/tools/base64-tool" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiLock className="text-indigo-600" />
                  <h3 className="font-semibold">Base64 Tool</h3>
                </div>
                <p className="text-sm text-gray-600">Encode and decode Base64 strings</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}