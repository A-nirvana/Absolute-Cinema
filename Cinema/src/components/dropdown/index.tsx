import {
    ChevronDown,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";

interface DropDownProps {
    category: string;
    items: string[]
}

const DropdownMenuDemo: React.FC<DropDownProps> = ({ category, items }) => {
    const [opened, setOpened] = useState(false)
    return (
        <DropdownMenu onOpenChange={(open) => {
            setOpened(open)
        }}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost">{category}<ChevronDown className={opened ? `rotate-180 duration-100` : ``} /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Choose</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <ScrollArea className="h-40">
                        {items.map((item, key) => (
                            <DropdownMenuItem key={key}>
                                <span>{item}</span>
                            </DropdownMenuItem>
                        ))}
                    </ScrollArea>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DropdownMenuDemo
