
import { API_ENDPOINTS } from '@/lib/constants/urls';
import { apiCliente } from '../http/cliente';
import { ApiException, ApiResponse } from '@/lib/types/auth';
import { ChamadoEntidade } from '@/lib/types/entidades/chamadoEntidade';
import { ChamadoFormData } from '@/lib/validations/chamadoValidation';

export class ChamadoService {
    static async criar(
        data: FormData
    ): Promise<ApiResponse<ChamadoEntidade>> {
        try {
            const response = await apiCliente.post<ApiResponse<ChamadoEntidade>>(
                API_ENDPOINTS.CHAMADO.CREATE,
                data,
            );
            return response.data;
        } catch (error: unknown) {
            const handledError = error as ApiException;
            return {
                success: false,
                detalhes:
                    handledError?.response?.data?.detalhes ||
                    'Não foi possível criar o chamado'
            };
        }
    }

    static async listar(url: string): Promise<ApiResponse<ChamadoEntidade[]>> {
        try {
            const response = await apiCliente.get<ApiResponse<ChamadoEntidade[]>>(
                API_ENDPOINTS.CHAMADO.FIND_ALL(url)
            );
            return { ...response.data, success: true };
        } catch (error: unknown) {
            const handledError = error as ApiException;
            return {
                success: false,
                detalhes:
                    handledError?.response?.data?.detalhes ||
                    'Não foi possível buscar os chamados'
            };
        }
    }

    static async buscar(
        id: string
    ): Promise<ApiResponse<ChamadoEntidade>> {
        try {
            const response = await apiCliente.get<ApiResponse<ChamadoEntidade>>(
                API_ENDPOINTS.CHAMADO.FIND_BY_ID(id)
            );
            return { ...response.data, success: true };
        } catch (error: unknown) {
            const handledError = error as ApiException;
            return {
                success: false,
                detalhes:
                    handledError?.response?.data?.detalhes ||
                    'Não foi possível buscar o chamado'
            };
        }
    }

    static async cadastrarChamadoUsuario(
        data: ChamadoFormData,
        id: string
    ) {
        try {
            const response = await apiCliente.put<ApiResponse<ChamadoEntidade>>(
                API_ENDPOINTS.CHAMADO_USUARIO.UPDATE(id),
                data
            );
            return { ...response.data, success: true };
        } catch (error: unknown) {
            const handledError = error as ApiException;
            return {
                success: false,
                detalhes:
                    handledError?.response?.data?.detalhes ||
                    'Não foi possível cadastrar o chamado'
            };
        }
    }
}