"use client"

import Link from "next/link"
import { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { usePathname } from "next/navigation"

interface NavProps {
  links: {
    title: string
    href: string
    label?: string
    icon: LucideIcon
    action?:()=>void
    variant: "default" | "ghost"
  }[]
}



export function NavCollapsed({ links}: NavProps) {

  let pathName = usePathname()

  return (
    <TooltipProvider>
     
        <nav className="grid gap-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]">
          {links.map((link, index) =>
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    onClick={link.action}
                    className={cn(
                      buttonVariants({ variant: link.href === pathName ? 'default' : 'ghost', 
                      size: "icon" }),
                      "h-9 w-9",
                      link.variant === "default" &&
                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                    )}
                  >
                    <link.icon className="h-5 w-5" />
                    <span className="sr-only">{link.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="flex items-center gap-4">
                  {link.title}
                  {link.label && (
                    <span className="ml-auto text-muted-foreground">
                      {link.label}
                    </span>
                  )}
                </TooltipContent>
              </Tooltip>
          )}
        </nav>
     
    </TooltipProvider>
  )
}