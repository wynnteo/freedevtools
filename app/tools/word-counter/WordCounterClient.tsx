'use client';
import { useState } from 'react';
import { FiCopy, FiRefreshCw, FiHash, FiHome, FiChevronRight, FiType, FiAlignLeft, FiArrowRight, FiSearch, FiBarChart } from 'react-icons/fi';
import Link from 'next/link';

// Schema markup component
function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Word Counter",
    "url": "https://freedevtools.dev/tools/word-counter",
    "description": "Free online word counter tool to count words, characters, paragraphs, and calculate reading time with detailed text analysis.",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Count words and characters",
      "Analyze sentences and paragraphs",
      "Calculate reading time",
      "Real-time text analysis",
      "Character count with/without spaces",
      "Longest and shortest sentence detection"
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
      <span className="text-gray-900 font-medium">Word Counter</span>
    </nav>
  );
}

// Main component
export default function WordCounterClient() {
  const [text, setText] = useState('');
  const [options, setOptions] = useState({
    includePunctuation: true,
    includeWhitespace: true,
    autoUpdate: true,
  });
  const [copied, setCopied] = useState(false);

  // Word and character count
  const countWords = () => {
    if (!text.trim()) return 0;
    const words = text.trim().split(/\s+/).filter(Boolean);
    return words.length;
  };

  const countCharacters = () => {
    let characters = text;
    if (!options.includeWhitespace) {
      characters = characters.replace(/\s/g, '');
    }
    if (!options.includePunctuation) {
      characters = characters.replace(/[^\w\s]/g, '');
    }
    return characters.length;
  };

  const countCharactersWithSpaces = () => {
    return text.length;
  };

  // Sentence analysis
  const analyzeSentences = () => {
    if (!text.trim()) {
      return {
        count: 0,
        longest: 0,
        shortest: 0,
        longestSentence: '',
        shortestSentence: ''
      };
    }

    const sentences = text.split(/[.!?]+/).filter(s => s.trim());
    if (sentences.length === 0) {
      return {
        count: 0,
        longest: 0,
        shortest: 0,
        longestSentence: '',
        shortestSentence: ''
      };
    }

    const sentenceLengths = sentences.map(s => s.trim().split(/\s+/).filter(Boolean).length);
    
    return {
      count: sentences.length,
      longest: Math.max(...sentenceLengths),
      shortest: Math.min(...sentenceLengths),
      longestSentence: sentences[sentenceLengths.indexOf(Math.max(...sentenceLengths))]?.trim() || '',
      shortestSentence: sentences[sentenceLengths.indexOf(Math.min(...sentenceLengths))]?.trim() || ''
    };
  };

  // Paragraph analysis
  const analyzeParagraphs = () => {
    if (!text.trim()) {
      return {
        count: 0,
        longest: 0,
        shortest: 0,
      };
    }

    const paragraphs = text.split(/\n+/).filter(p => p.trim());
    if (paragraphs.length === 0) {
      return {
        count: 0,
        longest: 0,
        shortest: 0,
      };
    }

    const paragraphLengths = paragraphs.map(p => p.trim().split(/\s+/).filter(Boolean).length);
    
    return {
      count: paragraphs.length,
      longest: Math.max(...paragraphLengths),
      shortest: Math.min(...paragraphLengths),
    };
  };

  // Reading time calculation
  const calculateReadingTime = () => {
    const wordsPerMinute = 200;
    const words = countWords();
    return Math.ceil(words / wordsPerMinute) || 0;
  };

  const copyStats = async () => {
    const stats = `Text Analysis Results:
Words: ${countWords()}
Characters (with spaces): ${countCharactersWithSpaces()}
Characters (without spaces): ${countCharacters()}
Sentences: ${analyzeSentences().count}
Paragraphs: ${analyzeParagraphs().count}
Reading Time: ${calculateReadingTime()} minute(s)`;

    try {
      await navigator.clipboard.writeText(stats);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      alert('Failed to copy to clipboard');
    }
  };

  const resetFields = () => {
    setText('');
  };

  const sentenceAnalysis = analyzeSentences();
  const paragraphAnalysis = analyzeParagraphs();

  return (
    <>
      <SchemaMarkup />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Breadcrumb />
          
          {/* Hero Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <FiHash className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Word Counter Tool
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Count words, characters, paragraphs, and calculate reading time instantly. 
              Perfect for writers, students, and content creators with detailed text analysis.
            </p>
          </div>

          {/* Main Tool */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter text to analyze:
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste your text here to get instant word count and analysis..."
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-40 resize-none"
              />
            </div>

            {/* Options */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Counting Options:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  onClick={() => setOptions(prev => ({...prev, includePunctuation: !prev.includePunctuation}))}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    options.includePunctuation
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <FiType className="w-4 h-4 mx-auto mb-1" />
                  {options.includePunctuation ? 'Include Punctuation' : 'Exclude Punctuation'}
                </button>
                
                <button
                  onClick={() => setOptions(prev => ({...prev, includeWhitespace: !prev.includeWhitespace}))}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    options.includeWhitespace
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <FiAlignLeft className="w-4 h-4 mx-auto mb-1" />
                  {options.includeWhitespace ? 'Include Spaces' : 'Exclude Spaces'}
                </button>
                
                <button
                  onClick={copyStats}
                  disabled={!text.trim()}
                  className="p-3 rounded-lg text-sm font-medium bg-green-100 hover:bg-green-200 text-green-600 cursor-pointer transition-colors disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  {copied ? <FiRefreshCw className="w-4 h-4 mx-auto mb-1" /> : <FiCopy className="w-4 h-4 mx-auto mb-1" />}
                  {copied ? 'Copied!' : 'Copy Stats'}
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

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-indigo-700">{countWords()}</div>
                <div className="text-indigo-600 text-sm font-medium">Words</div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-700">{countCharactersWithSpaces()}</div>
                <div className="text-blue-600 text-sm font-medium">Characters (with spaces)</div>
              </div>
              
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-700">{countCharacters()}</div>
                <div className="text-green-600 text-sm font-medium">
                  Characters {!options.includeWhitespace ? '(no spaces)' : !options.includePunctuation ? '(no punctuation)' : '(filtered)'}
                </div>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-700">{sentenceAnalysis.count}</div>
                <div className="text-purple-600 text-sm font-medium">Sentences</div>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-orange-700">{paragraphAnalysis.count}</div>
                <div className="text-orange-600 text-sm font-medium">Paragraphs</div>
              </div>
              
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-red-700">{calculateReadingTime()}</div>
                <div className="text-red-600 text-sm font-medium">Reading Time (min)</div>
              </div>
              
              <div className="bg-teal-50 border border-teal-200 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-teal-700">{sentenceAnalysis.longest}</div>
                <div className="text-teal-600 text-sm font-medium">Longest Sentence</div>
              </div>
              
              <div className="bg-pink-50 border border-pink-200 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-pink-700">{sentenceAnalysis.shortest}</div>
                <div className="text-pink-600 text-sm font-medium">Shortest Sentence</div>
              </div>
            </div>

            {/* Sentence Examples */}
            {sentenceAnalysis.count > 0 && (sentenceAnalysis.longestSentence || sentenceAnalysis.shortestSentence) && (
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <h4 className="font-semibold text-gray-800 mb-2">Sentence Analysis</h4>
                
                {sentenceAnalysis.longestSentence && (
                  <div>
                    <span className="text-sm font-medium text-teal-700">Longest Sentence ({sentenceAnalysis.longest} words):</span>
                    <p className="text-sm text-gray-700 bg-white p-2 rounded border mt-1 italic">
                      "{sentenceAnalysis.longestSentence}..."
                    </p>
                  </div>
                )}
                
                {sentenceAnalysis.shortestSentence && sentenceAnalysis.shortestSentence !== sentenceAnalysis.longestSentence && (
                  <div>
                    <span className="text-sm font-medium text-pink-700">Shortest Sentence ({sentenceAnalysis.shortest} words):</span>
                    <p className="text-sm text-gray-700 bg-white p-2 rounded border mt-1 italic">
                      "{sentenceAnalysis.shortestSentence}..."
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* How to Use Guide */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FiBarChart className="text-indigo-600" />
              How to Use the Word Counter
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Step-by-Step Guide</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Paste or type your text in the input field above</li>
                  <li>View instant word count and character analysis</li>
                  <li>Customize counting options:</li>
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li><strong>Include/Exclude Punctuation:</strong> Control whether punctuation marks are counted</li>
                    <li><strong>Include/Exclude Spaces:</strong> Toggle space counting in character count</li>
                  </ul>
                  <li>Review detailed statistics including sentences, paragraphs, and reading time</li>
                  <li>Copy the complete analysis using the "Copy Stats" button</li>
                </ol>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">💡 Pro Tips</h4>
                <ul className="list-disc list-inside space-y-1 text-blue-700">
                  <li>Reading time is calculated at 200 words per minute (average reading speed)</li>
                  <li>Sentence detection works with periods, exclamation marks, and question marks</li>
                  <li>Paragraphs are separated by line breaks</li>
                  <li>Use different counting options for specific requirements (SEO, academic writing, etc.)</li>
                </ul>
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
                <p className="text-sm text-gray-600">Convert text between different cases: uppercase, lowercase, title case</p>
              </Link>
              
              <Link href="/tools/text-reverser" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiArrowRight className="text-indigo-600" />
                  <h3 className="font-semibold">Text Reverser</h3>
                </div>
                <p className="text-sm text-gray-600">Reverse text, words, or lines with various options</p>
              </Link>
              
              <Link href="/tools/find-replace" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiSearch className="text-indigo-600" />
                  <h3 className="font-semibold">Find & Replace</h3>
                </div>
                <p className="text-sm text-gray-600">Find and replace text with regex support</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}