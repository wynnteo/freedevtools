'use client';
import { useState } from 'react';
import { FiCopy, FiRefreshCw, FiAlignLeft, FiHome, FiChevronRight, FiType, FiHash, FiFile, FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';

// Schema markup component
function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Lorem Ipsum Generator",
    "url": "https://freedevtools.dev/tools/lorem-ipsum",
    "description": "Free online Lorem Ipsum generator to create placeholder text for design and development projects.",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Generate custom Lorem Ipsum text",
      "Adjustable paragraph count",
      "Randomized content generation",
      "One-click copy to clipboard",
      "Instant text generation",
      "No registration required"
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
      <span className="text-gray-900 font-medium">Lorem Ipsum Generator</span>
    </nav>
  );
}

// Lorem Ipsum paragraphs pool
const loremIpsumParagraphs = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
  `Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.`,
  `Proin condimentum fermentum nunc. Etiam pharetra, erat sed fermentum feugiat, velit mauris egestas quam, ut fermentum massa magna accumsan magna. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.`,
  `Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat.`,
  `Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est.`,
  `Suspendisse potenti. Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat.`,
  `Aenean lectus elit, fermentum non, convallis id, sagittis at, neque. Nullam mauris orci, aliquet et, iaculis et, viverra vitae, ligula. Nulla ut felis in purus aliquam imperdiet. Maecenas aliquet mollis lectus. Vivamus consectetuer risus et tortor.`,
  `Integer vitae libero ac risus egestas placerat. Vestibulum commodo felis quis tortor. Ut aliquam sollicitudin leo. Cras iaculis ultricies nulla. Donec quis dui at dolor tempor interdum. Nunc malesuada erat sit amet metus. Fusce bibendum velit et mauris.`,
  `Vivamus laoreet. Nullam tincidunt adipiscing enim. Phasellus tempus. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Fusce neque. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor.`,
  `Morbi interdum mollis sapien. Sed ac risus. Phasellus lacinia, magna a ullamcorper laoreet, lectus arcu pulvinar risus, vitae facilisis libero dolor a purus. Sed vel lacus. Mauris nibh felis, adipiscing varius, adipiscing in, lacinia vel, tellus. Suspendisse ac urna.`,
];

