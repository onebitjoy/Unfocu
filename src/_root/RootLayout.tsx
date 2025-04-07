import { Button } from "@/components/ui/button"

export const RootLayout = () => {

  function clicked() {
    console.log("clicked")
  }

  return (
    <main>
      <div>Root layout</div>
      <Button onClick={clicked} variant={"ghost"}>Click me!</Button>
    </main>
  )
}
