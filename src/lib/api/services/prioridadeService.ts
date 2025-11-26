
import { API_ENDPOINTS } from '@/lib/constants/urls';
import { apiCliente } from '../http/cliente';
import { ApiException, ApiResponse } from '@/lib/types/auth';
import { PrioridadeEntidade } from '@/lib/types/entidades/prioridadeEntidade';
import { PrioridadeFormData } from '@/lib/validations/prioridadeValidation';

export class PrioridadeService {
    static async atualizar(
        id: string,
        data: PrioridadeFormData
    ): Promise<ApiResponse<PrioridadeEntidade>> {
        try {
            const response = await apiCliente.put<ApiResponse<PrioridadeEntidade>>(
                API_ENDPOINTS.PRIORIDADE.UPDATE(id),
                data
            );
            return response.data;
        } catch (error: unknown) {
            const handledError = error as ApiException;
            return {
                success: false,
                detalhes:
                    handledError?.response?.data?.detalhes ||
                    'Não foi possível atualizar a prioridade'
            };
        }
    }


    static async criar(
        data: PrioridadeFormData
    ): Promise<ApiResponse<PrioridadeEntidade>> {
        try {
            const response = await apiCliente.post<ApiResponse<PrioridadeEntidade>>(
                API_ENDPOINTS.PRIORIDADE.CREATE,
                data
            );
            return response.data;
        } catch (error: unknown) {
            const handledError = error as ApiException;
            return {
                success: false,
                detalhes:
                    handledError?.response?.data?.detalhes ||
                    'Não foi possível criar a prioridade'
            };
        }
    }

    static async listar(): Promise<ApiResponse<PrioridadeEntidade[]>> {
        try {
            const response = await apiCliente.get<ApiResponse<PrioridadeEntidade[]>>(
                API_ENDPOINTS.PRIORIDADE.FIND_ALL
            );
            return { ...response.data, success: true };
        } catch (error: unknown) {
            const handledError = error as ApiException;
            return {
                success: false,
                detalhes:
                    handledError?.response?.data?.detalhes ||
                    'Não foi possível buscar as prioridades'
            };
        }
    }

    static async buscar(
        id: string
    ): Promise<ApiResponse<PrioridadeEntidade>> {
        try {
            const response = await apiCliente.get<ApiResponse<PrioridadeEntidade>>(
                API_ENDPOINTS.PRIORIDADE.FIND_BY_ID(id)
            );
            return { ...response.data, success: true };
        } catch (error: unknown) {
            const handledError = error as ApiException;
            return {
                success: false,
                detalhes:
                    handledError?.response?.data?.detalhes ||
                    'Não foi possível buscar as prioridades'
            };
        }
    }

    static async deletar(
        id: string
    ): Promise<ApiResponse<PrioridadeEntidade>> {
        try {
            const response = await apiCliente.delete<ApiResponse<PrioridadeEntidade>>(
                API_ENDPOINTS.PRIORIDADE.DELETE(id)
            );
            return { ...response.data, success: true };
        } catch (error: unknown) {
            const handledError = error as ApiException;
            return {
                success: false,
                detalhes:
                    handledError?.response?.data?.detalhes ||
                    'Não foi possível buscar as prioridades'
            };
        }
    }
}