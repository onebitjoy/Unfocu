import { useThemeContext } from "@/context"

export default function Loading() {
  const { isDark } = useThemeContext()

  return (
    <div className="place-items-center grid w-full h-full">
      <div className={isDark ? `loadingboxdark` : `loadingbox`}></div>
    </div>
  )
}
