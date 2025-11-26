import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { AbrirChamadoFormData } from "@/lib/validations/chamadoValidation";
import { Combobox } from "../ui/combobox";
import { TIPO_CHAMADO } from "@/lib/types/types";
import EditorTiptap from "../tiptap";
import Documentos from "../ui/documentos";

interface AbrirChamadoFormProps {
    form: UseFormReturn<AbrirChamadoFormData>;
}

export default function AbrirChamadoForm({ form }: AbrirChamadoFormProps) {
    return (
        <div className="flex flex-col gap-4">
            <FormField
                control={form.control}
                name="titulo"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Título do Chamado</FormLabel>
                        <FormControl>
                            <Input placeholder="Ex: Problema ao acessar a conta" {...field} />
                        </FormControl>
                        <FormDescription>
                            Informe um título claro e objetivo para o chamado.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="tipo"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Tipo do Chamado</FormLabel>
                        <FormControl>
                            <Combobox
                                items={Object.keys(TIPO_CHAMADO).map(key => ({ id: key, nome: TIPO_CHAMADO[key as keyof typeof TIPO_CHAMADO] }))}
                                onSelect={(item) => {
                                    field.onChange(item.id);
                                }}
                                value={field.value}
                            />
                        </FormControl>
                        <FormDescription>
                            Selecione o tipo que melhor descreve o seu problema.
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
                        <FormLabel>Descrição do Chamado</FormLabel>
                        <FormControl>
                            <EditorTiptap onChange={field.onChange} />
                        </FormControl>
                        <FormDescription>
                            Forneça uma descrição detalhada do problema que você está enfrentando.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="documentos"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Anexos</FormLabel>
                        <FormControl>
                            <Documentos
                                maxFiles={6}
                                onChange={field.onChange}
                            />
                        </FormControl>
                        <FormDescription>
                            Anexe quaisquer documentos ou imagens relevantes ao chamado.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}