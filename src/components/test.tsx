"use client";
import "@/styles/index.css";
import React, { useEffect, useState } from "react";
import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import Heading from "@tiptap/extension-heading";
import History from "@tiptap/extension-history";

export default function TipTap({
  description,
  onChange,
}: {
  description: string;
  onChange: (richText: string) => void;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        history: false,
      }),
      Heading.configure({
        HTMLAttributes: {
          class: "text-xl font-bold",
        },
        levels: [2],
      }),
      History.configure({
        newGroupDelay: 1000,
      }),
    ],
    content: description,
    editorProps: {
      attributes: {
        class:
          "rounded-md border min-h-[150px] border-input px-3 py-2  w-full rounded-md border border-input bg-transparent  text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring  md:text-base",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
      console.log(editor.getHTML());
    },
    // immediatelyRender: false, // Fix SSR hydration issues
  });
  if (!isClient) return null; // Prevent SSR mismatch
  return (
    <div className="flex flex-col justify-stretch min-h-[250px] space-y-4">
      {editor && editor.getText().length > 0 ? (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <Toolbar editor={editor} />
        </BubbleMenu>
      ) : (
        <Toolbar editor={editor} />
      )}

      <EditorContent editor={editor} />
    </div>
  );
}