// Main component
export default function LoremIpsumClient() {
  const [paragraphs, setParagraphs] = useState(3);
  const [wordsPerParagraph, setWordsPerParagraph] = useState(50);
  const [generated, setGenerated] = useState('');
  const [copied, setCopied] = useState(false);
  const [generationType, setGenerationType] = useState<'paragraphs' | 'words' | 'sentences'>('paragraphs');

  const generateText = () => {
    let result = '';
    
    if (generationType === 'paragraphs') {
      // Generate paragraphs
      const selectedParagraphs = [];
      for (let i = 0; i < paragraphs; i++) {
        const randomIndex = Math.floor(Math.random() * loremIpsumParagraphs.length);
        selectedParagraphs.push(loremIpsumParagraphs[randomIndex]);
      }
      result = selectedParagraphs.join('\n\n');
    } else if (generationType === 'words') {
      // Generate specific number of words
      const allWords = loremIpsumParagraphs.join(' ').split(' ');
      const selectedWords = [];
      for (let i = 0; i < wordsPerParagraph; i++) {
        const randomIndex = Math.floor(Math.random() * allWords.length);
        selectedWords.push(allWords[randomIndex]);
      }
      result = selectedWords.join(' ').replace(/[.,]/g, '') + '.';
    } else {
      // Generate sentences
      const allSentences = loremIpsumParagraphs.flatMap(p => 
        p.split(/[.!?]+/).filter(s => s.trim().length > 0)
      );
      const selectedSentences = [];
      for (let i = 0; i < paragraphs; i++) {
        const randomIndex = Math.floor(Math.random() * allSentences.length);
        selectedSentences.push(allSentences[randomIndex].trim() + '.');
      }
      result = selectedSentences.join(' ');
    }
    
    setGenerated(result);
    setCopied(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generated);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      alert('Failed to copy to clipboard');
    }
  };

  const resetFields = () => {
    setGenerated('');
    setParagraphs(3);
    setWordsPerParagraph(50);
    setGenerationType('paragraphs');
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
              <FiAlignLeft className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Lorem Ipsum Generator
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Generate Lorem Ipsum placeholder text for your design and development projects. 
              Customize paragraph count and format to fit your needs perfectly.
            </p>
          </div>

          {/* Main Tool */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Generation Type:
                </label>
                <select
                  value={generationType}
                  onChange={(e) => setGenerationType(e.target.value as 'paragraphs' | 'words' | 'sentences')}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="paragraphs">Paragraphs</option>
                  <option value="words">Words</option>
                  <option value="sentences">Sentences</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {generationType === 'paragraphs' ? 'Number of Paragraphs:' : 
                   generationType === 'words' ? 'Number of Words:' : 'Number of Sentences:'}
                </label>
                <input
                  type="number"
                  value={generationType === 'words' ? wordsPerParagraph : paragraphs}
                  onChange={(e) => {
                    const value = Math.max(1, Number(e.target.value));
                    if (generationType === 'words') {
                      setWordsPerParagraph(value);
                    } else {
                      setParagraphs(value);
                    }
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  min="1"
                  max={generationType === 'words' ? 1000 : 50}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={generateText}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 flex items-center gap-2 font-medium cursor-pointer transition-colors"
              >
                <FiRefreshCw />
                Generate Text
              </button>

              {generated && (
                <button
                  onClick={copyToClipboard}
                  className="bg-gray-200 px-6 py-3 rounded-lg hover:bg-gray-300 flex items-center gap-2 font-medium cursor-pointer transition-colors"
                >
                  {copied ? <FiRefreshCw className="text-green-600" /> : <FiCopy />}
                  {copied ? 'Copied!' : 'Copy Text'}
                </button>
              )}

              <button
                onClick={resetFields}
                className="bg-red-100 text-red-600 px-6 py-3 rounded-lg hover:bg-red-200 flex items-center gap-2 font-medium cursor-pointer transition-colors"
              >
                <FiRefreshCw />
                Reset
              </button>
            </div>

            {/* Result */}
            {generated && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Generated Text:
                  </label>
                  <span className="text-sm text-gray-500">
                    {generated.split(' ').length} words, {generated.length} characters
                  </span>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <textarea
                    value={generated}
                    readOnly
                    className="w-full bg-white p-3 rounded border h-64 resize-none select-all"
                    placeholder="Generated text will appear here..."
                  />
                </div>
              </div>
            )}
          </div>

          {/* How to Use Guide */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FiFile className="text-indigo-600" />
              How to Use the Lorem Ipsum Generator
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Step-by-Step Guide</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Choose your generation type:</li>
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li><strong>Paragraphs:</strong> Generate full paragraphs of Lorem Ipsum text</li>
                    <li><strong>Words:</strong> Generate a specific number of words</li>
                    <li><strong>Sentences:</strong> Generate individual sentences</li>
                  </ul>
                  <li>Set the quantity (number of paragraphs, words, or sentences)</li>
                  <li>Click "Generate Text" to create your placeholder text</li>
                  <li>Copy the generated text using the "Copy Text" button</li>
                  <li>Paste into your design or development project</li>
                </ol>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">💡 Pro Tips</h4>
                <ul className="list-disc list-inside space-y-1 text-blue-700">
                  <li>Use paragraphs for testing layout and typography</li>
                  <li>Generate words for specific character count requirements</li>
                  <li>Use sentences for shorter placeholder content</li>
                  <li>Great for wireframes, mockups, and content planning</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Related Tools */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Text Tools</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/tools/word-counter" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiHash className="text-indigo-600" />
                  <h3 className="font-semibold">Word Counter</h3>
                </div>
                <p className="text-sm text-gray-600">Count words, characters, and analyze text</p>
              </Link>
              
              <Link href="/tools/case-converter" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiType className="text-indigo-600" />
                  <h3 className="font-semibold">Case Converter</h3>
                </div>
                <p className="text-sm text-gray-600">Convert text to different cases</p>
              </Link>
              
              <Link href="/tools/text-reverser" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiArrowRight className="text-indigo-600" />
                  <h3 className="font-semibold">Text Reverser</h3>
                </div>
                <p className="text-sm text-gray-600">Reverse text, words, and lines</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}