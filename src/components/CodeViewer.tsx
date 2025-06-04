import { useState, useEffect, useRef } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css";
import "prismjs/components/prism-json";
import { Check, Copy } from "lucide-react";

interface CodeViewerProps {
  code: string;
  language?: "javascript" | "typescript" | "jsx" | "tsx" | "css" | "json";
  showLineNumbers?: boolean;
  title?: string;
}

export function CodeViewer({
  code,
  language = "javascript",
  showLineNumbers = true,
  title,
}: CodeViewerProps) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, language]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  const lineNumbersClass = showLineNumbers ? "line-numbers" : "";

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 my-4">
      {title && (
        <div className="px-4 py-2 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
          <span className="font-mono text-sm text-gray-600 dark:text-gray-400">
            {title}
          </span>
          <button
            onClick={copyToClipboard}
            className="p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            aria-label="Copy code"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            )}
          </button>
        </div>
      )}
      <div className="p-4 overflow-x-auto">
        <pre className={`${lineNumbersClass} language-${language}`} ref={codeRef}>
          <code className={`language-${language}`}>{code}</code>
        </pre>
      </div>
    </div>
  );
}