import { Link } from "react-router-dom"
import { useState } from "react"

const Topbar = () => {

  const [searchValue, setSearchValue] = useState<string>("")

  // TODO : Implement Search
  function handleSearch() {
    console.log("search enter")
  }

  function handleSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value)
    console.log(e.target.value)
  }

  function handleSearchSubmit(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.code === "Enter") {
      handleSearch()
      setSearchValue("")
    }
  }


  return (
    <section className="md:hidden topbar flex justify-center dark:bg-black border border-blue-400 w-full">

      <div
        className="flex justify-between items-center py-1 w-full max-w-[1600px]">
        {/* left */}

        <Link to={"/"} className="pl-2">
          <img src="/assets/PixagramIcon.png" alt="logo" width={48} height={48} />
        </Link>

        {/* right */}
        <div className="flex items-center gap-x-2 sm:gap-x-5">
          <input
            className="bg-neutral-700 px-2 py-[4px] focus:border-none rounded-sm focus:outline-none w-50 sm:w-[268px] placeholder:font-light placeholder:text-neutral-400 placeholder:tracking-wide"
            placeholder="Search"
            value={searchValue}
            onChange={handleSearchInput}
            onKeyDown={handleSearchSubmit}
          />
          {/* messages icon */}
          <Link className="pr-4" to={"/notifications"}>
            <img src="/assets/icons/dark_notifications.png" alt="notifications" className="size-6" />
          </Link>
        </div>

      </div>

    </section >
  )
}

export default Topbar