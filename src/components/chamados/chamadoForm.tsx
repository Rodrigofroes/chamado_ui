import { ChamadoFormData } from "@/lib/validations/chamadoValidation";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { UsuarioEntidade } from "@/lib/types/entidades/usuarioEntidade";
import { Combobox } from "../ui/combobox";
import { PrioridadeEntidade } from "@/lib/types/entidades/prioridadeEntidade";
import EditorTiptap from "../tiptap";
import { TIPO_CHAMADO_STATUS } from "@/lib/types/types";

interface ChamadoFormProps {
    form: UseFormReturn<ChamadoFormData>;
    isLoadingUsuarios: boolean;
    isLoadingPrioridades: boolean;
    usuarios: UsuarioEntidade[] | null;
    prioridades?: PrioridadeEntidade[] | null;
}


export default function ChamadoForm({ form, isLoadingUsuarios, isLoadingPrioridades, usuarios, prioridades }: ChamadoFormProps) {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="usuarioId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Atribuir a um responsável</FormLabel>
                            <FormControl>
                                <Combobox
                                    items={usuarios || []}
                                    onSelect={(item) => field.onChange(item.id)}
                                    isLoading={isLoadingUsuarios}
                                    value={field.value || undefined}
                                />
                            </FormControl>
                            <FormDescription>
                                Selecione o usuário responsável por este chamado.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="prioridadeId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Prioridade</FormLabel>
                            <FormControl>
                                <Combobox
                                    items={prioridades?.map(prioridade => ({ id: prioridade.id, nome: prioridade.nome })) || []}
                                    onSelect={(item) => {
                                        field.onChange(item.id);
                                    }}
                                    value={field.value || undefined}
                                    isLoading={isLoadingPrioridades}
                                />
                            </FormControl>
                            <FormDescription>
                                Defina a prioridade deste chamado.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}

                />
            </div>

            <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Status</FormLabel>
                        <FormControl>
                            <Combobox
                                items={Object.keys(TIPO_CHAMADO_STATUS).map(key => ({ id: key, nome: TIPO_CHAMADO_STATUS[key as keyof typeof TIPO_CHAMADO_STATUS] }))}
                                onSelect={(item) => {
                                    field.onChange(item.id);
                                }}
                                value={field.value}
                            />
                        </FormControl>
                        <FormDescription>
                            Atualize o status do chamado.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="observacao"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Mensagem de resposta</FormLabel>
                        <FormControl>
                            <EditorTiptap content={field.value} onChange={field.onChange} />
                        </FormControl>
                        <FormDescription>
                            Escreva uma mensagem para atualizar o chamado.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    );
}