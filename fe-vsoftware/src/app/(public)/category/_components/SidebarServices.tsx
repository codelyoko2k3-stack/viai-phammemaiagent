import Image from "next/image"
import { getEmojiForPost } from "@/lib/public-content"
import { Post } from "@/types"
import { AI_AGENT_SLUGS } from "@/constants/app.constants"

interface SidebarServicesProps {
  aiAgentPosts?: Post[]
}

const SidebarServices = ({ aiAgentPosts = [] }: SidebarServicesProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border-t-[3px] border-[#1E5BC6]">
      <div className="text-[11px] font-extrabold uppercase tracking-[.12em] text-[#1A1A1A] px-4 py-3.5 border-b border-gray-100">
        Phần mềm AI Agent
      </div>
      <div className="flex flex-col p-2.5">
        {aiAgentPosts.map((p) => {
          const href = `/${AI_AGENT_SLUGS}/${p.slug}`

          return (
            <a
              key={p.id}
              href={href}
              className="group flex gap-3 items-center p-2.5 rounded-md hover:bg-[#EBF1FB] transition-all duration-150"
            >
              <div className="relative w-10 h-10 rounded-xl flex-none overflow-hidden bg-[#EBF1FB] flex items-center justify-center">
                {p.logoUrl ? (
                  <Image
                    src={p.logoUrl}
                    alt={p.title}
                    fill
                    unoptimized
                    sizes="40px"
                    className="object-contain p-1"
                  />
                ) : (
                  <span className="text-lg">{getEmojiForPost(p.slug, p.title)}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <strong className="block text-[13px] font-bold text-[#1A1A1A] leading-snug group-hover:text-[#1E5BC6] transition-colors truncate">
                  {p.title}
                </strong>
                <span className="text-[11.5px] text-gray-500 block truncate">
                  {p.badge || p.excerpt || p.seoDescription || "Giải pháp AI Agent thông minh."}
                </span>
              </div>
            </a>
          )
        })}
        {aiAgentPosts.length === 0 && (
          <div className="text-center py-6 text-[12px] text-vs-gray-500">
            📭 Chưa có sản phẩm AI Agent nào.
          </div>
        )}
      </div>
    </div>
  )
}

export default SidebarServices
