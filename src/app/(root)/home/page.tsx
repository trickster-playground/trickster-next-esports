import TrendSideBar from "@/components/custom/TrendSideBar";
import PostEditor from "@/components/posts/editor/PostEditor";
import PostCard from "@/components/posts/PostCard";
import prisma from "@/lib/prisma";
import { postDataInclude } from "@/lib/types";
import { Metadata } from "next";
import React from "react";
import ForYouFeed from "../ForYouFeed";

export const metadata: Metadata = {
  title: "Home",
};

const HomePage = async () => {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        <ForYouFeed />
      </div>
      <TrendSideBar />
    </main>
  );
};

export default HomePage;
