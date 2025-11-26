import { Loader2 } from "lucide-react";

interface LoaderProps {
    texto?: string;
}

export default function Loader({ texto }: LoaderProps) {
    return (
        <div className="flex gap-2 text-sm items-center text-muted-foreground justify-center">
           <Loader2 className="animate-spin h-4 w-4" />
            {texto && <p>{texto}</p>}
        </div>
    )
}