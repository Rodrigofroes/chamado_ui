
import { API_ENDPOINTS } from '@/lib/constants/urls';
import { apiCliente } from '../http/cliente';
import { ApiException, ApiResponse } from '@/lib/types/auth';
import { SetorEntidade } from '@/lib/types/entidades/setorEntidade';
import { SetorDataForm } from '@/lib/validations/setorValidation';

export class SetorService {
    static async criar(
        data: SetorDataForm
    ): Promise<ApiResponse<SetorEntidade>> {
        try {
            const response = await apiCliente.post<ApiResponse<SetorEntidade>>(
                API_ENDPOINTS.SETOR.CREATE,
                data
            );
            return response.data;
        } catch (error: unknown) {
            const handledError = error as ApiException;
            return {
                success: false,
                detalhes:
                    handledError?.response?.data?.detalhes ||
                    'Não foi possível criar o setor'
            };
        }
    }

    static async listar(): Promise<ApiResponse<SetorEntidade[]>> {
        try {
            const response = await apiCliente.get<ApiResponse<SetorEntidade[]>>(
                API_ENDPOINTS.SETOR.FIND_ALL
            );
            return { ...response.data, success: true };
        } catch (error: unknown) {
            const handledError = error as ApiException;
            return {
                success: false,
                detalhes:
                    handledError?.response?.data?.detalhes ||
                    'Não foi possível buscar os setores'
            };
        }
    }

    static async deletar(
        id: string
    ): Promise<ApiResponse<void>> {
        try {
            const response = await apiCliente.delete<ApiResponse<void>>(
                API_ENDPOINTS.SETOR.DELETE(id)
            );
            return { ...response.data, success: true };
        } catch (error: unknown) {
            const handledError = error as ApiException;
            return {
                success: false,
                detalhes:
                    handledError?.response?.data?.detalhes ||
                    'Não foi possível deletar o setor'
            };
        }
    }

    static async buscar(
        id: string
    ): Promise<ApiResponse<SetorEntidade>> {
        try {
            const response = await apiCliente.get<ApiResponse<SetorEntidade>>(
                API_ENDPOINTS.SETOR.FIND_BY_ID(id)
            );
            return { ...response.data, success: true };
        } catch (error: unknown) {
            const handledError = error as ApiException;
            return {
                success: false,
                detalhes:
                    handledError?.response?.data?.detalhes ||
                    'Não foi possível buscar o setor'
            };
        }
    }

    static async atualizar(
        id: string,
        data: SetorDataForm
    ): Promise<ApiResponse<SetorEntidade>> {
        try {
            const response = await apiCliente.put<ApiResponse<SetorEntidade>>(
                API_ENDPOINTS.SETOR.UPDATE(id),
                data
            );
            return response.data;
        } catch (error: unknown) {
            const handledError = error as ApiException;
            return {
                success: false,
                detalhes:
                    handledError?.response?.data?.detalhes ||
                    'Não foi possível atualizar o setor'
            };
        }
    }
}