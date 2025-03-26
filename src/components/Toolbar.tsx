"use client";
import { type Editor } from "@tiptap/react";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Undo2,
  Redo2,
  ListTodo,
  SquareSplitVertical,
  BetweenHorizonalStart,
  BetweenHorizonalEnd,
} from "lucide-react";
import { Toggle } from "./ui/toggle";

type Props = {
  editor: Editor | null;
};
export default function Toolbar({ editor }: Props) {
  if (!editor) return null;

  return (
    <div className="border border-input bg-transparent rounded bg-white">
      <div className="flex justify-between p-0.5">
        <div>
          <Toggle
            size="sm"
            pressed={editor.isActive("heading")}
            onPressedChange={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            <Heading2 className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor.isActive("bold")}
            onPressedChange={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor.isActive("italic")}
            onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor.isActive("strike")}
            onPressedChange={() => editor.chain().focus().toggleStrike().run()}
          >
            <Strikethrough className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor.isActive("bulletList")}
            onPressedChange={() =>
              editor.chain().focus().toggleBulletList().run()
            }
          >
            <List className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor.isActive("orderList")}
            onPressedChange={() =>
              editor.chain().focus().toggleOrderedList().run()
            }
          >
            <ListOrdered className="h-4 w-4" />
          </Toggle>

          <Toggle
            size="sm"
            pressed={editor.isActive("taskList")}
            onPressedChange={() =>
              editor.chain().focus().toggleTaskList().run()
            }
          >
            <ListTodo className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor.isActive("undo")}
            onPressedChange={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
          >
            <Undo2 className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor.isActive("redo")}
            onPressedChange={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
          >
            <Redo2 className="h-4 w-4" />
          </Toggle>
        </div>
        <div>
          {editor.isActive("taskList") && (
            <>
              <Toggle
                size="sm"
                pressed={editor.isActive("splitTaskItem")}
                onPressedChange={() =>
                  editor.chain().focus().splitListItem("taskItem").run()
                }
              >
                <SquareSplitVertical className="h-4 w-4" />
              </Toggle>

              <Toggle
                size="sm"
                pressed={editor.isActive("sinkTaskItem")}
                onPressedChange={() =>
                  editor.chain().focus().sinkListItem("taskItem").run()
                }
              >
                <BetweenHorizonalStart className="h-4 w-4" />
              </Toggle>
              <Toggle
                size="sm"
                pressed={editor.isActive("liftTaskItem")}
                onPressedChange={() =>
                  editor.chain().focus().liftListItem("taskItem").run()
                }
              >
                <BetweenHorizonalEnd className="h-4 w-4" />
              </Toggle>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
