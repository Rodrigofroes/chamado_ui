import { SetorEntidade } from "@/lib/types/entidades/setorEntidade";
import { UsuarioFormData } from "@/lib/validations/usuarioValidation";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { TIPO_USUARIO } from "@/lib/types/types";
import { Input } from "../ui/input";
import { Combobox } from "../ui/combobox";
import { UsuarioEntidade } from "@/lib/types/entidades/usuarioEntidade";

interface UsuarioFormProps {
    form: UseFormReturn<UsuarioFormData>;
    setores: SetorEntidade[];
    usuario: UsuarioEntidade | null;
    isLoading: boolean;
}

export default function UsuarioForm({ form, setores, usuario, isLoading }: UsuarioFormProps) {

    return (
        <>
            <div className="grid grid-cols-2 w-full gap-4">
                <FormField
                    name="nome"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                                <Input placeholder="Ex: João da Silva" {...field} />
                            </FormControl>
                            <FormDescription>
                                Insira o nome completo do usuário.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>E-mail</FormLabel>
                            <FormControl>
                                <Input placeholder="Ex: joao.silva@email.com" {...field} />
                            </FormControl>
                            <FormDescription>
                                Insira o e-mail completo do usuário.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="grid grid-cols-2 w-full gap-4">
                <FormField
                    name="tipo"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tipo</FormLabel>
                            <FormControl>
                                <Combobox
                                    items={Object.keys(TIPO_USUARIO).map(key => ({ id: key, nome: TIPO_USUARIO[key as keyof typeof TIPO_USUARIO] }))}
                                    isLoading={isLoading}
                                    onSelect={(item) => {
                                        field.onChange(item.id);
                                    }}
                                    value={field.value}
                                />
                            </FormControl>
                            <FormDescription>
                                Selecione o setor ao qual o usuário pertence.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="setorId"
                    control={form.control}
                    render={({ field }) => {
                        const setoresAtuais = [...setores];
                        if (usuario?.setor?.deletadoEm && !setoresAtuais.find(s => s.id === usuario.setor?.id)) {
                            setoresAtuais.push({
                                ...usuario.setor,
                                nome: `${usuario.setor.nome} (Inativo)`,
                            });
                        }
                        return (
                            <FormItem>
                                <FormLabel>Setor</FormLabel>
                                <FormControl>
                                    <Combobox
                                        items={setoresAtuais}
                                        isLoading={isLoading}
                                        onSelect={(item) => {
                                            field.onChange(item.id);
                                        }}
                                        value={field.value}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Selecione o setor ao qual o usuário pertence.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )
                    }
                    }
                />
            </div>
        </>
    );
}