"use client";

import "@/styles/index.css";
import React, { useEffect, useState } from "react";
import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import Heading from "@tiptap/extension-heading";
import History from "@tiptap/extension-history";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";

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
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ],
    content: description,
    editorProps: {
      attributes: {
        class:
          "rounded-md border min-h-[150px] border-input px-3 py-2 w-full bg-transparent text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-base",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    immediatelyRender: false
  });

  if (!isClient) return null; // Prevent SSR mismatch

  return (
    <div className="flex flex-col justify-stretch min-h-[250px] space-y-4">
      {editor && !editor.isDestroyed && editor.getText().length > 200 && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 1000 }}>
          <Toolbar editor={editor} />
        </BubbleMenu>
      )}
      {editor && <Toolbar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
}
