import { SetorService } from "@/lib/api/services/setorService";
import { SetorEntidade } from "@/lib/types/entidades/setorEntidade";
import { SetorDataForm, setorSchema } from "@/lib/validations/setorValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface StateHook {
    setores: SetorEntidade[] | null;
    setor: SetorEntidade | null;
    error: string | null;
    madeInitialFetch: boolean;
    isLoading: boolean;
}

const initialState: StateHook = {
    setores: [],
    setor: null,
    error: null,
    madeInitialFetch: false,
    isLoading: false,
}

const useSetorHook = () => {
    const [state, setState] = useState<StateHook>(initialState);

    const handleState = (partialState: Partial<StateHook>) => {
        setState((prevState) => ({
            ...prevState,
            ...partialState,
        }));
    }

    const form = useForm<SetorDataForm>({
        resolver: zodResolver(setorSchema),
        defaultValues: {
            nome: "",
            email: "",
            responsavelId: "",
        },
    })

    const deletar = async (id: string) => {
        try {
            handleState({ isLoading: true });
            const response = await SetorService.deletar(id);
            if (!response.success) {
                handleState({ error: response.detalhes || "Erro ao deletar setor" });
                toast.error(response.detalhes || "Erro ao deletar setor");
                return;
            }
            toast.success("Setor deletado com sucesso!");
            listar();
            handleState({ isLoading: false });
        } catch (error) {
            console.error("Error deleting setor:", error);
            handleState({ error: "Erro ao deletar setor" });
        } finally {
            handleState({ isLoading: false });
        }
    }

    const criar = async (data: SetorDataForm) => {
        try {
            handleState({ isLoading: true });
            const response = await SetorService.criar(data);
            if (!response.success && !response.data) {
                handleState({ error: response.detalhes || "Erro ao salvar setor" });
                toast.error(response.detalhes || "Erro ao salvar setor");
                return;
            }
            toast.success("Setor salvo com sucesso!");
            handleState({ isLoading: false });
            form.reset();
            return response.data;
        } catch (error) {
            console.error("Error saving setor:", error);
            handleState({ error: "Erro ao salvar setor" });
        } finally {
            handleState({ isLoading: false });
        }
    }

    const listar = async () => {
        try {
            handleState({ isLoading: true, madeInitialFetch: true });
            const response = await SetorService.listar();
            if (!response.success && !response.data) {
                handleState({ error: response.detalhes || "Erro ao buscar setores" });
                toast.error(response.detalhes || "Erro ao buscar setores");
                return;
            }
            handleState({ setores: response.data || [], isLoading: false });
        } catch (error) {
            console.error("Error fetching setores:", error);
            handleState({ error: "Erro ao buscar setores" });
        } finally {
            handleState({ isLoading: false });
        }
    }

    const buscar = async (id: string) => {
        try {
            handleState({ isLoading: true });
            const response = await SetorService.buscar(id);
            if (!response.success && !response.data) {
                handleState({ error: response.detalhes || "Erro ao buscar setor" });
                toast.error(response.detalhes || "Erro ao buscar setor");
            }

            form.reset({
                nome: response.data?.nome || "",
                email: response.data?.email || "",
                responsavelId: response.data?.responsavel?.id || "",
            })

            handleState({ setor: response.data || null, isLoading: false });
        } catch (error) {
            console.error("Error fetching setor:", error);
            handleState({ error: "Erro ao buscar setor" });
        } finally {
            handleState({ isLoading: false });
        }
    }

    const atualizar = async (id: string, data: SetorDataForm) => {
        try {
            handleState({ isLoading: true });
            const response = await SetorService.atualizar(id, data);
            if (!response.success && !response.data) {
                handleState({ error: response.detalhes || "Erro ao atualizar setor" });
                toast.error(response.detalhes || "Erro ao atualizar setor");
                return;
            }
            toast.success("Setor atualizado com sucesso!");
            handleState({ isLoading: false });
            return response.data;
        } catch (error) {
            console.error("Error saving setor:", error);
            handleState({ error: "Erro ao atualizar setor" });
        } finally {
            handleState({ isLoading: false });
        }
    }

    return {
        state,
        handleState,
        listar,
        form,
        criar,
        deletar,
        buscar,
        atualizar,
    };
}

export default useSetorHook;