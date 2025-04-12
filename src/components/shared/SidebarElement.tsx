const SidebarElement = ({ icon, label }: { icon: string, label: string }) => {
  // TODO: use page navigation data to boldify the current page and the element
  return (
    <button className={`flex items-center self-center lg:gap-x-3 hover:bg-gray-200 lg:m-[8px] md:my-[12px] md:p-2 lg:p-[12px] ps-4 rounded lg:w-full cursor-pointer ${label === "settings" ? "md:mt-auto md:mb-0 lg:mt-auto" : ""}`}>
      < img className='size-12 md:size-8 lg:size-6' src={icon} alt={label} />
      <h2 className='hidden lg:block font-medium text-sm capitalize' >{label}</h2>
    </button >
  )
}

export default SidebarElement