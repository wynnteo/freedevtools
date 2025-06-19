'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiLock, FiGitMerge, FiCopy, FiRefreshCw, FiClock, FiHome, FiChevronRight, FiCalendar, FiSettings, FiPlay, FiAlertCircle, FiCheck, FiDroplet } from 'react-icons/fi';

type CronFieldType = 'minute' | 'hour' | 'dayOfMonth' | 'month' | 'dayOfWeek';

// Schema markup component
function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Cron Expression Builder",
    "url": "https://freedevtools.dev/tools/cron-builder",
    "description": "Free online cron expression builder and generator with visual interface and real-time validation.",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Visual cron expression builder",
      "Real-time validation",
      "Human-readable descriptions",
      "Common presets",
      "Next execution times",
      "Copy to clipboard"
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
      <span className="text-gray-900 font-medium">Cron Builder</span>
    </nav>
  );
}

// Validation functions
const validateCronField = (value: string, fieldType: CronFieldType): { isValid: boolean; error?: string } => {
  if (!value || value.trim() === '') {
    return { isValid: false, error: 'Field cannot be empty' };
  }

  const trimmedValue = value.trim();
  
  // Allow wildcard
  if (trimmedValue === '*') {
    return { isValid: true };
  }

  // Field-specific validation
  const ranges: Record<CronFieldType, { min: number; max: number; name: string }> = {
    minute: { min: 0, max: 59, name: 'Minute' },
    hour: { min: 0, max: 23, name: 'Hour' },
    dayOfMonth: { min: 1, max: 31, name: 'Day of Month' },
    month: { min: 1, max: 12, name: 'Month' },
    dayOfWeek: { min: 0, max: 7, name: 'Day of Week' }
  };

  const range = ranges[fieldType];
  if (!range) return { isValid: false, error: 'Unknown field type' };

  // Handle step values (*/n)
  if (trimmedValue.startsWith('*/')) {
    const stepValue = trimmedValue.slice(2);
    if (!/^\d+$/.test(stepValue)) {
      return { isValid: false, error: `${range.name}: Step value must be a number` };
    }
    const step = parseInt(stepValue);
    if (step < 1 || step > range.max) {
      return { isValid: false, error: `${range.name}: Step value must be between 1 and ${range.max}` };
    }
    return { isValid: true };
  }

  // Handle ranges (n-m)
  if (trimmedValue.includes('-')) {
    const parts = trimmedValue.split('-');
    if (parts.length !== 2) {
      return { isValid: false, error: `${range.name}: Invalid range format. Use n-m` };
    }
    const [start, end] = parts.map(p => parseInt(p.trim()));
    if (isNaN(start) || isNaN(end)) {
      return { isValid: false, error: `${range.name}: Range values must be numbers` };
    }
    if (start < range.min || start > range.max || end < range.min || end > range.max) {
      return { isValid: false, error: `${range.name}: Range values must be between ${range.min} and ${range.max}` };
    }
    if (start >= end) {
      return { isValid: false, error: `${range.name}: Start value must be less than end value` };
    }
    return { isValid: true };
  }

  // Handle lists (n,m,o)
  if (trimmedValue.includes(',')) {
    const values = trimmedValue.split(',').map(v => v.trim());
    for (const val of values) {
      if (!/^\d+$/.test(val)) {
        return { isValid: false, error: `${range.name}: List values must be numbers` };
      }
      const num = parseInt(val);
      if (num < range.min || num > range.max) {
        return { isValid: false, error: `${range.name}: List values must be between ${range.min} and ${range.max}` };
      }
    }
    return { isValid: true };
  }

  // Handle single numbers
  if (!/^\d+$/.test(trimmedValue)) {
    return { isValid: false, error: `${range.name}: Must be a number, range, list, step value, or *` };
  }

  const num = parseInt(trimmedValue);
  if (num < range.min || num > range.max) {
    return { isValid: false, error: `${range.name}: Must be between ${range.min} and ${range.max}` };
  }

  return { isValid: true };
};

