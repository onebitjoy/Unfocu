import Loading from "@/components/Loading";
import PostCard from "@/components/shared/PostCard";
import { useGetRecentPosts } from "@/lib/react-query/queryMutation";
import { Models } from "appwrite";
import { Suspense } from "react";

function HomePage() {

  const { data: posts } = useGetRecentPosts()

  //  TODO : implement proper vertical scroll
  return (
    <main className="flex justify-center dark:bg-black w-full h-screen dark:text-white">
      {/* post feed section */}
      <div className="flex flex-col lg:mr-8">

        {/* Stories */}
        <div className="gap-2 grid grid-flow-col auto-cols-auto mx-auto my-4 w-dvw md:w-[600px] overflow-x-auto overscroll-contain">
          {
            Array
              .from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20])
              .map(
                (iter, index) => <div key={index} className="place-items-center grid bg-red-400/20 rounded w-40 h-20 gradient">
                  {iter}
                </div>
              )
          }
        </div>

        {/* Post Feed */}
        {/* TODO: remove border */}
        <div className="flex-1 w-full md:max-w-[600px] overflow-y-scroll">
          <div className="w-full h-full">
            <Suspense fallback={<Loading />}>
              <ul className="w-full">
                {
                  posts?.documents.map((post: Models.Document) => (
                    <li key={post.$id} className="mb-2 border-neutral-500/40 border-b w-full">
                      <PostCard post={post} />
                    </li>
                  ))
                }
              </ul>
            </Suspense>
          </div>
        </div>
      </div>

      {/* followers section */}
      <div className="hidden xl:block p-2 w-80">
        <div className="flex justify-between items-center mb-4">
          <p className="font-semibold text-neutral-300 text-sm">Suggested for you</p>
          <p className="font-bold text-neutral-100 hover:text-neutral-300 text-xs cursor-pointer">See All</p>
        </div>

        {/* follow list */}
        {Array.from(
          [
            { username: "PixelRider92", gender: "boy", follow: "Followed by StarHunter23" },
            { username: "NovaBlitzX", gender: "girl", follow: "Following NightWolf88" },
            { username: "EchoFrost7", gender: "boy", follow: "Followed by LunarDash01" },
            { username: "ShadowMango", gender: "girl", follow: "Following BlazeNova77" },
            { username: "ByteCraze42", gender: "boy", follow: "Followed by GhostCoder99" }
          ]
        )
          .map((user) => {
            return <div className="flex items-center mb-4">
              <img src={`https://avatar.iran.liara.run/public/` + user.gender} className="rounded-full size-[36px]" />
              <div className="flex flex-col flex-1 justify-center-center ml-2 h-full">
                <div className="text-[0.9rem]">{user.username}</div>
                <div className="text-[0.7rem] text-neutral-400">{user.follow}</div>
              </div>
              <button className="font-semibold text-blue-500 hover:text-white text-xs cursor-pointer">Follow</button>
            </div>
          })}

      </div>
    </main>
  )
}

export default HomePage