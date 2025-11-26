import { ChamadoService } from "@/lib/api/services/chamadoService";
import { ChamadoEntidade } from "@/lib/types/entidades/chamadoEntidade";
import { TIPO_CHAMADO } from "@/lib/types/types";
import { AbrirChamadoFormData, abrirChamadoSchema } from "@/lib/validations/chamadoValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface StateHook {
    chamados: ChamadoEntidade[] | null;
    chamado: ChamadoEntidade | null;
    error: string | null;
    madeInitialFetch: boolean;
    isLoading: boolean;
}

const initialState: StateHook = {
    chamados: [],
    chamado: null,
    error: null,
    madeInitialFetch: false,
    isLoading: false,
}

const useAbrirChamadoHook = () => {
    const [state, setState] = useState<StateHook>(initialState);
    const handleState = (partialState: Partial<StateHook>) => {
        setState((prevState) => ({
            ...prevState,
            ...partialState,
        }));
    }

    const form = useForm<AbrirChamadoFormData>({
        resolver: zodResolver(abrirChamadoSchema),
        defaultValues: {
            titulo: "",
            tipo: Object.keys(TIPO_CHAMADO)[0] as keyof typeof TIPO_CHAMADO,
            descricao: ""
        }
    })


    const criar = async (data: FormData) => {
        try {
            handleState({ isLoading: true });
            const response = await ChamadoService.criar(data);
            if (!response.success && !response.data) {
                handleState({ error: response.detalhes || "Erro ao salvar chamado" });
                toast.error(response.detalhes || "Erro ao salvar chamado");
                return;
            }
            toast.success("Chamado salvo com sucesso!");
            handleState({ isLoading: false });
            form.reset();
            return response.data;
        } catch (error) {
            console.error("Error saving chamado:", error);
            handleState({ error: "Erro ao salvar chamado" });
        } finally {
            handleState({ isLoading: false });
        }
    }


    return {
        state,
        handleState,
        form,
        criar
    }
}

export default useAbrirChamadoHook;