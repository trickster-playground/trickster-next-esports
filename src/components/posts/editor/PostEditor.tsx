"use client";

import "./styles.css";

import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import UserAvatar from "@/components/custom/UserAvatar";

import { EditorContent, useEditor } from "@tiptap/react";
import { submitPost } from "./actions";
import { useSession } from "@/app/(root)/SessionProvider";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSubmitPostMutation } from "./mutations";
import LoadingButton from "@/components/custom/LoadingButton";

export default function PostEditor() {
  const { user } = useSession();

  const mutation = useSubmitPostMutation();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      Placeholder.configure({
        placeholder: "What's crack-a-lackin'?",
      }),
    ],
  });

  const input =
    editor?.getText({
      blockSeparator: "\n",
    }) || "";

  function onSubmit() {
    mutation.mutate(input, {
      onSuccess: () => {
        editor?.commands.clearContent();
      },
    });
  }

  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex items-center justify-center gap-5">
        <UserAvatar
          avatarUrl={user.avatarUrl}
          className="hidden border-2 border-primary sm:inline"
        />
        <EditorContent
          editor={editor}
          className={cn(
            "max-h-[20rem] w-full overflow-y-auto rounded-2xl border border-primary bg-background px-3 py-3",
            // isDragActive && "outline-dashed",
          )}
          // onPaste={onPaste}
        />
        <div className="hidden justify-end lg:flex">
          <LoadingButton
            onClick={onSubmit}
            loading={mutation.isPending}
            disabled={!input.trim()}
            className="min-w-20 px-3 py-3"
          >
            Submit
          </LoadingButton>
        </div>
      </div>
      <div className="justify-end sm:flex md:flex lg:hidden">
        <LoadingButton
          onClick={onSubmit}
          loading={mutation.isPending}
          disabled={!input.trim()}
          className="min-w-20 px-3 py-3"
        >
          Submit
        </LoadingButton>
      </div>
    </div>
  );
}
