import { ChamadoService } from "@/lib/api/services/chamadoService";
import { ChamadoEntidade } from "@/lib/types/entidades/chamadoEntidade";
import { TIPO_CHAMADO_STATUS } from "@/lib/types/types";
import { ChamadoFormData, chamadoSchema } from "@/lib/validations/chamadoValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

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

const useChamadoHook = () => {
    const [state, setState] = useState<StateHook>(initialState);

    const handleState = (partialState: Partial<StateHook>) => {
        setState((prevState) => ({
            ...prevState,
            ...partialState,
        }));
    }

    const form = useForm<ChamadoFormData>({
        resolver: zodResolver(chamadoSchema),
        defaultValues: {
            chamadoId: "",
            usuarioId: "",
            prioridadeId: "",
            status: Object.keys(TIPO_CHAMADO_STATUS)[0] as keyof typeof TIPO_CHAMADO_STATUS,
            observacao: "",
        }
    })

    const listar = async (url: string) => {
        try {
            handleState({ isLoading: true, madeInitialFetch: true });
            const response = await ChamadoService.listar(url);
            if (!response.success && !response.data) {
                handleState({ error: response.detalhes || "Erro ao buscar chamados" });
                return;
            }
            handleState({ chamados: response.data || [], isLoading: false });
        } catch (error) {
            console.error("Error fetching chamados:", error);
            handleState({ error: "Erro ao buscar chamados" });
        } finally {
            handleState({ isLoading: false });
        }
    }

    const buscar = async (id: string) => {
        try {
            handleState({ isLoading: true });
            const response = await ChamadoService.buscar(id);
            if (!response.success && !response.data) {
                handleState({ error: response.detalhes || "Erro ao buscar chamado" });
                return;
            }

            const statusServer = response.data!.responsavel?.status;

            const status =
                statusServer && Object.keys(TIPO_CHAMADO_STATUS).includes(statusServer)
                    ? (statusServer as keyof typeof TIPO_CHAMADO_STATUS)
                    : "ABERTO";

            form.reset({
                chamadoId: response.data!.id,
                usuarioId: response.data!.responsavel?.responsavel?.id || "",
                prioridadeId: response.data!.responsavel?.prioridade?.id || "",
                observacao: response.data!.responsavel?.observacao || "",
                status: status,
            })


            handleState({ chamado: response.data || null, isLoading: false });
        } catch (error) {
            console.error("Error fetching chamado:", error);
            handleState({ error: "Erro ao buscar chamado" });
        } finally {
            handleState({ isLoading: false });
        }
    }

    return {
        state,
        form,
        handleState,
        listar,
        buscar
    }
}

export default useChamadoHook;