import { useEffect } from "react";
import { Navigate, Outlet } from "react-router"

const AuthLayout = () => {

  function burstCreator() {
    const container = document.querySelector(".animation-container") as HTMLElement | null
    const burst = document.querySelector(".burst") as HTMLElement | null
    const lines = document.querySelectorAll(".line") as NodeListOf<HTMLElement>;
    /* TODO: When using a dark mode, implement the colors as such */
    lines.forEach((line) => {
      const colors = [
        "#FF6B6B",
        "#6BCB77",
        "#4D96FF",
        "#FFD93D",
        "#A29BFE",
        "#FF9A8B",
        "#C0E0DE",
        "#F8B195",
        "#F67280",
        "#99B898"
      ];
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      line.style.background = randomColor;
    })

    if (burst) {
      burst.style.top = Math.random() * innerHeight + "px";
      burst.style.left = Math.random() * innerWidth + "px";
      const burstClone = burst.cloneNode(true)
      container?.appendChild(burstClone)
      setTimeout(() => {
        container?.removeChild(burstClone)
      }, 1000)
    }
  }

  useEffect(function () {
    const interval = setInterval(burstCreator, 200)
    return () => clearInterval(interval)
  }, [])

  const isUserAuthenticated = false

  return (
    <>
      {isUserAuthenticated ?
        <Navigate to="/" /> :
        <section className="flex flex-col flex-1 items-center justify-center">
          {/* Animation */}
          {/* <div className="animation-container">
            <div className="burst">
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
          </div> */}

          {/* ========================= */}
          {/* Outlet Box */}
          <div className="z-1000 flex flex-col justify-center items-center glassmorphism border-10 border-red-500">
            <div className="mt-16">
              <img src="/assets/Unfocu.png" alt="Unfocu Logo" className="w-20 h-20 sm:w-30 sm:h-30 md:w-40 md:h-40" />
            </div>
            <div className="z-1000">
              <Outlet />
            </div>
          </div>
        </section>}
    </>
  )
}

export default AuthLayout