import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = [
  // Text Manipulation Tools
  'case-converter',
  'text-reverser', 
  'slug-converter',
  'find-replace',
  'word-counter',
  'text-splitter',
  'text-formatter',

  // Encoding/Decoding Tools
  'base64-tool',
  'html-encoder-decoder',
  'url-encoder-decoder',

  // Developer Tools
  'json-formatter',
  'css-formatter',
  'csv-formatter',
  'regex-tester',
  'diff-checker',
  'number-base-converter',
  'timezone-converter',
  'cron-expression',

  // Generators
  'qr-generator',
  'color-converter',
  'password-generator',
  'mock-json-generator',
  'api-code-generator',
  'bcrypt-tool',
  'lorem-ipsum',
];

  const toolPages = tools.map(tool => ({
    url: `https://freedevtools.dev/tools/${tool}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: 'https://freedevtools.dev',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://freedevtools.dev/tools',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...toolPages,
    {
      url: 'https://freedevtools.dev/feedback',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];
}