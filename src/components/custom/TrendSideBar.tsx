import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { userDataSelect } from "@/lib/types";
import { Loader2 } from "lucide-react";
import React, { Suspense } from "react";
import UserAvatar from "./UserAvatar";
import Link from "next/link";
import { unstable_cache } from "next/cache";
import { formatNumber } from "@/lib/utils";

export default function TrendsSideBar() {
  return (
    <div className="sticky top-[5.25rem] hidden h-fit w-72 flex-none space-y-5 md:block lg:w-80">
      <Suspense fallback={<Loader2 className="mx-auto animate-spin" />}>
        <WhoToFollow />
        <TrendingTopics />
      </Suspense>
    </div>
  );
}

async function WhoToFollow() {
  const { user } = await validateRequest();

  if (!user) return null;

  const usersToFollow = await prisma.user.findMany({
    where: {
      NOT: {
        id: user.id,
      },
    },
    select: userDataSelect,
    take: 5,
  });

  return (
    <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex text-xl font-bold md:justify-start lg:justify-center">
        Who to follow
      </div>
      {usersToFollow.map((user) => (
        <div key={user.id} className="flex items-center justify-between gap-3">
          <Link
            href={`/users/${user.username}`}
            className="flex items-center gap-3"
          >
            <UserAvatar avatarUrl={user.avatarUrl} className="flex-none" />
            <div>
              <h1 className="line-clamp-1 break-all text-lg font-semibold hover:text-sky-500 hover:underline">
                <p className="first-letter:capitalize">{user.displayName}</p>
              </h1>
              <p className="line-clamp-1 break-all text-sm text-muted-foreground">
                @{user.username}
              </p>
            </div>
          </Link>
          {/* <FollowButton
            userId={user.id}
            initialState={{
              followers: user._count.followers,
              isFollowedByUser: user.followers.some(
                ({ followerId }) => followerId === user.id,
              ),
            }}
          /> */}
        </div>
      ))}
    </div>
  );
}

const getTrendingTopics = unstable_cache(
  async () => {
    try {
      const result = await prisma.$queryRaw<
        { hashtag: string; count: bigint }[]
      >`
        SELECT LOWER(unnest(regexp_matches(content, '#[[:alnum:]_]+', 'g'))) AS hashtag, COUNT(*) AS count
        FROM posts
        GROUP BY (hashtag)
        ORDER BY count DESC, hashtag ASC 
        LIMIT 5
      `;

      if (process.env.NODE_ENV === "development") {
        console.debug(result); // Menggunakan console.debug alih-alih log biasa
      }

      return result.map((row) => ({
        hashtag: row.hashtag,
        count: Number(row.count),
      }));
    } catch (error) {
      console.error("Error fetching trending topics:", error);
      return [];
    }
  },
  ["trending_topics"],
  {
    revalidate: 3 * 60 * 60,
  },
);

async function TrendingTopics() {
  const trendingTopics = await getTrendingTopics();

  return (
    <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="text-xl font-bold">Trending topics</div>
      {trendingTopics.map(({ hashtag, count }) => {
        const title = hashtag.split("#")[1];

        return (
          <Link key={title} href={`/hashtag/${title}`} className="block">
            <p
              className="line-clamp-1 break-all font-semibold hover:underline"
              title={hashtag}
            >
              {hashtag}
            </p>
            <p className="text-sm text-muted-foreground">
              {formatNumber(count)} {count === 1 ? "post" : "posts"}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
