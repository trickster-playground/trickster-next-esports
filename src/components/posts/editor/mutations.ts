import { useToast } from "@/components/ui/use-toast";
import { PostsPage } from "@/lib/types";
import { submitPost } from "./actions";
import { useSession } from "@/app/(root)/SessionProvider";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export function useSubmitPostMutation() {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const { user } = useSession();

  const mutation = useMutation({
    mutationFn: submitPost,
    onSuccess: async (newPost) => {
      const queryFilter = {
        queryKey: ["post-feed"],
        predicate(query) {
          return (
            query.queryKey.includes("for-you") ||
            (query.queryKey.includes("user-posts") &&
              query.queryKey.includes(user.id))
          );
        },
      } satisfies QueryFilters;

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilter,
        (oldData) => {
          const firstPage = oldData?.pages[0];

          if (firstPage) {
            return {
              pageParams: oldData.pageParams,
              pages: [
                {
                  posts: [newPost, ...firstPage.posts],
                  nextCursor: firstPage.nextCursor,
                },
                ...oldData.pages.slice(1),
              ],
            };
          }
        },
      );

      queryClient.invalidateQueries({
        queryKey: queryFilter.queryKey,
        predicate(query) {
          return queryFilter.predicate(query) && !query.state.data;
        },
      });

      toast({
        title: "Post created successfully.",
      });
    },
    onError(error) {
      console.error(error);
      toast({
        title: "Failed to post. Please try again.",
        variant: "destructive",
      });
    },
  });

  return mutation;
}
