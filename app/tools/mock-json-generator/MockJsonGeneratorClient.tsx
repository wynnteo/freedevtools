'use client';
import { useState } from 'react';
import { FiCopy, FiRefreshCw, FiDatabase, FiHome, FiChevronRight, FiCode, FiDownload, FiPlay, FiSettings } from 'react-icons/fi';
import Link from 'next/link';

// Schema markup component
function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Mock JSON API Generator",
    "url": "https://freedevtools.dev/tools/mock-json-generator",
    "description": "Free online mock JSON API generator to create realistic test data from JSON schemas for development and testing.",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Generate mock data from JSON schema",
      "Realistic fake data generation",
      "Customizable data types",
      "Multiple record generation",
      "Export options",
      "Schema validation"
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
      <span className="text-gray-900 font-medium">Mock JSON Generator</span>
    </nav>
  );
}

// Mock data generators
const generators = {
  string: () => {
    const words = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit'];
    return words[Math.floor(Math.random() * words.length)];
  },
  name: () => {
    const first = ['John', 'Jane', 'Mike', 'Sarah', 'David', 'Lisa', 'Tom', 'Anna', 'Chris', 'Emma'];
    const last = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
    return `${first[Math.floor(Math.random() * first.length)]} ${last[Math.floor(Math.random() * last.length)]}`;
  },
  email: () => {
    const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'example.com'];
    const names = ['user', 'test', 'demo', 'sample', 'john', 'jane', 'admin'];
    return `${names[Math.floor(Math.random() * names.length)]}${Math.floor(Math.random() * 999)}@${domains[Math.floor(Math.random() * domains.length)]}`;
  },
  phone: () => {
    return `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
  },
  address: () => {
    const streets = ['Main St', 'Oak Ave', 'Park Rd', 'First St', 'Second Ave', 'Broadway', 'Elm St', 'Maple Ave'];
    const num = Math.floor(Math.random() * 9999) + 1;
    return `${num} ${streets[Math.floor(Math.random() * streets.length)]}`;
  },
  city: () => {
    const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego'];
    return cities[Math.floor(Math.random() * cities.length)];
  },
  date: () => {
    const start = new Date(2020, 0, 1);
    const end = new Date();
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split('T')[0];
  },
  datetime: () => new Date(Date.now() - Math.random() * 31536000000).toISOString(),
  number: () => Math.floor(Math.random() * 1000),
  integer: () => Math.floor(Math.random() * 1000),
  float: () => Math.random() * 1000,
  boolean: () => Math.random() > 0.5,
  url: () => {
    const domains = ['example.com', 'test.org', 'demo.net', 'sample.io'];
    return `https://www.${domains[Math.floor(Math.random() * domains.length)]}`;
  },
  uuid: () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  }),
  company: () => {
    const companies = ['Acme Corp', 'Tech Solutions', 'Global Industries', 'Innovation Labs', 'Digital Systems', 'Future Tech'];
    return companies[Math.floor(Math.random() * companies.length)];
  }
};

