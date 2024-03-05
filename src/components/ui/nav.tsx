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
    variant: "default" | "ghost"
  }[]
}



export function Nav({ links}: NavProps) {

  let pathName = usePathname()

  return (
    <TooltipProvider>
     
        <nav className="grid gap-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]">
          {links.map((link, index) =>
              <Link
                key={index}
                href={link.href}
                className={cn(
                  buttonVariants({ variant: link.href === pathName ? 'default' : 'ghost', }),
                  link.variant === "default" &&
                    "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                  "justify-start gap-2 w-[250px]"
                )}
              >
                <link.icon className="mr-2 h-5 w-5" />
                {link.title}
                {link.label && (
                  <span
                    className={cn(
                      "ml-auto",
                      link.variant === "default" &&
                        "text-background dark:text-white"
                    )}
                  >
                    {link.label}
                  </span>
                )}
              </Link>
            
          )}
        </nav>
     
    </TooltipProvider>
  )
}