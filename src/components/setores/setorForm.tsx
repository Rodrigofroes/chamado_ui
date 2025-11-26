import { UsuarioEntidade } from "@/lib/types/entidades/usuarioEntidade";
import { SetorDataForm } from "@/lib/validations/setorValidation";
import { UseFormReturn } from "react-hook-form";
import { Combobox } from "../ui/combobox";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

interface SetorFormProps {
    form: UseFormReturn<SetorDataForm>;
    isLoading: boolean;
    usuarios: UsuarioEntidade[];
}

export default function SetorForm({ form, isLoading, usuarios }: SetorFormProps) {
    return (
        <>
            <div className="grid grid-cols-2 w-full gap-4">
                <FormField
                    control={form.control}
                    name="nome"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome do setor</FormLabel>
                            <FormControl>
                                <Input placeholder="Ex: TI" {...field} />
                            </FormControl>
                            <FormDescription>Nome que identifica o setor na empresa.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>E-mail do setor</FormLabel>
                            <FormControl>
                                <Input placeholder="Ex: ti@empresa.com" {...field} />
                            </FormControl>
                            <FormDescription>E-mail que identifica o setor na empresa.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div>
                <FormField
                    control={form.control}
                    name="responsavelId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Responsável pelo setor</FormLabel>
                            <FormControl>
                                <Combobox
                                    value={field.value}
                                    items={usuarios}
                                    isLoading={isLoading}
                                    onSelect={(item) => {
                                        field.onChange(item.id);
                                    }}
                                />
                            </FormControl>
                            <FormDescription>Usuário responsável por gerenciar o setor.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </>
    );
}   