"use client"

import * as React from "react"
import {
  BookOpen,
  Home,
  Settings2,
} from "lucide-react"

import { NavMain } from "~/components/nav-main"
import { NavUser } from "~/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "~/components/ui/sidebar"
import { authClient } from "~/lib/auth-client"
import { NavUserProps } from "~/lib/types"
import { Skeleton } from "./ui/skeleton"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Documentation",
      url: "/docs",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "/docs#intro",
        }
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/settings#general",
        }
      ],
    },
  ]

}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {
    data: session,
    isPending,
    error,
  } = authClient.useSession()

  const sessionProps = {
    user: {
      name: session?.user.name,
      email: session?.user.email,
      avatar: session?.user.image,
    }
  } as NavUserProps

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {error || isPending ?
          <Skeleton className="w-full h-12" />
          :

          <NavUser user={sessionProps.user} />
        }
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
