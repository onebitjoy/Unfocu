import Loading from "@/components/Loading";

function HomePage() {
  const isPostLoading = true;

  return (
    <main className="flex justify-center dark:bg-black border border-red-400 w-full dark:text-white">
      {/* post feed section */}
      <div className="flex flex-col lg:mr-8 border border-blue-400/50">

        {/* Stories */}
        <div className="gap-2 grid grid-flow-col auto-cols-auto mx-auto w-dvw sm:w-120 md:w-140 overflow-x-auto overscroll-contain">
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
        <div className="border w-full min-h-max grow">
          {isPostLoading ? <Loading /> : <p className="text-white">Post loaded</p>}
        </div>
      </div>

      {/* followers section */}
      <div className="hidden xl:block border border-yellow-400/50 w-80">
        followers
      </div>
    </main>
  )
}

export default HomePage