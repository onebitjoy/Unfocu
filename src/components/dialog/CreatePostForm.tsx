// import ImageUploadTray from './ImageUploadTray'
// import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
// import { z } from 'zod'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
// import { PostFormValidation } from '@/lib/validation'
// import { usePostContext } from '@/context/PostContext'
// import { Models } from 'appwrite'
// import { Input } from '../ui/input'
// import { useUserContext } from '@/context/AuthContext'
// import { Textarea } from '../ui/textarea'
// import { Button } from '../ui/button'

// type PostFormProps = {
//   post?: Models.Document
// }

// export default function CreatePostForm({ post }: PostFormProps) {
//   const { user } = useUserContext()
//   const { screen, file } = usePostContext()

//   const form = useForm<z.infer<typeof PostFormValidation>>({
//     resolver: zodResolver(PostFormValidation),
//     defaultValues: {
//       file: [],
//       caption: post ? post?.caption : "",
//       location: post ? post?.location : "",
//       tags: post ? post?.tags.join(",") : "",
//     }
//   })

//   function onSubmit(values) {
//     console.log(values)
//     console.log("Create post form submitted!")
//   }

//   return (
//     <>
//       {/* TODO: Implement shadcn form */}
//       <Form {...form} >
//         <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full h-full">
//           {
//             // Screen: ImageUpload
//             screen === "upload" && <FormField control={form.control} name="file" render={({ field }) => (
//               <FormItem className="flex flex-col w-full h-full">
//                 <FormControl>
//                   <ImageUploadTray fieldChange={field.onChange} mediaUrl={post?.imageUrl} />
//                 </FormControl>
//               </FormItem>
//             )} />
//           }

//           {
//             // Screen : Image preview and Captions
//             screen === "caption" && (
//               <div className="flex lg:flex-row flex-col w-full h-full">

//                 {/* Carousel Part */}
//                 <div className="flex flex-1 justify-center items-center bg-black m-0 p-0">
//                   <Carousel className="m-0 p-0 w-full h-full">
//                     <CarouselContent className="h-full">
//                       {file?.map((imgfile, index) => (
//                         <CarouselItem key={index} className="flex justify-center items-center m-0 p-0 h-full">
//                           <img
//                             src={URL.createObjectURL(imgfile)}
//                             alt={`image-${index}`}
//                             className="w-full h-full object-contain"
//                           />
//                         </CarouselItem>
//                       ))}
//                     </CarouselContent>
//                     <div className='flex justify-end bg-transparent p-2 border'>
//                       <CarouselPrevious />
//                       <CarouselNext />
//                     </div>

//                   </Carousel>
//                 </div>

//                 {/* Caption Form Part */}
//                 <div className="flex flex-col p-4 border-gray-700 border-l w-full lg:w-[35%]">

//                   <div className='flex items-center gap-x-2 mb-4'>
//                     <img src={user.imageUrl} alt={user.name} height={24} width={24} className='rounded-full' />
//                     <p>{user.username}</p>
//                   </div>

//                   <div className='flex flex-col gap-y-4 h-full'>
//                     <FormField control={form.control} name="caption" render={({ field }) => (
//                       <FormItem >
//                         {/* <FormLabel className="text-white">Caption</FormLabel> */}
//                         <FormControl>
//                           <Textarea {...field} className='h-40' placeholder='write caption' />
//                         </FormControl>
//                       </FormItem>
//                     )} />

//                     <FormField
//                       control={form.control}
//                       name="location"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="text-white">Location</FormLabel>
//                           <FormControl>
//                             <Input placeholder="Enter location" {...field} className='' />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="tags"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="text-white">Tags</FormLabel>
//                           <FormControl>
//                             <Input placeholder='separated by commas(,)' {...field} className='' />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />
//                     <Button type="submit" className='ms-auto mt-2 w-20' >Submit</Button>
//                   </div>

//                 </div>

//               </div>
//             )
//           }
//         </form>
//       </Form>
//     </>
//   )

// }

import ImageUploadTray from './ImageUploadTray';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import { PostFormValidation } from '@/lib/validation';
import { usePostContext } from '@/context/PostContext';
import { Models } from 'appwrite';
import { Input } from '../ui/input';
import { useUserContext } from '@/context/AuthContext';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

type PostFormProps = {
  post?: Models.Document;
};

export default function CreatePostForm({ post }: PostFormProps) {
  const { user } = useUserContext();
  const { screen, file, setFile } = usePostContext(); // Make sure setFile exists
  const form = useForm<z.infer<typeof PostFormValidation>>({
    resolver: zodResolver(PostFormValidation),
    defaultValues: {
      file: post ? [post.imageUrl] : [], // default image if editing
      caption: post?.caption || "",
      location: post?.location || "",
      tags: post?.tags.join(",") || "",
    }
  });

  function onSubmit(values: z.infer<typeof PostFormValidation>) {
    console.log('Form values:', values);
    console.log('Create post form submitted!');
  }

  // Sync file upload changes into the form immediately
  function handleFileUpload(newFiles: File[]) {
    setFile(newFiles);                   // Update PostContext state
    form.setValue('file', newFiles);      // Also update react-hook-form field
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, (errors) => console.log('Validation Errors:', errors))} className="flex flex-col w-full h-full">

        {/* Upload Screen */}
        <FormField control={form.control} name="file" render={({ field }) => (
          <FormItem className={`"flex flex-col w-full h-full ${screen !== "upload" ? "hidden" : "block"}`}>
            <FormControl>
              <ImageUploadTray fieldChange={(files) => handleFileUpload(files)} mediaUrl={post?.imageUrl} />
            </FormControl>
          </FormItem>
        )} />


        {/* Caption Screen */}
        {screen === "caption" && (
          <div className="flex lg:flex-row flex-col w-full h-full">

            {/* Carousel */}
            <div className="flex flex-1 justify-center items-center bg-black">
              <Carousel className="w-full h-full">
                <CarouselContent className="h-full">
                  {file?.map((imgfile, index) => (
                    <CarouselItem key={index} className="flex justify-center items-center h-full">
                      <img
                        src={URL.createObjectURL(imgfile)}
                        alt={`image-${index}`}
                        className="w-full h-full object-contain"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-end bg-transparent p-2 border">
                  <CarouselPrevious />
                  <CarouselNext />
                </div>
              </Carousel>
            </div>

            {/* Caption and Details */}
            <div className="flex flex-col p-4 border-gray-700 border-l w-full lg:w-[35%]">
              <div className="flex items-center gap-2 mb-4">
                <img src={user.imageUrl} alt={user.name} height={24} width={24} className="rounded-full" />
                <p>{user.username}</p>
              </div>

              <div className="flex flex-col gap-4 h-full">
                <FormField control={form.control} name="caption" render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea {...field} className="h-40" placeholder="Write a caption..." />
                    </FormControl>
                  </FormItem>
                )} />

                <FormField control={form.control} name="location" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Location</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter location" />
                    </FormControl>
                  </FormItem>
                )} />

                <FormField control={form.control} name="tags" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Tags</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Separated by commas(,)" />
                    </FormControl>
                  </FormItem>
                )} />

                <Button type="submit" className="mt-2 ml-auto w-20">
                  Submit
                </Button>
              </div>
            </div>

          </div>
        )}
      </form>
    </Form>
  );
}
