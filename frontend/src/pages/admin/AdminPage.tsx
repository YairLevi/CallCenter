import { SuggestedTasksSection } from "@/pages/admin/SuggestedTasksSection.tsx";
import { ResponsiveSeparator } from "@/components/responsive-separator.tsx";
import { TagsSection } from "@/pages/admin/TagsSection.tsx";

export function AdminPage() {
  return (
    <>
      <div className="p-8 flex lg:flex-row flex-col items-center gap-4 h-full w-full">
        <TagsSection/>
        <ResponsiveSeparator/>
        <SuggestedTasksSection/>
      </div>
    </>
  )
}
