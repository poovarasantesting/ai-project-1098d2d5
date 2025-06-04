import { CodeViewer } from "./components/CodeViewer";

export default function App() {
  const javaScriptExample = `// Example JavaScript function
function calculateSum(a, b) {
  return a + b;
}

// Using the function
const result = calculateSum(5, 10);
console.log("The sum is:", result);
`;

  const reactComponentExample = `// Example React component
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="counter">
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
    </div>
  );
}

export default Counter;`;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Simple Code Viewer</h1>
      
      <h2 className="text-xl font-semibold mt-8 mb-2">JavaScript Example</h2>
      <CodeViewer 
        code={javaScriptExample} 
        language="javascript"
        title="example.js" 
      />
      
      <h2 className="text-xl font-semibold mt-8 mb-2">React Component Example</h2>
      <CodeViewer 
        code={reactComponentExample} 
        language="jsx"
        title="Counter.jsx" 
      />
      
      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
        <h3 className="text-lg font-medium mb-2">How to use the CodeViewer component:</h3>
        <CodeViewer 
          code={`<CodeViewer 
  code={yourCodeString} 
  language="javascript" // or typescript, jsx, tsx, css, json
  showLineNumbers={true} // optional, defaults to true
  title="filename.js" // optional
/>`} 
          language="jsx"
          showLineNumbers={false}
        />
      </div>
    </div>
  );
}