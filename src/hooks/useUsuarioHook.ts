import { UsuarioService } from "@/lib/api/services/usuarioService";
import { SetorEntidade } from "@/lib/types/entidades/setorEntidade";
import { UsuarioEntidade } from "@/lib/types/entidades/usuarioEntidade";
import { TIPO_USUARIO } from "@/lib/types/types";
import { UsuarioFormData, usuarioSchema } from "@/lib/validations/usuarioValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface StateHook {
    usuarios: UsuarioEntidade[] | null;
    usuario: UsuarioEntidade | null;
    error: string | null;
    madeInitialFetch: boolean;
    isLoading: boolean;
}

const initialState: StateHook = {
    usuarios: [],
    usuario: null,
    error: null,
    madeInitialFetch: false,
    isLoading: false,
}

const useUsuarioHook = () => {
    const [state, setState] = useState<StateHook>(initialState);

    const handleState = (partialState: Partial<StateHook>) => {
        setState((prevState) => ({
            ...prevState,
            ...partialState,
        }));
    }

    const form = useForm<UsuarioFormData>({
        resolver: zodResolver(usuarioSchema),
        defaultValues: {
            nome: "",
            email: "",
            tipo: Object.keys(TIPO_USUARIO)[0] as TIPO_USUARIO,
            setorId: "",
        },
    })

    const listar = async () => {
        try {
            handleState({ isLoading: true, madeInitialFetch: true });
            const response = await UsuarioService.listar();
            if (!response.success && !response.data) {
                handleState({ error: response.detalhes || "Erro ao buscar usuários" });
                toast.error(response.detalhes || "Erro ao buscar usuários");
                return;
            }
            handleState({ usuarios: response.data || [], isLoading: false });
        } catch (error) {
            console.error("Error fetching usuários:", error);
            handleState({ error: "Erro ao buscar usuários" });
        } finally {
            handleState({ isLoading: false });
        }
    }

    const criar = async (data: UsuarioFormData) => {
        try {
            handleState({ isLoading: true });
            const response = await UsuarioService.criar(data);
            if (!response.success || !response.data) {
                handleState({ error: response.detalhes || "Erro ao criar usuário" });
                toast.error(response.detalhes || "Erro ao criar usuário");
                return null;
            }

            toast.success("Usuário criado com sucesso");
            form.reset();
            return response.data;
        } catch (error) {
            console.error("Error creating usuário:", error);
            handleState({ error: "Erro ao criar usuário" });
            return null;
        } finally {
            handleState({ isLoading: false });
        }
    }

    const editar = async (id: string, data: UsuarioFormData) => {
        try {
            handleState({ isLoading: true });
            const response = await UsuarioService.editar(id, data);
            if (!response.success || !response.data) {
                handleState({ error: response.detalhes || "Erro ao editar usuário" });
                toast.error(response.detalhes || "Erro ao editar usuário");
                return null;
            }

            toast.success("Usuário editado com sucesso");
            return response.data;
        } catch (error) {
            console.error("Error editing usuário:", error);
            handleState({ error: "Erro ao editar usuário" });
            return null;
        } finally {
            handleState({ isLoading: false });
        }
    }

    const buscar = async (id: string) => {
        try {
            handleState({ isLoading: true });
            const response = await UsuarioService.buscar(id);
            if (!response.success || !response.data) {
                handleState({ error: response.detalhes || "Erro ao buscar usuário" });
                toast.error(response.detalhes || "Erro ao buscar usuário");
                return null;
            }

            form.reset({
                nome: response.data.nome ?? "",
                email: response.data.email ?? "",
                tipo: response.data.tipo ?? Object.keys(TIPO_USUARIO)[0] as TIPO_USUARIO,
                setorId: response.data.setor?.id ?? "",
            })

            handleState({ usuario: response.data });
        } catch (error) {
            console.error("Error fetching usuário:", error);
            handleState({ error: "Erro ao buscar usuário" });
        } finally {
            handleState({ isLoading: false });
        }
    }

    const deletar = async (id: string) => {
        try {
            handleState({ isLoading: true });
            const response = await UsuarioService.deletar(id);
            if (!response.success) {
                handleState({ error: response.detalhes || "Erro ao deletar usuário" });
                toast.error(response.detalhes || "Erro ao deletar usuário");
                return false;
            }

            listar();
            toast.success("Usuário deletado com sucesso");
            return true;
        } catch (error) {
            console.error("Error deleting usuário:", error);
            handleState({ error: "Erro ao deletar usuário" });
            return false;
        } finally {
            handleState({ isLoading: false });
        }
    }

    return {
        state,
        form,
        handleState,
        listar,
        buscar,
        criar,
        editar,
        deletar,
    }
}

export default useUsuarioHook;