// Main component
export default function CronExpressionClient() {
  const [cronExpression, setCronExpression] = useState('0 0 * * *');
  const [fields, setFields] = useState({
    minute: '0',
    hour: '0',
    dayOfMonth: '*',
    month: '*',
    dayOfWeek: '*'
  });
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<CronFieldType, string>>>({});
  const [copied, setCopied] = useState(false);
  const [description, setDescription] = useState('');
  const [isValid, setIsValid] = useState(true);

  // Preset expressions
  const presets = [
    { name: 'Every minute', expression: '* * * * *', description: 'Runs every minute' },
    { name: 'Every hour', expression: '0 * * * *', description: 'Runs at the beginning of every hour' },
    { name: 'Every day at midnight', expression: '0 0 * * *', description: 'Runs every day at 12:00 AM' },
    { name: 'Every day at noon', expression: '0 12 * * *', description: 'Runs every day at 12:00 PM' },
    { name: 'Every Monday at 9 AM', expression: '0 9 * * 1', description: 'Runs every Monday at 9:00 AM' },
    { name: 'Every month on 1st', expression: '0 0 1 * *', description: 'Runs on the first day of every month at midnight' },
    { name: 'Every weekday at 8 AM', expression: '0 8 * * 1-5', description: 'Runs Monday through Friday at 8:00 AM' },
    { name: 'Every 15 minutes', expression: '*/15 * * * *', description: 'Runs every 15 minutes' }
  ];

  // Generate human-readable description
  const generateDescription = (expression: string) => {
    const parts = expression.split(' ');
    if (parts.length !== 5) return 'Invalid cron expression';

    const [minute, hour, dayOfMonth, month, dayOfWeek] = parts;
    
    // Simple description generation
    let desc = 'Runs ';
    
    if (minute === '*' && hour === '*' && dayOfMonth === '*' && month === '*' && dayOfWeek === '*') {
      return 'Runs every minute';
    }
    
    if (minute.startsWith('*/')) {
      desc += `every ${minute.slice(2)} minutes`;
    } else if (minute === '*') {
      desc += 'every minute';
    } else if (minute.includes(',')) {
      desc += `at minutes ${minute}`;
    } else if (minute.includes('-')) {
      desc += `at minutes ${minute}`;
    } else {
      desc += `at minute ${minute}`;
    }
    
    if (hour !== '*') {
      if (hour.startsWith('*/')) {
        desc += ` of every ${hour.slice(2)} hours`;
      } else if (hour.includes(',')) {
        desc += ` of hours ${hour}`;
      } else if (hour.includes('-')) {
        desc += ` of hours ${hour}`;
      } else {
        desc += ` of hour ${hour}`;
      }
    }
    
    if (dayOfMonth !== '*') {
      if (dayOfMonth.includes(',')) {
        desc += ` on days ${dayOfMonth} of the month`;
      } else if (dayOfMonth.includes('-')) {
        desc += ` on days ${dayOfMonth} of the month`;
      } else {
        desc += ` on day ${dayOfMonth} of the month`;
      }
    }
    
    if (month !== '*') {
      if (month.includes(',')) {
        desc += ` in months ${month}`;
      } else if (month.includes('-')) {
        desc += ` in months ${month}`;
      } else {
        desc += ` in month ${month}`;
      }
    }
    
    if (dayOfWeek !== '*') {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      if (dayOfWeek.includes('-')) {
        const [start, end] = dayOfWeek.split('-');
        desc += ` on ${days[parseInt(start)] || start} through ${days[parseInt(end)] || end}`;
      } else if (dayOfWeek.includes(',')) {
        const dayList = dayOfWeek.split(',').map(d => days[parseInt(d.trim())] || d.trim()).join(', ');
        desc += ` on ${dayList}`;
      } else {
        desc += ` on ${days[parseInt(dayOfWeek)] || dayOfWeek}`;
      }
    }
    
    return desc;
  };

  // Validate all fields
  const validateAllFields = () => {
    const errors: Record<string, string> = {};
    let allValid = true;

    Object.entries(fields).forEach(([fieldName, value]) => {
      const validation = validateCronField(value, fieldName as CronFieldType);
      if (!validation.isValid) {
        errors[fieldName] = validation.error || 'Validation failed';
        allValid = false;
      }
    });

    setFieldErrors(errors);
    setIsValid(allValid);
    return allValid;
  };

  // Update cron expression when fields change
  useEffect(() => {
    const isFormValid = validateAllFields();
    
    if (isFormValid) {
      const newExpression = `${fields.minute} ${fields.hour} ${fields.dayOfMonth} ${fields.month} ${fields.dayOfWeek}`;
      setCronExpression(newExpression);
      setDescription(generateDescription(newExpression));
    } else {
      setDescription('Please fix validation errors to see description');
    }
  }, [fields]);

  // Handle field changes
  const handleFieldChange = (field: CronFieldType, value: string) => {
    setFields(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear specific field error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  // Apply preset
  type Preset = { name: string; expression: string; description: string };

  const applyPreset = (preset: Preset) => {
    const parts = preset.expression.split(' ');
    setFields({
      minute: parts[0],
      hour: parts[1],
      dayOfMonth: parts[2],
      month: parts[3],
      dayOfWeek: parts[4]
    });
    setFieldErrors({});
    setDescription(preset.description);
  };

  // Copy to clipboard
  const copyToClipboard = async () => {
    if (!isValid) {
      alert('Cannot copy invalid cron expression. Please fix validation errors first.');
      return;
    }

    try {
      await navigator.clipboard.writeText(cronExpression);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      alert('Failed to copy to clipboard');
    }
  };

  // Parse cron expression
  const [parseInput, setParseInput] = useState('');
  const [parseError, setParseError] = useState('');

  const parseCronExpression = () => {
    const trimmedInput = parseInput.trim();
    
    if (!trimmedInput) {
      setParseError('Please enter a cron expression to parse');
      return;
    }

    const parts = trimmedInput.split(/\s+/);
    
    if (parts.length !== 5) {
      setParseError('Cron expression must have exactly 5 fields (minute hour day month weekday)');
      return;
    }

    // Validate each part before applying
    const fieldNames = ['minute', 'hour', 'dayOfMonth', 'month', 'dayOfWeek'];
    const tempFields: Record<CronFieldType, string> = {} as Record<CronFieldType, string>;
    let hasValidationError = false;
    
    for (let i = 0; i < parts.length; i++) {
      const fieldName = fieldNames[i];
      const value = parts[i];
      const validation = validateCronField(value, fieldName as CronFieldType);
      
      if (!validation.isValid) {
        setParseError(`Invalid ${fieldName} field: ${validation.error}`);
        hasValidationError = true;
        break;
      }
      
      tempFields[fieldName as CronFieldType] = value;
    }

    if (!hasValidationError) {
      setFields(tempFields);
      setFieldErrors({});
      setParseError('');
      setParseInput('');
    }
  };

  // Reset fields
  const resetFields = () => {
    setFields({
      minute: '0',
      hour: '0',
      dayOfMonth: '*',
      month: '*',
      dayOfWeek: '*'
    });
    setFieldErrors({});
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
              <FiClock className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Cron Expression Builder
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Create and validate cron expressions with our visual builder. 
              Perfect for scheduling tasks, automated jobs, and system administration.
            </p>
          </div>

          {/* Validation Status */}
          {Object.keys(fieldErrors).length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <FiAlertCircle className="text-red-600" />
                <h3 className="font-semibold text-red-800">Validation Errors</h3>
              </div>
              <ul className="text-red-700 text-sm space-y-1">
                {Object.entries(fieldErrors).map(([field, error]) => (
                  <li key={field}>• {error}</li>
                ))}
              </ul>
            </div>
          )}

          {isValid && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2">
                <FiCheck className="text-green-600" />
                <span className="font-semibold text-green-800">Valid cron expression</span>
              </div>
            </div>
          )}

          {/* Quick Presets */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FiPlay className="text-indigo-600" />
              Quick Presets
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {presets.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => applyPreset(preset)}
                  className="p-3 text-left border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                >
                  <div className="text-sm font-medium text-gray-900">{preset.name}</div>
                  <div className="text-xs text-gray-500 mt-1 font-mono">{preset.expression}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Cron Expression Parser */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FiSettings className="text-indigo-600" />
              Parse Existing Expression
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Have an existing cron expression? Paste it here to parse it into individual fields.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cron Expression to Parse:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={parseInput}
                    onChange={(e) => {
                      setParseInput(e.target.value);
                      if (parseError) setParseError('');
                    }}
                    placeholder="e.g., 0 9 * * 1-5"
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono"
                  />
                  <button
                    onClick={parseCronExpression}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2 font-medium transition-colors"
                  >
                    <FiPlay />
                    Parse
                  </button>
                </div>
              </div>
              
              {parseError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <FiAlertCircle className="text-red-600 flex-shrink-0" />
                    <span className="text-red-700 text-sm">{parseError}</span>
                  </div>
                </div>
              )}
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <FiClock className="text-blue-600" />
                  <span className="font-medium text-blue-800">Examples to try:</span>
                </div>
                <div className="space-y-1 text-blue-700 text-sm">
                  <div><code className="bg-blue-100 px-2 py-1 rounded mr-2">0 */2 * * *</code> Every 2 hours</div>
                  <div><code className="bg-blue-100 px-2 py-1 rounded mr-2">15 14 1 * *</code> 2:15 PM on the 1st of every month</div>
                  <div><code className="bg-blue-100 px-2 py-1 rounded mr-2">0 22 * * 1-5</code> 10 PM Monday through Friday</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Builder */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FiSettings className="text-indigo-600" />
              Build Your Expression
            </h2>
            
            {/* Field Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              {Object.entries(fields).map(([fieldName, value]) => {
                const fieldConfig = {
                  minute: { label: 'Minute (0-59)', placeholder: '0', hint: '* = every' },
                  hour: { label: 'Hour (0-23)', placeholder: '0', hint: '*/2 = every 2' },
                  dayOfMonth: { label: 'Day (1-31)', placeholder: '*', hint: '1-15 = range' },
                  month: { label: 'Month (1-12)', placeholder: '*', hint: '1,3,5 = list' },
                  dayOfWeek: { label: 'Weekday (0-7)', placeholder: '*', hint: '0,7 = Sunday' }
                };

                const config = fieldConfig[fieldName as CronFieldType];
                const hasError = fieldErrors[fieldName as CronFieldType];

                return (
                  <div key={fieldName}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {config.label}
                    </label>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleFieldChange(fieldName as CronFieldType, e.target.value)}
                      placeholder={config.placeholder}
                      className={`w-full p-3 border rounded-lg font-mono transition-colors ${
                        hasError 
                          ? 'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-red-50' 
                          : 'border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                      }`}
                    />
                    <div className="text-xs text-gray-500 mt-1">{config.hint}</div>
                    {hasError && (
                      <div className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <FiAlertCircle className="w-3 h-3" />
                        {hasError}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Generated Expression */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Generated Cron Expression:
              </label>
              <div className="flex gap-2">
                <div className={`flex-1 p-4 rounded-lg border-2 border-dashed ${
                  isValid ? 'bg-gray-50 border-gray-300' : 'bg-red-50 border-red-300'
                }`}>
                  <code className={`text-lg font-mono ${isValid ? 'text-gray-900' : 'text-red-600'}`}>
                    {isValid ? cronExpression : 'Invalid expression'}
                  </code>
                </div>
                <button
                  onClick={copyToClipboard}
                  disabled={!isValid}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                    isValid
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {copied ? <FiRefreshCw className="text-white" /> : <FiCopy />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Human-Readable Description:
              </label>
              <div className={`p-4 border rounded-lg ${
                isValid ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
              }`}>
                <p className={isValid ? 'text-blue-800' : 'text-gray-600'}>{description}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={resetFields}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center gap-2 font-medium transition-colors"
              >
                <FiRefreshCw />
                Reset
              </button>
            </div>
          </div>

          {/* Cron Format Guide */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FiCalendar className="text-indigo-600" />
              Cron Format Guide
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Field Structure</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-4 py-2 text-left">Field</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Allowed Values</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Special Characters</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">Minute</td>
                        <td className="border border-gray-300 px-4 py-2">0-59</td>
                        <td className="border border-gray-300 px-4 py-2 font-mono">* , - /</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">Hour</td>
                        <td className="border border-gray-300 px-4 py-2">0-23</td>
                        <td className="border border-gray-300 px-4 py-2 font-mono">* , - /</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">Day of Month</td>
                        <td className="border border-gray-300 px-4 py-2">1-31</td>
                        <td className="border border-gray-300 px-4 py-2 font-mono">* , - / ? L W</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">Month</td>
                        <td className="border border-gray-300 px-4 py-2">1-12 or JAN-DEC</td>
                        <td className="border border-gray-300 px-4 py-2 font-mono">* , - /</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">Day of Week</td>
                        <td className="border border-gray-300 px-4 py-2">0-7 or SUN-SAT</td>
                        <td className="border border-gray-300 px-4 py-2 font-mono">* , - / ? L #</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Special Characters</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div><code className="bg-gray-100 px-2 py-1 rounded">*</code> - Any value</div>
                    <div><code className="bg-gray-100 px-2 py-1 rounded">?</code> - No specific value</div>
                    <div><code className="bg-gray-100 px-2 py-1 rounded">-</code> - Range (e.g., 1-5)</div>
                    <div><code className="bg-gray-100 px-2 py-1 rounded">,</code> - List (e.g., 1,3,5)</div>
                  </div>
                  <div className="space-y-2">
                    <div><code className="bg-gray-100 px-2 py-1 rounded">/</code> - Step values (e.g., */5)</div>
                    <div><code className="bg-gray-100 px-2 py-1 rounded">L</code> - Last day of month</div>
                    <div><code className="bg-gray-100 px-2 py-1 rounded">W</code> - Weekday</div>
                    <div><code className="bg-gray-100 px-2 py-1 rounded">#</code> - Nth occurrence</div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">💡 Common Examples</h4>
                <div className="space-y-1 text-yellow-700 text-sm">
                  <div><code className="bg-yellow-100 px-2 py-1 rounded">0 0 * * *</code> - Daily at midnight</div>
                  <div><code className="bg-yellow-100 px-2 py-1 rounded">0 */6 * * *</code> - Every 6 hours</div>
                  <div><code className="bg-yellow-100 px-2 py-1 rounded">0 9 * * 1-5</code> - Weekdays at 9 AM</div>
                  <div><code className="bg-yellow-100 px-2 py-1 rounded">0 0 1 * *</code> - First day of each month</div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Tools */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Developer Tools</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/tools/regex-tester" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiGitMerge className="text-indigo-600" />
                  <h3 className="font-semibold">Regex Tester</h3>
                </div>
                <p className="text-sm text-gray-600">Test and debug regular expressions</p>
              </Link>
              
              <Link href="/tools/color-converter" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiDroplet className="text-indigo-600" />
                  <h3 className="font-semibold">Color Converter</h3>
                </div>
                <p className="text-sm text-gray-600">Convert colors between formats</p>
              </Link>
              
              <Link href="/tools/base64-tool" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiLock className="text-indigo-600" />
                  <h3 className="font-semibold">Base64 Encoder</h3>
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