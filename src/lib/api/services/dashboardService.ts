import { API_ENDPOINTS } from '@/lib/constants/urls';
import { apiCliente } from '../http/cliente';
import { ApiException, ApiResponse } from '@/lib/types/auth';
import { DashboardEntidade } from '@/lib/types/entidades/dashboardEntidade';

export class DashboardService {
    static async listar(): Promise<ApiResponse<DashboardEntidade>> {
        try {
            const response = await apiCliente.get<ApiResponse<DashboardEntidade>>(
                API_ENDPOINTS.DASHBOARD.LISTAR
            );
            return { ...response.data, success: true };
        } catch (error: unknown) {
            const handledError = error as ApiException;
            return {
                success: false,
                detalhes:
                    handledError?.response?.data?.detalhes ||
                    'Não foi possível buscar os dashboards'
            };
        }
    }
}