import Link from "next/link";
import UserAvatar from "../custom/UserAvatar";

import { PostData } from "@/lib/types";
import { formatRelativeDate } from "@/lib/utils";

interface PostProps {
  post: PostData;
}

export default function PostCard({ post }: PostProps) {
  return (
    <article className="group/post space-y-3 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex gap-3">
        <div className="flex flex-wrap gap-3">
          <Link href={`/users/${post.user.username}`}>
            <UserAvatar avatarUrl={post.user.avatarUrl} />
          </Link>
        </div>
        <div>
          <Link
            href={`/users/${post.user.username}`}
            className="block font-medium first-letter:capitalize hover:underline"
          >
            {post.user.displayName}
          </Link>
          <Link
            href={`/posts/${post.id}`}
            className="block text-sm text-muted-foreground hover:underline"
            suppressHydrationWarning
          >
            {formatRelativeDate(post.createdAt)}
          </Link>
        </div>
      </div>
      <div className="whitespace-pre-line break-words px-2">{post.content}</div>
    </article>
  );
}
