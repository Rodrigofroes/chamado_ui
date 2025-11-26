"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import Loader from "../loader"

interface ComboboxProps<T extends { id: string; nome: string }> {
    items: T[];
    onSelect: (item: T) => void;
    value?: string;
    isLoading?: boolean;
}

export function Combobox<T extends { id: string; nome: string }>({
    items,
    onSelect,
    value,
    isLoading,
}: ComboboxProps<T>) {
    const [open, setOpen] = React.useState(false);

    const selectedItem = items.find((item) => item.id === value);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        "w-full justify-between",
                        !value && "text-muted-foreground"
                    )}

                >
                    {selectedItem ? selectedItem.nome : "Selecione..."}
                    <ChevronsUpDown className="opacity-50 h-4 w-4 shrink-0" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="start">
                <Command>
                    <CommandInput placeholder="Pesquisar..." className="h-9" />
                    <CommandList>
                        {isLoading ? (
                            <div className="flex items-center justify-center p-4 text-muted-foreground">
                                <Loader texto="Carregando..." />
                            </div>
                        ) : (
                            <>
                                <CommandEmpty>Nenhum item encontrado.</CommandEmpty>
                                <CommandGroup>
                                    {items.map((item) => (
                                        <CommandItem
                                            key={item.id}
                                            value={item.nome}
                                            onSelect={() => {
                                                onSelect(item);
                                                setOpen(false);
                                            }}
                                        >
                                            {item.nome}
                                            <Check
                                                className={cn(
                                                    "ml-auto h-4 w-4",
                                                    value === item.id ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
