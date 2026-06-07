import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Promptly — Turn rough thoughts into master prompts',
  description: 'Transform your rough ideas into polished, copy-paste-ready AI prompts optimized for ChatGPT, Claude, Gemini, Cursor, and GitHub Copilot.',
  keywords: ['AI prompts', 'prompt engineering', 'ChatGPT', 'Claude', 'Gemini'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
