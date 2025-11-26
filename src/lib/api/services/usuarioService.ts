
import { API_ENDPOINTS } from '@/lib/constants/urls';
import { apiCliente } from '../http/cliente';
import { ApiException, ApiResponse } from '@/lib/types/auth';
import { UsuarioEntidade } from '@/lib/types/entidades/usuarioEntidade';
import { UsuarioFormData } from '@/lib/validations/usuarioValidation';

export class UsuarioService {
    static async criar(
        data: UsuarioFormData
    ): Promise<ApiResponse<UsuarioEntidade>> {
        try {
            const response = await apiCliente.post<ApiResponse<UsuarioEntidade>>(
                API_ENDPOINTS.USUARIO.CREATE,
                data
            );
            return response.data;
        } catch (error: unknown) {
            const handledError = error as ApiException;
            return {
                success: false,
                detalhes:
                    handledError?.response?.data?.detalhes ||
                    'Não foi possível criar o usuário'
            };
        }
    }

    static async editar(
        id: string,
        data: UsuarioFormData
    ): Promise<ApiResponse<UsuarioEntidade>> {
        try {
            const response = await apiCliente.put<ApiResponse<UsuarioEntidade>>(
                API_ENDPOINTS.USUARIO.FIND_BY_ID(id),
                data
            );
            return {...response.data, success: true };
        } catch (error: unknown) {
            const handledError = error as ApiException;
            return {
                success: false,
                detalhes:
                    handledError?.response?.data?.detalhes ||
                    'Não foi possível editar o usuário'
            };
        }
    }

    static async listar(): Promise<ApiResponse<UsuarioEntidade[]>> {
        try {
            const response = await apiCliente.get<ApiResponse<UsuarioEntidade[]>>(
                API_ENDPOINTS.USUARIO.FIND_ALL
            );
            return { ...response.data, success: true };
        } catch (error: unknown) {
            const handledError = error as ApiException;
            return {
                success: false,
                detalhes:
                    handledError?.response?.data?.detalhes ||
                    'Não foi possível buscar os usuário'
            };
        }
    }

    static async buscar(
        id: string
    ): Promise<ApiResponse<UsuarioEntidade>> {
        try {
            const response = await apiCliente.get<ApiResponse<UsuarioEntidade>>(
                API_ENDPOINTS.USUARIO.FIND_BY_ID(id)
            );
            return { ...response.data, success: true };
        } catch (error: unknown) {
            const handledError = error as ApiException;
            return {
                success: false,
                detalhes:
                    handledError?.response?.data?.detalhes ||
                    'Não foi possível buscar o usuário'
            };
        }
    }

    static async deletar(id: string): Promise<ApiResponse<boolean>> {
        try {
            const response = await apiCliente.delete<ApiResponse<boolean>>(
                API_ENDPOINTS.USUARIO.DELETE(id)
            );
            return { ...response.data, success: true };
        } catch (error: unknown) {
            const handledError = error as ApiException;
            return {
                success: false,
                detalhes:
                    handledError?.response?.data?.detalhes ||
                    'Não foi possível deletar o usuário'
            };
        }
    }
}