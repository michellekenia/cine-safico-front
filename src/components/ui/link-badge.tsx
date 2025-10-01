import * as React from "react"
import { Badge, badgeVariants } from "./badge"
import { cn } from "@/lib/utils"
import { ExternalLink } from "lucide-react"

export interface LinkBadgeProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "default" | "secondary" | "destructive" | "outline"
  showIcon?: boolean
}

function LinkBadge({ 
  className, 
  variant = "default", 
  href,
  target = "_blank",
  rel = "noopener noreferrer",
  showIcon = true,
  children,
  ...props 
}: LinkBadgeProps) {
  return (
    <a 
      href={href} 
      target={target}
      rel={rel}
      className={cn(
        badgeVariants({ variant }), 
        "group cursor-pointer inline-flex items-center gap-1",
        className
      )} 
      {...props}
    >
      {children}
      {showIcon && (
        <ExternalLink 
          className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity" 
        />
      )}
    </a>
  )
}

export { LinkBadge }
