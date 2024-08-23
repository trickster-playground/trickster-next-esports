"use server";

import prisma from "@/lib/prisma";
import { validateRequest } from "@/auth";
import { createPostSchema } from "@/lib/validation";
import { postDataInclude } from "@/lib/types";

export async function submitPost(input: string) {
  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthorized");

  const { content } = createPostSchema.parse({ content: input });

  const newPost = await prisma.post.create({
    data: {
      content,
      userId: user.id,
      // attachments: {
      //   connect: mediaIds.map((id) => ({ id })),
      // },
    },
    include: postDataInclude,
  });

  return newPost;
}
