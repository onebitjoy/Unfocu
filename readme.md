# Technologies used

### Languages - 
  HTML(JSX), CSS(Tailwind), TypeScript

### Tech Stack -
  1. React
  2. React Router
  3. Shadcn UI + Zod (Form Validation and Accessible UI)
  4. Tailwind (CSS)
  5. Appwrite (BaAS)

### Development Tools -
  1. VS Code
  2. Vite
  3. Git
  4. Linux
  5. Render
  6. Cloudflare Pages
  7. Took help from chatGPT

### Problems Arose? 
  1. Problem: Since I was following instagram's UI, I didn't want to create another routing page.

    Solution: I used `dialog` tag from HTML DOM(JSX in this case) - researched and found that `dialog` tag is [Baseline Available since 2022](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog)

  2. Problem: The [tutorial](https://youtu.be/_W3R2VwRyF4) I was following didn't allow multiple file uploads.  
  
    Solution: Since the uploads were atomic, I used Promise.all() to upload ->  get file previews -> create post, with *Error Handling*.



### Standards Followed?
  1. Followed Instagram's UI behavior for different screen sizes
  2. ShadCN components

### Others
  1. Form using React Hook Form and validation using Zod(both inbuilt in Shadcn)
  2. Multiple file upload(Promise.all method)
  3. Optimistic UI updates
  4. Messaging(Probably, due to restriction)


## References

### UI breakpoints
| Breakpoint Range     | Device Target              | UI Behavior Notes                                                                 | Tailwind Equivalent |
|----------------------|----------------------------|------------------------------------------------------------------------------------|----------------------|
| `<= 480px`           | Mobile (portrait phones)   | Full mobile layout: stacked content, bottom nav, minimal padding                  | `< sm`              |
| `481px – 767px`      | Larger phones / small tablets | Slightly more spacing, same mobile-first layout                                | `< md`              |
| `768px – 1023px`     | Tablets (landscape)        | Feed takes more space, side nav may appear, padding increases                     | `md`                |
| `1024px – 1279px`    | Small desktops/laptops     | Left-side nav bar appears, center-aligned feed, stories bar across the top       | `lg`                |
| `1280px – 1439px`    | Standard desktops          | Multi-column layout: feed, stories, messages/sidebar (if signed in)              | `xl`                |
| `>= 1440px`          | Large desktops / widescreens | More spacing around content, modals/DMs appear in-center rather than full screen | `2xl`               |

### Docs
  1. [Google's web.dev](https://web.dev/)
  2. [Mozilla Developer Network](https://developer.mozilla.org/en-US/)
  3. [Tailwind](https://tailwindcss.com/docs/)