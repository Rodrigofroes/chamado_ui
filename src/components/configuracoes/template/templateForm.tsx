import EditorTiptap from "@/components/tiptap";
import { Combobox } from "@/components/ui/combobox";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TIPO_EMAIL } from "@/lib/types/types";
import { EmailFormData } from "@/lib/validations/emaiilValidation";
import { UseFormReturn } from "react-hook-form";

interface TemplateFormProps {
    form: UseFormReturn<EmailFormData>;
}

export default function TemplateForm({ form }: TemplateFormProps) {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="nome"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                                <Input placeholder="Ex: Notificação do chamado" {...field} />
                            </FormControl>
                            <FormDescription>
                                Nome do template de e-mail.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="assunto"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Assunto</FormLabel>
                            <FormControl>
                                <Input placeholder="Ex: Novo comentário em seu chamado" {...field} />
                            </FormControl>
                            <FormDescription>
                                Assunto do template de e-mail.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <FormField
                control={form.control}
                name="tipo"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Tipo</FormLabel>
                        <FormControl>
                            <Combobox
                                items={TIPO_EMAIL.map((email) => {
                                    return { id: email.tipo, nome: email.descricao } as { id: string; nome: string; }
                                })}
                                onSelect={(item) => {
                                    field.onChange(item.id);
                                }}
                                value={field.value}
                            />
                        </FormControl>
                        <FormDescription>
                            Tipo do template de e-mail.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />


            <FormField
                control={form.control}
                name="corpo"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Corpo</FormLabel>
                        <FormControl>
                            <EditorTiptap content={field.value} onChange={field.onChange} />
                        </FormControl>
                        <FormDescription>
                            Corpo do template de e-mail.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

        </>
    );
}