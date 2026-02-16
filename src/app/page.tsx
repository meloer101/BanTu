import { getPosts } from "@/actions/post.action";
import { getDbUserId } from "@/actions/user.action";
import CreatePost from "@/components/CreatePost";
import PostCard from "@/components/PostCard";
import WhoToFollow from "@/components/WhoToFollow";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();
  let posts: Awaited<ReturnType<typeof getPosts>> = [];
  let dbUserId: string | null = null;

  try {
    const [postsResult, idResult] = await Promise.all([getPosts(), getDbUserId().catch(() => null)]);
    posts = postsResult;
    dbUserId = idResult;
  } catch (e) {
    console.error("Home: failed to load posts or user", e);
    // 不抛错，避免整页 500；页面仍可加载，Clerk 登录按钮可正常使用
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-6">
        {user ? <CreatePost /> : null}

        <div className="space-y-6">
          {posts.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              暂无动态。若刚部署，请确认 Vercel 已配置 DATABASE_URL 等环境变量。
            </p>
          )}
          {posts.map((post) => (
            <PostCard key={post.id} post={post} dbUserId={dbUserId} />
          ))}
        </div>
      </div>

      <div className="hidden lg:block lg:col-span-4 sticky top-20">
        <WhoToFollow />
      </div>
    </div>
  );
}