// Main component
export default function MockJsonGeneratorClient() {
  const [schema, setSchema] = useState(`{
  "type": "object",
  "properties": {
    "id": {"type": "integer"},
    "name": {"type": "string", "format": "name"},
    "email": {"type": "string", "format": "email"},
    "phone": {"type": "string", "format": "phone"},
    "address": {
      "type": "object",
      "properties": {
        "street": {"type": "string", "format": "address"},
        "city": {"type": "string", "format": "city"}
      }
    },
    "isActive": {"type": "boolean"},
    "createdAt": {"type": "string", "format": "datetime"}
  }
}`);
  const [mockData, setMockData] = useState('');
  const [recordCount, setRecordCount] = useState(5);
  const [options, setOptions] = useState({
    prettyPrint: true,
    wrapInArray: true,
    addTimestamp: false,
  });
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const generateMockValue = (property: any): any => {
    const type = property.type;
    const format = property.format;

    if (format && generators[format as keyof typeof generators]) {
      return generators[format as keyof typeof generators]();
    }

    switch (type) {
      case 'string':
        return generators.string();
      case 'integer':
      case 'number':
        return Math.floor(Math.random() * 1000);
      case 'boolean':
        return Math.random() > 0.5;
      case 'array':
        const arrayLength = Math.floor(Math.random() * 3) + 1;
        return Array(arrayLength).fill(null).map(() => 
          property.items ? generateMockValue(property.items) : generators.string()
        );
      case 'object':
        const obj: any = {};
        if (property.properties) {
          Object.keys(property.properties).forEach(key => {
            obj[key] = generateMockValue(property.properties[key]);
          });
        }
        return obj;
      default:
        return generators.string();
    }
  };

  const generateMockData = () => {
    try {
      setError('');
      const parsedSchema = JSON.parse(schema);
      
      if (!parsedSchema.type || !parsedSchema.properties) {
        throw new Error('Schema must have "type" and "properties" fields');
      }

      const records = [];
      for (let i = 0; i < recordCount; i++) {
        const record = generateMockValue(parsedSchema);
        if (options.addTimestamp) {
          record._generated = new Date().toISOString();
        }
        records.push(record);
      }

      const result = options.wrapInArray ? records : records[0];
      const output = options.prettyPrint 
        ? JSON.stringify(result, null, 2)
        : JSON.stringify(result);
      
      setMockData(output);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON schema');
      setMockData('');
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(mockData);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      alert('Failed to copy to clipboard');
    }
  };

  const downloadJson = () => {
    const blob = new Blob([mockData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mock-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetFields = () => {
    setSchema(`{
  "type": "object",
  "properties": {
    "id": {"type": "integer"},
    "name": {"type": "string", "format": "name"},
    "email": {"type": "string", "format": "email"}
  }
}`);
    setMockData('');
    setError('');
  };

  const loadTemplate = (template: string) => {
    const templates = {
      user: `{
  "type": "object",
  "properties": {
    "id": {"type": "integer"},
    "name": {"type": "string", "format": "name"},
    "email": {"type": "string", "format": "email"},
    "phone": {"type": "string", "format": "phone"},
    "isActive": {"type": "boolean"},
    "createdAt": {"type": "string", "format": "datetime"}
  }
}`,
      product: `{
  "type": "object",
  "properties": {
    "id": {"type": "integer"},
    "name": {"type": "string"},
    "price": {"type": "number"},
    "category": {"type": "string"},
    "inStock": {"type": "boolean"},
    "description": {"type": "string"}
  }
}`,
      company: `{
  "type": "object",
  "properties": {
    "id": {"type": "integer"},
    "name": {"type": "string", "format": "company"},
    "website": {"type": "string", "format": "url"},
    "employees": {"type": "integer"},
    "founded": {"type": "string", "format": "date"}
  }
}`
    };
    setSchema(templates[template as keyof typeof templates]);
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
              <FiDatabase className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Mock JSON API Generator
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Generate realistic mock data from JSON schemas for API testing, development, and prototyping. 
              Create multiple records with customizable fake data instantly.
            </p>
          </div>

          {/* Main Tool */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Schema Input */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  JSON Schema:
                </label>
                <div className="flex gap-2">
                  <select
                    onChange={(e) => loadTemplate(e.target.value)}
                    className="text-xs px-2 py-1 border border-gray-300 rounded"
                  >
                    <option value="">Load Template</option>
                    <option value="user">User Profile</option>
                    <option value="product">Product</option>
                    <option value="company">Company</option>
                  </select>
                </div>
              </div>
              <textarea
                value={schema}
                onChange={(e) => setSchema(e.target.value)}
                placeholder="Enter your JSON schema here..."
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-64 font-mono text-sm resize-none"
              />
              {error && (
                <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">
                  {error}
                </div>
              )}
            </div>

            {/* Generated Data */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Generated Mock Data:
              </label>
              {mockData ? (
                <div className="space-y-4">
                  <textarea
                    value={mockData}
                    readOnly
                    className="w-full bg-gray-50 p-4 rounded border h-64 font-mono text-sm resize-none select-all"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={copyToClipboard}
                      className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 flex items-center gap-2 text-sm font-medium cursor-pointer transition-colors"
                    >
                      {copied ? <FiRefreshCw className="text-green-600" /> : <FiCopy />}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                    <button
                      onClick={downloadJson}
                      className="bg-blue-200 px-4 py-2 rounded-lg hover:bg-blue-300 flex items-center gap-2 text-sm font-medium cursor-pointer transition-colors"
                    >
                      <FiDownload />
                      Download
                    </button>
                  </div>
                </div>
              ) : (
                <div className="h-64 bg-gray-50 rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <FiCode className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Generated mock data will appear here</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Options and Controls */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FiSettings className="text-indigo-600" />
              Generation Options
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Records:
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={recordCount}
                  onChange={(e) => setRecordCount(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="prettyPrint"
                  checked={options.prettyPrint}
                  onChange={(e) => setOptions(prev => ({...prev, prettyPrint: e.target.checked}))}
                  className="mr-2"
                />
                <label htmlFor="prettyPrint" className="text-sm font-medium text-gray-700">
                  Pretty Print JSON
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="wrapInArray"
                  checked={options.wrapInArray}
                  onChange={(e) => setOptions(prev => ({...prev, wrapInArray: e.target.checked}))}
                  className="mr-2"
                />
                <label htmlFor="wrapInArray" className="text-sm font-medium text-gray-700">
                  Wrap in Array
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="addTimestamp"
                  checked={options.addTimestamp}
                  onChange={(e) => setOptions(prev => ({...prev, addTimestamp: e.target.checked}))}
                  className="mr-2"
                />
                <label htmlFor="addTimestamp" className="text-sm font-medium text-gray-700">
                  Add Timestamp
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={generateMockData}
                disabled={!schema.trim()}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 font-medium cursor-pointer transition-colors"
              >
                <FiPlay />
                Generate Mock Data
              </button>
              
              <button
                onClick={resetFields}
                className="bg-red-100 text-red-600 px-6 py-3 rounded-lg hover:bg-red-200 flex items-center gap-2 font-medium cursor-pointer transition-colors"
              >
                <FiRefreshCw />
                Reset
              </button>
            </div>
          </div>

          {/* How to Use Guide */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FiCode className="text-indigo-600" />
              How to Use the Mock JSON Generator
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Step-by-Step Guide</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Enter your JSON schema in the left panel or load a template</li>
                  <li>Configure generation options (number of records, formatting, etc.)</li>
                  <li>Click "Generate Mock Data" to create realistic test data</li>
                  <li>Copy the generated data or download it as a JSON file</li>
                  <li>Use the mock data in your applications, tests, or prototypes</li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Supported Data Formats</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-3 rounded">
                    <h4 className="font-medium text-blue-800 mb-1">Personal Data</h4>
                    <p className="text-sm text-blue-600">name, email, phone, address, city</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded">
                    <h4 className="font-medium text-green-800 mb-1">Business Data</h4>
                    <p className="text-sm text-green-600">company, url, uuid</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded">
                    <h4 className="font-medium text-purple-800 mb-1">Date/Time</h4>
                    <p className="text-sm text-purple-600">date, datetime</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">💡 Pro Tips</h4>
                <ul className="list-disc list-inside space-y-1 text-blue-700">
                  <li>Use the "format" field in your schema for realistic data types</li>
                  <li>Generate multiple records to test pagination and lists</li>
                  <li>Use nested objects to create complex data structures</li>
                  <li>Enable timestamps to track when data was generated</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Examples */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Schema Examples</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-green-700">Basic User Schema</h3>
                <pre className="bg-gray-50 p-3 rounded border text-sm overflow-x-auto">
{`{
  "type": "object",
  "properties": {
    "id": {"type": "integer"},
    "name": {"type": "string", "format": "name"},
    "email": {"type": "string", "format": "email"},
    "isActive": {"type": "boolean"}
  }
}`}
                </pre>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Complex Product Schema</h3>
                <pre className="bg-gray-50 p-3 rounded border text-sm overflow-x-auto">
{`{
  "type": "object",
  "properties": {
    "id": {"type": "integer"},
    "name": {"type": "string"},
    "price": {"type": "number"},
    "tags": {
      "type": "array",
      "items": {"type": "string"}
    },
    "vendor": {
      "type": "object",
      "properties": {
        "name": {"type": "string", "format": "company"},
        "contact": {"type": "string", "format": "email"}
      }
    }
  }
}`}
                </pre>
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
                  <FiSettings className="text-indigo-600" />
                  <h3 className="font-semibold">Regex Tester</h3>
                </div>
                <p className="text-sm text-gray-600">Test and validate regular expressions</p>
              </Link>
              
              <Link href="/tools/password-generator" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiRefreshCw className="text-indigo-600" />
                  <h3 className="font-semibold">Password Generator</h3>
                </div>
                <p className="text-sm text-gray-600">Generate secure passwords for testing</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}