import { useState } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Textarea } from "./components/ui/textarea";
import { FileText, Hash, AlertCircle, Type, Clock } from "lucide-react";

export default function App() {
  const [text, setText] = useState("");

  // Calculate text statistics
  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const characters = text.length;
  const charactersExcludingSpaces = text.replace(/\s+/g, "").length;
  const paragraphs = text.trim() === "" ? 0 : text.trim().split(/\n+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(words / 225)); // Average reading speed of 225 WPM

  const handleClear = () => {
    setText("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Word Count App
          </h1>
          <p className="mt-2 text-gray-600">
            Count words, characters, and analyze your text
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Text</CardTitle>
            <CardDescription>
              Type or paste your text below to get statistics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Start typing or paste your text here..."
              className="min-h-[200px]"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="mt-4 flex justify-end">
              <Button variant="outline" onClick={handleClear}>
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Words</CardTitle>
              <Type className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{words}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Characters</CardTitle>
              <Hash className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{characters}</div>
              <p className="text-xs text-gray-500">
                {charactersExcludingSpaces} without spaces
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Paragraphs</CardTitle>
              <FileText className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{paragraphs}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Reading Time</CardTitle>
              <Clock className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{readingTime} min</div>
              <p className="text-xs text-gray-500">
                Based on 225 WPM
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}