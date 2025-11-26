
import { API_ENDPOINTS } from '@/lib/constants/urls';
import { apiCliente } from '../http/cliente';
import { ApiException, ApiResponse } from '@/lib/types/auth';
import { TemplateEmailEntidade } from '@/lib/types/entidades/templateEmailEntidade';
import { EmailFormData } from '@/lib/validations/emaiilValidation';

export class EmailService {
    static async criar(
        data: EmailFormData
    ): Promise<ApiResponse<TemplateEmailEntidade>> {
        try {
            const response = await apiCliente.post<ApiResponse<TemplateEmailEntidade>>(
                API_ENDPOINTS.EMAIL.CREATE,
                data,
            );
            return response.data;
        } catch (error: unknown) {
            const handledError = error as ApiException;
            return {
                success: false,
                detalhes:
                    handledError?.response?.data?.detalhes ||
                    'Não foi possível criar o template de email'
            };
        }
    }

    static async listar(): Promise<ApiResponse<TemplateEmailEntidade[]>> {
        try {
            const response = await apiCliente.get<ApiResponse<TemplateEmailEntidade[]>>(
                API_ENDPOINTS.EMAIL.FIND_ALL
            );
            return { ...response.data, success: true };
        } catch (error: unknown) {
            const handledError = error as ApiException;
            return {
                success: false,
                detalhes:
                    handledError?.response?.data?.detalhes ||
                    'Não foi possível criar o template de email'
            };
        }
    }

    static async buscar(
        id: string
    ): Promise<ApiResponse<TemplateEmailEntidade>> {
        try {
            const response = await apiCliente.get<ApiResponse<TemplateEmailEntidade>>(
                API_ENDPOINTS.EMAIL.FIND_BY_ID(id)
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

    static async deletar(
        id: string
    ): Promise<ApiResponse<void>> {
        try {
            const response = await apiCliente.delete<ApiResponse<void>>(
                API_ENDPOINTS.EMAIL.FIND_BY_ID(id)
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

    static async atualizar(
        id: string,
        data: EmailFormData
    ): Promise<ApiResponse<TemplateEmailEntidade>> {
        try {
            const response = await apiCliente.put<ApiResponse<TemplateEmailEntidade>>(
                API_ENDPOINTS.EMAIL.FIND_BY_ID(id),
                data
            );
            return { ...response.data, success: true };
        } catch (error: unknown) {
            const handledError = error as ApiException;
            return {
                success: false,
                detalhes:
                    handledError?.response?.data?.detalhes ||
                    'Não foi possível atualizar o template de email'
            };
        }
    }
}