import { PrioridadeFormData } from "@/lib/validations/prioridadeValidation";
import { UseFormReturn } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import EditorTiptap from "@/components/tiptap";
import { Input } from "@/components/ui/input";

interface PrioridadeFormProps {
    form: UseFormReturn<PrioridadeFormData>;
}

export default function PrioridadeForm({ form }: PrioridadeFormProps) {
    return (
        <div className="flex flex-col gap-2">
            <div className="grid grid-cols-2 w-full gap-4 ">
                <FormField
                    control={form.control}
                    name="nome"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                                <Input placeholder="Ex: Alta" {...field} />
                            </FormControl>
                            <FormDescription>
                                Insira o nome da prioridade.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="tempo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tempo de resolução (em horas)</FormLabel>
                            <FormControl>
                                <Input type="number" min={1} placeholder="Ex: 2" {...field}
                                    onChange={(e) => {
                                        field.onChange(parseInt(e.target.value));
                                    }}
                                />
                            </FormControl>
                            <FormDescription>
                                Insira o tempo estimado para resolução.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <FormField
                control={form.control}
                name="colorHex"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Cor</FormLabel>
                        <FormControl>
                            <Input type="color" placeholder="Ex: #FF0000" {...field} />
                        </FormControl>
                        <FormDescription>
                            Insira a cor.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="descricao"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Descrição</FormLabel>
                        <FormControl>
                            <EditorTiptap content={field.value} onChange={(value) => field.onChange(value)} />
                        </FormControl>
                        <FormDescription>
                            Insira a descrição.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}