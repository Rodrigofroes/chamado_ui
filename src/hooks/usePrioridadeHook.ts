import { PrioridadeService } from "@/lib/api/services/prioridadeService";
import { PrioridadeEntidade } from "@/lib/types/entidades/prioridadeEntidade";
import { FormatarSegundosParaHorasInteger } from "@/lib/utils/formatarHoras";
import { PrioridadeFormData, prioridadeSchema } from "@/lib/validations/prioridadeValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface StateHook {
    prioridades: PrioridadeEntidade[] | null;
    prioridade: PrioridadeEntidade | null;
    error: string | null;
    madeInitialFetch: boolean;
    isLoading: boolean;
}

const initialState: StateHook = {
    prioridades: [],
    prioridade: null,
    error: null,
    madeInitialFetch: false,
    isLoading: false
};

const usePrioridadeHook = () => {
    const [state, setState] = useState<StateHook>(initialState);

    const handleState = (partialState: Partial<StateHook>) => {
        setState((prevState) => ({
            ...prevState,
            ...partialState,
        }));
    }

    const form = useForm<PrioridadeFormData>({
        resolver: zodResolver(prioridadeSchema),
        defaultValues: {
            nome: "",
            descricao: "",
            tempo: 1,
            colorHex: "#FFFFFF",
        },
    })

    const listar = async () => {
        try {
            handleState({ isLoading: true, madeInitialFetch: true });
            const response = await PrioridadeService.listar();
            if (!response.success && !response.data) {
                handleState({ error: response.detalhes || "Erro ao listar prioridades" });
                toast.error(response.detalhes || "Erro ao listar prioridades");
                return;
            }
            handleState({ prioridades: response.data });
        } catch (error) {
            console.error("Error listing prioridades:", error);
            handleState({ error: "Erro ao listar prioridades" });
        } finally {
            handleState({ isLoading: false });
        }
    }

    const criar = async (data: PrioridadeFormData) => {
        try {
            handleState({ isLoading: true });
            const response = await PrioridadeService.criar(data);
            if (!response.success && !response.data) {
                handleState({ error: response.detalhes || "Erro ao salvar prioridade" });
                toast.error(response.detalhes || "Erro ao salvar prioridade");
                return;
            }
            toast.success("Prioridade salva com sucesso!");
            handleState({ isLoading: false });
            form.reset();
            return response.data;
        } catch (error) {
            console.error("Error saving prioridade:", error);
            handleState({ error: "Erro ao salvar prioridade" });
        } finally {
            handleState({ isLoading: false });
        }
    }

    const atualizar = async (id: string, data: PrioridadeFormData) => {
        try {
            handleState({ isLoading: true });
            const response = await PrioridadeService.atualizar(id, data);
            if (!response.success && !response.data) {
                handleState({ error: response.detalhes || "Erro ao atualizar prioridade" });
                toast.error(response.detalhes || "Erro ao atualizar prioridade");
                return;
            }
            toast.success("Prioridade atualizada com sucesso!");
            handleState({ isLoading: false });
            return response.data;
        } catch (error) {
            console.error("Error updating prioridade:", error);
            handleState({ error: "Erro ao atualizar prioridade" });
        } finally {
            handleState({ isLoading: false });
        }
    }

    const buscar = async (id: string) => {
        try {
            handleState({ isLoading: true });
            const response = await PrioridadeService.buscar(id);
            if (!response.success && !response.data) {
                handleState({ error: response.detalhes || "Erro ao buscar prioridade" });
                toast.error(response.detalhes || "Erro ao buscar prioridade");
                return;
            }

            handleState({ prioridade: response.data });

            form.reset({
                nome: response.data?.nome ?? "",
                tempo: FormatarSegundosParaHorasInteger(response.data?.tempo ?? 3600) ?? 1,
                descricao: response.data?.descricao ?? "",
                colorHex: response.data?.colorHex ?? "#FFFFFF",
            })

            return response.data;
        } catch (error) {
            console.error("Error fetching prioridade:", error);
            handleState({ error: "Erro ao buscar prioridade" });
        } finally {
            handleState({ isLoading: false });
        }
    }

    const deletar = async (id: string) => {
        try {
            handleState({ isLoading: true });
            const response = await PrioridadeService.deletar(id);
            if (!response.success) {
                handleState({ error: response.detalhes || "Erro ao deletar prioridade" });
                toast.error(response.detalhes || "Erro ao deletar prioridade");
                return;
            }
            toast.success("Prioridade deletada com sucesso!");
            listar();
        } catch (error) {
            console.error("Error deleting prioridade:", error);
            handleState({ error: "Erro ao deletar prioridade" });
        } finally {
            handleState({ isLoading: false });
        }
    }

    const limparFormulario = () => {
        form.reset({
            nome: "",
            descricao: "",
            colorHex: "#FFFFFF",
        });
        handleState({ prioridade: null });
    }

    return {
        state,
        handleState,
        form,
        criar,
        listar,
        buscar,
        limparFormulario,
        deletar,
        atualizar,
    };
}

export default usePrioridadeHook;