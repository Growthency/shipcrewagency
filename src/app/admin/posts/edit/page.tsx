import { redirect } from "next/navigation";
import PostEditor from "@/components/admin/PostEditor";

export default async function EditPostPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;
  const postId = Number(id);
  if (!id || Number.isNaN(postId)) redirect("/admin/posts");
  return <PostEditor postId={postId} />;
}
