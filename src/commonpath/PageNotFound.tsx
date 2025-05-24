import { Link } from "react-router-dom"

const PageNotFound = () => {
  return (
    <div className="place-items-center grid w-full h-full text-white">
      <div>
        <h1 className="mb-2 font-bold text-2xl text-center">Sorry, this page isn't available.</h1>
        <h3>The link you followed may be broken, or the page may have been removed.
          <Link to={"/"} className="ml-2 text-blue-500 hover:underline hover:underline-offset-4">
            Go back to Pixagram.
          </Link>
        </h3>
      </div>
    </div>
  )
}

export default PageNotFound