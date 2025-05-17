'use client'
import { usePathname } from "next/navigation"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "./ui/breadcrumb"
import Link from "next/link"
import React from "react"
import { cn } from "~/lib/utils"

export function NavBreadcrumb() {
    const paths = usePathname()
    const pathNames = paths.split('/').filter(path => path)

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {
                    pathNames.map((name: string, index) => {
                        let href = `/${pathNames.slice(0, index + 1).join('/')}`
                        let isActive = href === paths
                        let styling = ""
                        if (isActive) {
                            styling = "text-accent-foreground"
                        }
                        return (
                            <React.Fragment key={index}>
                                <BreadcrumbItem>
                                    <BreadcrumbLink className={cn( "text-base" , styling)} href={href}>{name[0].toUpperCase() + name.slice(1, name.length + 1)} </BreadcrumbLink>
                                </BreadcrumbItem>
                                {pathNames.length !== index + 1 && <BreadcrumbSeparator />}
                            </React.Fragment>
                        )
                    } )
                }
            </BreadcrumbList>
        </Breadcrumb>
    )
}
