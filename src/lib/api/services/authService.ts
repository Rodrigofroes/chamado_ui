import { API_ENDPOINTS } from '@/lib/constants/urls';
import { ApiException, ApiResponse, AuthEntidade, RequestCodeParams } from '@/lib/types/auth';
import { loginDataForm } from '@/lib/validations/loginValidation';
import { apiCliente } from '../http/cliente';
import { UsuarioEntidade } from '@/lib/types/entidades/usuarioEntidade';

export class AuthService {
    static async login(params: loginDataForm): Promise<ApiResponse<AuthEntidade>> {
        try {
            const response = await apiCliente.post<ApiResponse<AuthEntidade>>(API_ENDPOINTS.AUTH.LOGIN, params);
            return { ...response.data, success: true };
        } catch (error: unknown) {
            const handledError = error as ApiException;
            return {
                success: false,
                detalhes: handledError?.response?.data?.detalhes || 'Não foi possível realizar o login',
            };
        }
    }

    static async me(): Promise<ApiResponse<UsuarioEntidade>> {
        try {
            const response = await apiCliente.post<ApiResponse<UsuarioEntidade>>(API_ENDPOINTS.AUTH.ME);
            return { ...response.data, success: true };
        } catch (error: unknown) {
            const handledError = error as ApiException;
            return {
                success: false,
                detalhes: handledError?.response?.data?.detalhes || 'Não foi possível realizar o login',
            };
        }
    }

    static async logout(): Promise<ApiResponse<boolean>> {
        try {
            const response = await apiCliente.post<ApiResponse<boolean>>(API_ENDPOINTS.AUTH.LOGOUT);
            return { ...response.data, success: true };
        } catch (error: unknown) {
            const handledError = error as ApiException;
            return {
                success: false,
                detalhes: handledError?.response?.data?.detalhes || 'Não foi possível realizar o logout',
            };
        }
    }

    static async requestVerificationCode(params: RequestCodeParams): Promise<ApiResponse> {
        try {
            const response = await apiCliente.post<ApiResponse>(
                API_ENDPOINTS.AUTH.SEND_VERIFICATION_CODE,
                params
            );

            return response.data;
        } catch (error: unknown) {
            const handledError = error as ApiException;
            return {
                success: false,
                detalhes:
                    handledError?.response?.data?.detalhes ||
                    'Não foi possível solicitar o código de verificação'
            };
        }
    }
}