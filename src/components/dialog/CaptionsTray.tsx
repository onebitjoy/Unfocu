import { useUserContext } from "@/context/AuthContext"
import { FormControl, FormField, FormItem } from "../ui/form"
import { Input } from "../ui/input"

function CaptionsTray({ form }) {
  return (
    <div className="flex flex-col p-4 border-gray-700 border-l w-full lg:w-[35%]">
      <FormField control={form.control} name="caption" render={({ field }) => (
        <FormItem className="flex flex-col h-full">
          <FormControl>
            <Input />
          </FormControl>
        </FormItem>
      )} />
    </div>
  )
}

export default CaptionsTray
