'use client';
import { useState, useEffect } from 'react';
import { FiColumns, FiCopy, FiRefreshCw, FiCode, FiHome, FiChevronRight, FiDownload, FiGitMerge, FiType, FiFileText } from 'react-icons/fi';
import Link from 'next/link';

// Schema markup component
function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "JSON Formatter",
    "url": "https://freedevtools.dev/tools/json-formatter",
    "description": "Free online JSON formatter and validator. Format, validate, and convert JSON, YAML, CSV, and XML data with syntax highlighting.",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Format and beautify JSON",
      "Validate JSON syntax",
      "Convert JSON to YAML",
      "Convert JSON to CSV",
      "Convert JSON to XML",
      "Syntax highlighting",
      "One-click copy to clipboard",
      "Download formatted files"
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
      <span className="text-gray-900 font-medium">JSON Formatter</span>
    </nav>
  );
}

// Main component
export default function JsonFormatterClient() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState<'json' | 'yaml' | 'csv' | 'xml'>('json');
  const [copied, setCopied] = useState(false);
  const [autoFormat, setAutoFormat] = useState(true);

  // Auto-format on input change
  useEffect(() => {
    if (!autoFormat || !input.trim()) {
      setOutput('');
      setError('');
      return;
    }

    try {
      if (viewMode === 'json') {
        const parsed = JSON.parse(input);
        setOutput(JSON.stringify(parsed, null, 2));
      } else if (viewMode === 'yaml') {
        // Simple YAML conversion without external library
        const parsed = JSON.parse(input);
        setOutput(jsonToYaml(parsed));
      } else if (viewMode === 'csv') {
        const parsed = JSON.parse(input);
        if (!Array.isArray(parsed)) {
          throw new Error('JSON must be an array for CSV conversion');
        }
        setOutput(jsonToCsv(parsed));
      } else if (viewMode === 'xml') {
        const parsed = JSON.parse(input);
        setOutput(jsonToXml(parsed));
      }
      setError('');
    } catch (e) {
      setError(`Invalid ${viewMode.toUpperCase()}: ${(e as Error).message}`);
      setOutput('');
    }
  }, [input, viewMode, autoFormat]);

  // Simple JSON to YAML converter
  const jsonToYaml = (obj: any, indent = 0): string => {
    const spaces = '  '.repeat(indent);
    if (obj === null) return 'null';
    if (typeof obj === 'string') return `"${obj}"`;
    if (typeof obj === 'number' || typeof obj === 'boolean') return String(obj);
    
    if (Array.isArray(obj)) {
      if (obj.length === 0) return '[]';
      return obj.map(item => `${spaces}- ${jsonToYaml(item, indent + 1)}`).join('\n');
    }
    
    if (typeof obj === 'object') {
      const entries = Object.entries(obj);
      if (entries.length === 0) return '{}';
      return entries.map(([key, value]) => {
        const yamlValue = jsonToYaml(value, indent + 1);
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          return `${spaces}${key}:\n${yamlValue}`;
        }
        return `${spaces}${key}: ${yamlValue}`;
      }).join('\n');
    }
    
    return String(obj);
  };

  // Simple JSON to CSV converter
  const jsonToCsv = (data: any[]): string => {
    if (!Array.isArray(data) || data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(',')];
    
    for (const row of data) {
      const values = headers.map(header => {
        const value = row[header];
        if (value === null || value === undefined) return '';
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return String(value);
      });
      csvRows.push(values.join(','));
    }
    
    return csvRows.join('\n');
  };

  // Simple JSON to XML converter
  const jsonToXml = (obj: any, rootName = 'root', indent = 0): string => {
    const spaces = '  '.repeat(indent);
    
    if (obj === null || obj === undefined) {
      return `${spaces}<${rootName}></${rootName}>`;
    }
    
    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') {
      const escapedValue = String(obj).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return `${spaces}<${rootName}>${escapedValue}</${rootName}>`;
    }
    
    if (Array.isArray(obj)) {
      if (obj.length === 0) {
        return `${spaces}<${rootName}></${rootName}>`;
      }
      const items = obj.map((item, index) => 
        jsonToXml(item, `item`, indent + 1)
      ).join('\n');
      return `${spaces}<${rootName}>\n${items}\n${spaces}</${rootName}>`;
    }
    
    if (typeof obj === 'object') {
      const entries = Object.entries(obj);
      if (entries.length === 0) {
        return `${spaces}<${rootName}></${rootName}>`;
      }
      
      const elements = entries.map(([key, value]) => {
        // Sanitize key to be valid XML element name
        const sanitizedKey = key.replace(/[^a-zA-Z0-9_-]/g, '_');
        return jsonToXml(value, sanitizedKey, indent + 1);
      }).join('\n');
      
      return `${spaces}<${rootName}>\n${elements}\n${spaces}</${rootName}>`;
    }
    
    return `${spaces}<${rootName}>${String(obj)}</${rootName}>`;
  };

  // Format JSON manually
  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setViewMode('json');
      setError('');
    } catch (e) {
      setError(`Invalid JSON: ${(e as Error).message}`);
    }
  };

  // Convert functions
  const convertToYaml = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(jsonToYaml(parsed));
      setViewMode('yaml');
      setError('');
    } catch (e) {
      setError(`Invalid JSON for YAML conversion: ${(e as Error).message}`);
    }
  };

  const convertToCsv = () => {
    try {
      const parsed = JSON.parse(input);
      if (!Array.isArray(parsed)) {
        throw new Error('JSON must be an array for CSV conversion');
      }
      setOutput(jsonToCsv(parsed));
      setViewMode('csv');
      setError('');
    } catch (e) {
      setError(`Invalid JSON for CSV conversion: ${(e as Error).message}`);
    }
  };

  const convertToXml = () => {
    try {
      const parsed = JSON.parse(input);
      const xmlOutput = '<?xml version="1.0" encoding="UTF-8"?>\n' + jsonToXml(parsed);
      setOutput(xmlOutput);
      setViewMode('xml');
      setError('');
    } catch (e) {
      setError(`Invalid JSON for XML conversion: ${(e as Error).message}`);
    }
  };

  // Copy to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      alert('Failed to copy to clipboard');
    }
  };

  // Download output
  const downloadOutput = () => {
    if (!output) return;
    
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `formatted-data.${viewMode}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetFields = () => {
    setInput('');
    setOutput('');
    setError('');
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
              <FiCode className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              JSON Formatter & Validator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Format, validate, and convert JSON data to YAML, CSV, and XML. Perfect for developers working with APIs, 
              configuration files, and data transformation tasks.
            </p>
          </div>

          {/* Main Tool */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            {/* Input Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter JSON data:
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='Paste your JSON data here...'
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-48 resize-none font-mono text-sm"
              />
              {error && (
                <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}
            </div>

            {/* Options */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Format Options:</h3>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                <button
                  onClick={() => setViewMode('json')}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    viewMode === 'json'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <FiCode className="w-4 h-4 mx-auto mb-1" />
                  JSON
                </button>
                
                <button
                  onClick={() => setViewMode('yaml')}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    viewMode === 'yaml'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <FiGitMerge className="w-4 h-4 mx-auto mb-1" />
                  YAML
                </button>
                
                <button
                  onClick={() => setViewMode('csv')}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    viewMode === 'csv'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <FiColumns className="w-4 h-4 mx-auto mb-1" />
                  CSV
                </button>
                
                <button
                  onClick={() => setViewMode('xml')}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    viewMode === 'xml'
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <FiFileText className="w-4 h-4 mx-auto mb-1" />
                  XML
                </button>
                
                <button
                  onClick={() => setAutoFormat(!autoFormat)}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    autoFormat
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <FiRefreshCw className="w-4 h-4 mx-auto mb-1" />
                  Auto Format
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
            <div className="flex flex-wrap gap-4 mb-6">
             
              
              {output && (
                <>
                  <button
                    onClick={copyToClipboard}
                    className="bg-gray-200 px-6 py-3 rounded-lg hover:bg-gray-300 flex items-center gap-2 font-medium cursor-pointer transition-colors"
                  >
                    {copied ? <FiRefreshCw className="text-green-600" /> : <FiCopy />}
                    {copied ? 'Copied!' : 'Copy Result'}
                  </button>
                  
                  <button
                    onClick={downloadOutput}
                    className="bg-gray-200 px-6 py-3 rounded-lg hover:bg-gray-300 flex items-center gap-2 font-medium cursor-pointer transition-colors"
                  >
                    <FiDownload />
                    Download
                  </button>
                </>
              )}
            </div>

            {/* Result */}
            {output && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Formatted {viewMode.toUpperCase()}:
                  </label>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {viewMode.toUpperCase()}
                  </span>
                </div>
                <div className="relative">
                  <pre className="w-full p-4 bg-gray-900 text-gray-100 rounded-lg overflow-auto h-64 text-sm font-mono border">
                    <code>{output}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* How to Use Guide */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FiCode className="text-indigo-600" />
              How to Use the JSON Formatter
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Step-by-Step Guide</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Paste your JSON data in the input field</li>
                  <li>Choose your desired output format (JSON, YAML, CSV, or XML)</li>
                  <li>Enable "Auto Format" for real-time formatting, or click format buttons manually</li>
                  <li>Copy the formatted result or download it as a file</li>
                  <li>Use the validation feature to check for syntax errors</li>
                </ol>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">💡 Pro Tips</h4>
                <ul className="list-disc list-inside space-y-1 text-blue-700">
                  <li>Use JSON → CSV conversion for data analysis in spreadsheet applications</li>
                  <li>Convert JSON to YAML for more readable configuration files</li>
                  <li>Convert JSON to XML for legacy systems or SOAP APIs</li>
                  <li>Auto-format helps catch syntax errors as you type</li>
                  <li>CSV conversion requires JSON arrays with consistent object structures</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Examples */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Format Examples</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-indigo-700">JSON</h3>
                <div className="bg-gray-50 p-3 rounded border">
                  <pre className="text-sm text-gray-800 overflow-x-auto">
{`{
  "name": "John Doe",
  "age": 30,
  "city": "New York"
}`}
                  </pre>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 text-blue-700">YAML</h3>
                <div className="bg-gray-50 p-3 rounded border">
                  <pre className="text-sm text-gray-800 overflow-x-auto">
{`name: "John Doe"
age: 30
city: "New York"`}
                  </pre>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 text-green-700">CSV</h3>
                <div className="bg-gray-50 p-3 rounded border">
                  <pre className="text-sm text-gray-800 overflow-x-auto">
{`name,age,city
John Doe,30,New York`}
                  </pre>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 text-orange-700">XML</h3>
                <div className="bg-gray-50 p-3 rounded border">
                  <pre className="text-sm text-gray-800 overflow-x-auto">
{`<root>
  <name>John Doe</name>
  <age>30</age>
  <city>New York</city>
</root>`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Related Tools */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Developer Tools</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/tools/css-formatter" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiCode className="text-indigo-600" />
                  <h3 className="font-semibold">CSS Formatter</h3>
                </div>
                <p className="text-sm text-gray-600">Format, minify, and validate CSS code with syntax highlighting</p>
              </Link>
              
              <Link href="/tools/base64-tool" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiColumns className="text-indigo-600" />
                  <h3 className="font-semibold">CSV Formatter</h3>
                </div>
                <p className="text-sm text-gray-600">Format, validate, and convert CSV data with custom delimiters and options</p>
              </Link>
              
              <Link href="/tools/text-formatter" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiType className="text-indigo-600" />
                  <h3 className="font-semibold">Text Formatter</h3>
                </div>
                <p className="text-sm text-gray-600">Format and beautify plain text with advanced options</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}