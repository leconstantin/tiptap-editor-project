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
  Youtube,
  SquareSplitVertical,
  BetweenHorizonalStart,
  BetweenHorizonalEnd,
} from "lucide-react";
import { Toggle } from "./ui/toggle";
import { Input } from "./ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import React from "react";

type Props = {
  editor: Editor | null;
};
export default function Toolbar({ editor }: Props) {
  const [height, setHeight] = React.useState(480);
  const [width, setWidth] = React.useState(640);
  const [url, setUrl] = React.useState("");

  const addYoutubeVideo = () => {

    if (url) {
      editor?.commands.setYoutubeVideo({
        src: url,
        width: Math.max(320, Number(width)) || 640,
        height: Math.max(180, Number(height)) || 480,
      });
    }
  };
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
          <Dialog>
            <DialogTrigger asChild>
              <Toggle size="sm">
                <Youtube className="h-4 w-4" />
              </Toggle>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add video</DialogTitle>
                <DialogDescription>
                  Make changes to your inputs so as to add your video.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Url
                  </Label>
                  <Input
                    id="url"
                    placeholder="https://www.youtube.com/watch?v=s0ab0CdGWMo"
                    value={url}
                    onChange={(event) => setUrl(event.target.value)}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Width
                  </Label>
                  <Input
                    id="width"
                    type="number"
                    min="320"
                    max="1024"
                    placeholder="width"
                    value={width}
                    onChange={(event) => setWidth(Number(event.target.value))}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Height
                  </Label>
                  <Input
                    id="height"
                    type="number"
                    min="180"
                    max="720"
                    placeholder="height"
                    value={height}
                    onChange={(event) => setHeight(Number(event.target.value))}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={addYoutubeVideo}>Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
       
        

        {editor.isActive("taskList") && (
          <div>
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
          </div>
        )}
      </div>
    </div>
  );
}
