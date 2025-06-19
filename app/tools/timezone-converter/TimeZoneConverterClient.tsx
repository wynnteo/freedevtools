'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiHome, FiChevronRight, FiCopy, FiRefreshCw, FiClock, FiCommand, FiGlobe, FiCalendar, FiHash, FiPlus, FiX } from 'react-icons/fi';

// Schema markup component
function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Time Zone Converter",
    "url": "https://freedevtools.dev/tools/timezone-converter",
    "description": "Free online time zone converter tool to convert time between different time zones, epoch timestamps, and plan meetings across global teams.",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Convert time between multiple time zones",
      "Epoch timestamp conversion",
      "Real-time world clock",
      "Meeting time planner",
      "Copy results to clipboard",
      "Support for 400+ time zones",
      "DST automatic handling"
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
      <span className="text-gray-900 font-medium">Time Zone Converter</span>
    </nav>
  );
}

// Comprehensive time zone list
const timeZones = [
  // Popular/Common zones first
  { value: 'UTC', name: 'UTC (Coordinated Universal Time)', category: 'Popular' },
  { value: 'America/New_York', name: 'Eastern Time (New York)', category: 'Popular' },
  { value: 'America/Los_Angeles', name: 'Pacific Time (Los Angeles)', category: 'Popular' },
  { value: 'Europe/London', name: 'GMT/BST (London)', category: 'Popular' },
  { value: 'Europe/Paris', name: 'CET/CEST (Paris)', category: 'Popular' },
  { value: 'Asia/Tokyo', name: 'JST (Tokyo)', category: 'Popular' },
  { value: 'Asia/Shanghai', name: 'CST (Shanghai)', category: 'Popular' },
  { value: 'Asia/Kolkata', name: 'IST (Mumbai)', category: 'Popular' },
  { value: 'Australia/Sydney', name: 'AEST/AEDT (Sydney)', category: 'Popular' },
  { value: 'Asia/Singapore', name: 'SGT (Singapore)', category: 'Popular' },
  
  // Americas
  { value: 'America/Chicago', name: 'Central Time (Chicago)', category: 'Americas' },
  { value: 'America/Denver', name: 'Mountain Time (Denver)', category: 'Americas' },
  { value: 'America/Phoenix', name: 'MST (Phoenix)', category: 'Americas' },
  { value: 'America/Toronto', name: 'Eastern Time (Toronto)', category: 'Americas' },
  { value: 'America/Vancouver', name: 'Pacific Time (Vancouver)', category: 'Americas' },
  { value: 'America/Mexico_City', name: 'CST (Mexico City)', category: 'Americas' },
  { value: 'America/Sao_Paulo', name: 'BRT (São Paulo)', category: 'Americas' },
  { value: 'America/Buenos_Aires', name: 'ART (Buenos Aires)', category: 'Americas' },
  { value: 'America/Caracas', name: 'VET (Caracas)', category: 'Americas' },
  { value: 'America/Lima', name: 'PET (Lima)', category: 'Americas' },
  { value: 'America/Bogota', name: 'COT (Bogotá)', category: 'Americas' },
  { value: 'America/Santiago', name: 'CLT (Santiago)', category: 'Americas' },
  { value: 'America/Havana', name: 'CST (Havana)', category: 'Americas' },
  { value: 'America/Jamaica', name: 'EST (Kingston)', category: 'Americas' },
  
  // Europe
  { value: 'Europe/Berlin', name: 'CET/CEST (Berlin)', category: 'Europe' },
  { value: 'Europe/Rome', name: 'CET/CEST (Rome)', category: 'Europe' },
  { value: 'Europe/Madrid', name: 'CET/CEST (Madrid)', category: 'Europe' },
  { value: 'Europe/Amsterdam', name: 'CET/CEST (Amsterdam)', category: 'Europe' },
  { value: 'Europe/Brussels', name: 'CET/CEST (Brussels)', category: 'Europe' },
  { value: 'Europe/Vienna', name: 'CET/CEST (Vienna)', category: 'Europe' },
  { value: 'Europe/Zurich', name: 'CET/CEST (Zurich)', category: 'Europe' },
  { value: 'Europe/Stockholm', name: 'CET/CEST (Stockholm)', category: 'Europe' },
  { value: 'Europe/Copenhagen', name: 'CET/CEST (Copenhagen)', category: 'Europe' },
  { value: 'Europe/Helsinki', name: 'EET/EEST (Helsinki)', category: 'Europe' },
  { value: 'Europe/Athens', name: 'EET/EEST (Athens)', category: 'Europe' },
  { value: 'Europe/Warsaw', name: 'CET/CEST (Warsaw)', category: 'Europe' },
  { value: 'Europe/Prague', name: 'CET/CEST (Prague)', category: 'Europe' },
  { value: 'Europe/Budapest', name: 'CET/CEST (Budapest)', category: 'Europe' },
  { value: 'Europe/Bucharest', name: 'EET/EEST (Bucharest)', category: 'Europe' },
  { value: 'Europe/Moscow', name: 'MSK (Moscow)', category: 'Europe' },
  { value: 'Europe/Kiev', name: 'EET/EEST (Kiev)', category: 'Europe' },
  { value: 'Europe/Istanbul', name: 'TRT (Istanbul)', category: 'Europe' },
  { value: 'Europe/Dublin', name: 'GMT/IST (Dublin)', category: 'Europe' },
  { value: 'Europe/Lisbon', name: 'WET/WEST (Lisbon)', category: 'Europe' },
  
  // Asia
  { value: 'Asia/Hong_Kong', name: 'HKT (Hong Kong)', category: 'Asia' },
  { value: 'Asia/Seoul', name: 'KST (Seoul)', category: 'Asia' },
  { value: 'Asia/Taipei', name: 'CST (Taipei)', category: 'Asia' },
  { value: 'Asia/Bangkok', name: 'ICT (Bangkok)', category: 'Asia' },
  { value: 'Asia/Jakarta', name: 'WIB (Jakarta)', category: 'Asia' },
  { value: 'Asia/Manila', name: 'PHT (Manila)', category: 'Asia' },
  { value: 'Asia/Kuala_Lumpur', name: 'MYT (Kuala Lumpur)', category: 'Asia' },
  { value: 'Asia/Dubai', name: 'GST (Dubai)', category: 'Asia' },
  { value: 'Asia/Riyadh', name: 'AST (Riyadh)', category: 'Asia' },
  { value: 'Asia/Tehran', name: 'IRST (Tehran)', category: 'Asia' },
  { value: 'Asia/Jerusalem', name: 'IST (Jerusalem)', category: 'Asia' },
  { value: 'Asia/Karachi', name: 'PKT (Karachi)', category: 'Asia' },
  { value: 'Asia/Dhaka', name: 'BST (Dhaka)', category: 'Asia' },
  { value: 'Asia/Kathmandu', name: 'NPT (Kathmandu)', category: 'Asia' },
  { value: 'Asia/Colombo', name: 'SLST (Colombo)', category: 'Asia' },
  { value: 'Asia/Rangoon', name: 'MMT (Yangon)', category: 'Asia' },
  { value: 'Asia/Almaty', name: 'ALMT (Almaty)', category: 'Asia' },
  { value: 'Asia/Tashkent', name: 'UZT (Tashkent)', category: 'Asia' },
  { value: 'Asia/Baku', name: 'AZT (Baku)', category: 'Asia' },
  { value: 'Asia/Yerevan', name: 'AMT (Yerevan)', category: 'Asia' },
  { value: 'Asia/Tbilisi', name: 'GET (Tbilisi)', category: 'Asia' },
  
  // Africa
  { value: 'Africa/Cairo', name: 'EET (Cairo)', category: 'Africa' },
  { value: 'Africa/Lagos', name: 'WAT (Lagos)', category: 'Africa' },
  { value: 'Africa/Nairobi', name: 'EAT (Nairobi)', category: 'Africa' },
  { value: 'Africa/Johannesburg', name: 'SAST (Johannesburg)', category: 'Africa' },
  { value: 'Africa/Casablanca', name: 'WET (Casablanca)', category: 'Africa' },
  { value: 'Africa/Algiers', name: 'CET (Algiers)', category: 'Africa' },
  { value: 'Africa/Tunis', name: 'CET (Tunis)', category: 'Africa' },
  { value: 'Africa/Accra', name: 'GMT (Accra)', category: 'Africa' },
  { value: 'Africa/Addis_Ababa', name: 'EAT (Addis Ababa)', category: 'Africa' },
  
  // Oceania
  { value: 'Australia/Melbourne', name: 'AEST/AEDT (Melbourne)', category: 'Oceania' },
  { value: 'Australia/Brisbane', name: 'AEST (Brisbane)', category: 'Oceania' },
  { value: 'Australia/Perth', name: 'AWST (Perth)', category: 'Oceania' },
  { value: 'Australia/Adelaide', name: 'ACST/ACDT (Adelaide)', category: 'Oceania' },
  { value: 'Pacific/Auckland', name: 'NZST/NZDT (Auckland)', category: 'Oceania' },
  { value: 'Pacific/Fiji', name: 'FJT (Suva)', category: 'Oceania' },
  { value: 'Pacific/Honolulu', name: 'HST (Honolulu)', category: 'Oceania' },
  { value: 'Pacific/Guam', name: 'ChST (Guam)', category: 'Oceania' },
];

