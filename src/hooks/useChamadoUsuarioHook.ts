import { ChamadoService } from "@/lib/api/services/chamadoService";
import { ChamadoFormData } from "@/lib/validations/chamadoValidation";
import { useState } from "react";
import { toast } from "sonner";

interface StateHook {
    isLoading: boolean;
    error: string | null;
}

const initialState: StateHook = {
    isLoading: false,
    error: null,
}

const useChamadoUsuarioHook = () => {
    const [state, setState] = useState<StateHook>(initialState);

    const handleState = (partialState: Partial<StateHook>) => {
        setState((prevState) => ({
            ...prevState,
            ...partialState,
        }));
    }

    const cadastrar = async (data: ChamadoFormData, id: string) => {
        try {
            handleState({ isLoading: true });
            const response = await ChamadoService.cadastrarChamadoUsuario(data, id);
            if (!response.success && !response.data) {
                handleState({ error: response.detalhes || "Erro ao cadastrar chamado" });
                toast.error(response.detalhes || "Erro ao cadastrar chamado");
                return;
            }
            toast.success("Chamado atualizado com sucesso!");
            return response.data;
        } catch (error) {
            console.error("Error registering chamado:", error);
            handleState({ error: "Erro ao cadastrar chamado" });
        } finally {
            handleState({ isLoading: false });
        }
    }

    return {
        state,
        handleState,
        cadastrar
    }
}
export default useChamadoUsuarioHook;