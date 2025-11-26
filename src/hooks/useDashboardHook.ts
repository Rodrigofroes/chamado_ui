import { DashboardService } from "@/lib/api/services/dashboardService";
import { DashboardEntidade } from "@/lib/types/entidades/dashboardEntidade";
import { useState } from "react";

interface StateHook {
    dashboards: DashboardEntidade | null;
    isLoading: boolean;
    error: string | null;
    madeInitialFetch: boolean;
}

const initialState: StateHook = {
    dashboards: null,
    isLoading: false,
    error: null,
    madeInitialFetch: false,
};

const useDashboardHook = () => {
    const [state, setState] = useState<StateHook>(initialState);

    const handleState = (newState: Partial<StateHook>) => {
        setState((prevState) => ({
            ...prevState,
            ...newState,
        }));
    };

    const listar = async () => {
        handleState({ isLoading: true, error: null, madeInitialFetch: true });
        try {
            const response = await DashboardService.listar();
            if (response.success && response.data) {
                handleState({ dashboards: response.data });
            } else {
                handleState({ error: response.detalhes || 'Erro ao carregar dashboards' });
            }
        } catch (error: unknown) {
            console.error(error);
            handleState({ error: 'Não foi possível buscar os dashboards' });
        } finally {
            handleState({ isLoading: false });
        }
    }

    return {
        state,
        handleState,
        listar,
    };
}

export default useDashboardHook;