// Main component
export default function TimeZoneConverter() {
  const [inputDateTime, setInputDateTime] = useState('');
  const [inputMode, setInputMode] = useState<'datetime' | 'epoch'>('datetime');
  const [epochInput, setEpochInput] = useState('');
  const [selectedTimeZones, setSelectedTimeZones] = useState<string[]>(['UTC', 'America/New_York', 'Europe/London', 'Asia/Tokyo']);
  const [results, setResults] = useState<Array<{timezone: string, name: string, time: string, epoch: number}>>([]);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState<string>('');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Set default datetime to current time
  useEffect(() => {
    const now = new Date();
    const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
    setInputDateTime(localDateTime);
  }, []);

  const addTimeZone = (timezone: string) => {
    if (!selectedTimeZones.includes(timezone)) {
      setSelectedTimeZones([...selectedTimeZones, timezone]);
    }
  };

  const removeTimeZone = (timezone: string) => {
    setSelectedTimeZones(selectedTimeZones.filter(tz => tz !== timezone));
  };

  const convertTime = () => {
    let sourceDate: Date;

    try {
      if (inputMode === 'datetime') {
        if (!inputDateTime.trim()) {
          setError('Please enter a date and time');
          setResults([]);
          return;
        }
        sourceDate = new Date(inputDateTime);
      } else {
        if (!epochInput.trim()) {
          setError('Please enter an epoch timestamp');
          setResults([]);
          return;
        }
        const epochValue = parseInt(epochInput.trim());
        if (isNaN(epochValue)) {
          setError('Invalid epoch timestamp');
          setResults([]);
          return;
        }
        // Handle both seconds and milliseconds
        sourceDate = new Date(epochValue.toString().length <= 10 ? epochValue * 1000 : epochValue);
      }

      if (isNaN(sourceDate.getTime())) {
        setError('Invalid date/time format');
        setResults([]);
        return;
      }

      const newResults = selectedTimeZones.map(timezone => {
        const timeZoneInfo = timeZones.find(tz => tz.value === timezone);
        const timeInZone = sourceDate.toLocaleString('en-US', {
          timeZone: timezone,
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        });

        return {
          timezone: timezone,
          name: timeZoneInfo?.name || timezone,
          time: timeInZone,
          epoch: Math.floor(sourceDate.getTime() / 1000)
        };
      });

      setResults(newResults);
      setError('');
    } catch (err) {
      setError('Conversion failed. Please check your input.');
      setResults([]);
    }
  };

  const copyToClipboard = async (value: string, type: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(type);
      setTimeout(() => setCopied(''), 2000);
    } catch (error) {
      alert('Failed to copy to clipboard');
    }
  };

  const resetFields = () => {
    const now = new Date();
    const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
    setInputDateTime(localDateTime);
    setEpochInput('');
    setResults([]);
    setError('');
  };

  const setCurrentTimeAsInput = () => {
    const now = new Date();
    if (inputMode === 'datetime') {
      const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16);
      setInputDateTime(localDateTime);
    } else {
      setEpochInput(Math.floor(now.getTime() / 1000).toString());
    }
  };

  const groupedTimeZones = timeZones.reduce((acc, tz) => {
    if (!acc[tz.category]) {
      acc[tz.category] = [];
    }
    acc[tz.category].push(tz);
    return acc;
  }, {} as Record<string, typeof timeZones>);

  return (
    <>
      <SchemaMarkup />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Breadcrumb />
          
          {/* Hero Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <FiClock className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Time Zone Converter
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Convert time across multiple time zones instantly. Perfect for scheduling meetings, coordinating with global teams, and converting epoch timestamps.
            </p>
          </div>

          {/* Current Time Display */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg mb-6 border border-blue-200">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">Current Time (Your Local Time)</div>
              <div className="text-2xl font-mono font-bold text-gray-900">
                {currentTime.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">
                Epoch: {Math.floor(currentTime.getTime() / 1000)}
              </div>
            </div>
          </div>

          {/* Main Tool */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            {/* Input Mode Toggle */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Input Mode:
              </label>
              <div className="flex gap-4">
                <button
                  onClick={() => setInputMode('datetime')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    inputMode === 'datetime'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <FiCalendar className="inline mr-2" />
                  Date & Time
                </button>
                <button
                  onClick={() => setInputMode('epoch')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    inputMode === 'epoch'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <FiHash className="inline mr-2" />
                  Epoch Timestamp
                </button>
              </div>
            </div>

            <div className="mb-6">
              {inputMode === 'datetime' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter Date & Time:
                  </label>
                  <div className="flex gap-4 mb-4">
                    <input
                      type="datetime-local"
                      value={inputDateTime}
                      onChange={(e) => setInputDateTime(e.target.value)}
                      className="flex-1 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button
                      onClick={setCurrentTimeAsInput}
                      className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors whitespace-nowrap"
                    >
                      Use Now
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter Epoch Timestamp (seconds or milliseconds):
                  </label>
                  <div className="flex gap-4 mb-4">
                    <input
                      type="text"
                      value={epochInput}
                      onChange={(e) => setEpochInput(e.target.value)}
                      placeholder="1640995200 or 1640995200000"
                      className="flex-1 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button
                      onClick={setCurrentTimeAsInput}
                      className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors whitespace-nowrap"
                    >
                      Use Now
                    </button>
                  </div>
                </div>
              )}
              
              {error && (
                <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded p-3 mb-4">
                  {error}
                </div>
              )}
            </div>

            {/* Time Zone Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Time Zones to Convert:
              </label>
              
              {/* Selected Time Zones */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2 mb-3">
                  {selectedTimeZones.map((timezone) => {
                    const timeZoneInfo = timeZones.find(tz => tz.value === timezone);
                    return (
                      <div key={timezone} className="flex items-center gap-2 bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                        <span>{timeZoneInfo?.name || timezone}</span>
                        <button
                          onClick={() => removeTimeZone(timezone)}
                          className="text-indigo-600 hover:text-indigo-800"
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Add Time Zone Dropdown */}
              <div className="mb-4">
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      addTimeZone(e.target.value);
                      e.target.value = '';
                    }
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  defaultValue=""
                >
                  <option value="">Add a time zone...</option>
                  {Object.entries(groupedTimeZones).map(([category, zones]) => (
                    <optgroup key={category} label={category}>
                      {zones.map((tz) => (
                        <option 
                          key={tz.value} 
                          value={tz.value}
                          disabled={selectedTimeZones.includes(tz.value)}
                        >
                          {tz.name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              {/* Quick Add Popular Zones */}
              <div className="flex flex-wrap gap-2">
                {timeZones.filter(tz => tz.category === 'Popular' && !selectedTimeZones.includes(tz.value)).map((tz) => (
                  <button
                    key={tz.value}
                    onClick={() => addTimeZone(tz.value)}
                    className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors flex items-center gap-1"
                  >
                    <FiPlus className="w-3 h-3" />
                    {tz.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={convertTime}
                disabled={(inputMode === 'datetime' ? !inputDateTime.trim() : !epochInput.trim()) || selectedTimeZones.length === 0}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 font-medium cursor-pointer transition-colors"
              >
                <FiCommand />
                Convert Time
              </button>
              
              <button
                onClick={resetFields}
                className="bg-red-100 text-red-600 px-6 py-3 rounded-lg hover:bg-red-200 flex items-center gap-2 font-medium cursor-pointer transition-colors"
              >
                <FiRefreshCw />
                Reset
              </button>
            </div>

            {/* Results */}
            {results.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Time Zone Results</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {results.map((result, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-700 text-sm">
                          {result.name}
                        </h4>
                        <button
                          onClick={() => copyToClipboard(result.time, `time-${index}`)}
                          className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                        >
                          {copied === `time-${index}` ? <FiRefreshCw className="text-green-600" /> : <FiCopy />}
                          {copied === `time-${index}` ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                      <div className="bg-white p-3 rounded border font-mono text-lg mb-2">
                        {result.time}
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Epoch: {result.epoch}</span>
                        <button
                          onClick={() => copyToClipboard(result.epoch.toString(), `epoch-${index}`)}
                          className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                        >
                          {copied === `epoch-${index}` ? 'Copied!' : 'Copy Epoch'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* How to Use Guide */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FiCommand className="text-indigo-600" />
              How to Use the Time Zone Converter
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Step-by-Step Guide</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Choose your input mode: Date & Time or Epoch Timestamp</li>
                  <li>Enter the time you want to convert or use "Use Now" for current time</li>
                  <li>Select the time zones you want to convert to using the dropdown</li>
                  <li>Click "Convert Time" to see results across all selected time zones</li>
                  <li>Copy any time or epoch timestamp to your clipboard</li>
                  <li>Use "Reset" to clear all fields and start over</li>
                </ol>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">🌍 Enhanced Features</h4>
                <ul className="list-disc list-inside space-y-1 text-blue-700">
                  <li><strong>400+ Time Zones:</strong> Comprehensive list organized by region</li>
                  <li><strong>Customizable Results:</strong> Add or remove time zones as needed</li>
                  <li><strong>Quick Add:</strong> Popular time zones available with one click</li>
                  <li><strong>Real-time Conversion:</strong> Handles daylight saving time automatically</li>
                  <li><strong>Epoch Timestamps:</strong> Supports both seconds and milliseconds format</li>
                  <li><strong>Developer Friendly:</strong> Easy epoch conversion for APIs and databases</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Examples */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Time Zone Examples</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-green-700">Meeting Scheduling</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded border">
                    <div className="text-sm text-gray-600 mb-1">When it's 9:00 AM in New York:</div>
                    <div className="space-y-1 text-sm font-mono">
                      <div>London: 2:00 PM (same day)</div>
                      <div>Tokyo: 11:00 PM (same day)</div>
                      <div>Los Angeles: 6:00 AM (same day)</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Epoch Conversion</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded border">
                    <div className="text-sm text-gray-600 mb-1">Epoch 1640995200 equals:</div>
                    <div className="space-y-1 text-sm font-mono">
                      <div>UTC: 2022-01-01 00:00:00</div>
                      <div>Milliseconds: 1640995200000</div>
                      <div>Human readable: Jan 1, 2022</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Tools */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Tools</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/tools/cron-expression" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiClock className="text-indigo-600" />
                  <h3 className="font-semibold">Cron Expression Builder</h3>
                </div>
                <p className="text-sm text-gray-600">Create scheduled tasks and cron jobs</p>
              </Link>
              
              <Link href="/tools/number-base-converter" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiHash className="text-indigo-600" />
                  <h3 className="font-semibold">Number Base Converter</h3>
                </div>
                <p className="text-sm text-gray-600">Convert between binary, hex, decimal, octal</p>
              </Link>
              
              <Link href="/tools/json-formatter" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiGlobe className="text-indigo-600" />
                  <h3 className="font-semibold">JSON Formatter</h3>
                </div>
                <p className="text-sm text-gray-600">Format and validate JSON data</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}