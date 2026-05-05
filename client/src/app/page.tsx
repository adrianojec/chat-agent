"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AsyncCallbackSet } from "next/dist/server/lib/async-callback-set";
import { SubmitEvent, useRef, useState } from "react";

type Answer = {
  summary: string;
  confidence: number;
};

export default function Home() {
  const [query, setQuery] = useState("");
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const textInput = query.trim();

    if (!textInput || loading) return;

    try {
      const result = await fetch(`/api/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: textInput }),
      });

      if (!result.ok) {
        throw new Error(result.statusText);
      }

      const data = await result.json();

      setAnswers((prev) => [data as Answer, ...prev]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-dvh w-full bg-zinc-50">
      <div className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-4 pb-24 pt-8">
        <header className="mb-4">
          <h1 className="text-xl font-semibold tracking-tight">
            Hello Agent - Ask me anything
          </h1>
        </header>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Answers</CardTitle>
          </CardHeader>
          <CardContent>
            {answers.length === 0 ? (
              <p className="text-sm text-zinc-600">
                No answers yet. Ask a question below
              </p>
            ) : (
              answers.map((answer, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-zinc-200 p-4"
                >
                  <div className="text-sm leading-6">{answer.summary}</div>
                  <div className="mt-1 text-xs text-zinc-500">
                    Confidence: {answer.confidence.toFixed(2)}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="fixed inset-x-0 bottom-0 mx-auto w-full max-w-2xl px-4 py-4 backdrop:blur"
        >
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={query}
              onChange={(evt) => setQuery(evt.target.value)}
              placeholder="Ask me anything"
              disabled={loading}
              className="h-11"
            />

            <Button type="submit" disabled={loading} className="h-11">
              {loading ? "Thinking..." : "Ask"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
