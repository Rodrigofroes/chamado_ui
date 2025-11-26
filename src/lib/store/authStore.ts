import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { AuthState, LoginParams, RequestCodeParams } from "../types/auth";
import { UsuarioEntidade } from "../types/entidades/usuarioEntidade";
import { AuthService } from "../api/services/authService";
import { TIPO_USUARIO_MIDDLEWARE } from "../types/types";

interface AuthStore extends AuthState {
    setUser: (user: UsuarioEntidade | null) => void;
    requestVerificationCode: (params: RequestCodeParams) => Promise<boolean>;
    login: (params: LoginParams) => Promise<boolean>;
    logout: () => Promise<boolean>;
    me: () => Promise<UsuarioEntidade | null>;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    isAdmin: false,
};

export const useAuthStore = create<AuthStore>()(
    devtools(
        persist(
            (set, get) => ({
                ...initialState,
                requestVerificationCode: async (params) => {
                    set({ isLoading: true, error: null });

                    try {
                        const response = await AuthService.requestVerificationCode(params);

                        if (response.data) {
                            return true;
                        } else {
                            set({
                                isLoading: false,
                                error: response.detalhes || 'Não foi possível solicitar o código de verificação',
                            });
                            return false;
                        }
                    } catch (error) {
                        console.error(error);
                        set({ isLoading: false, error: 'Ocorreu um erro inesperado' });
                        return false;
                    }
                },
                login: async (params) => {
                    set({ isLoading: true, error: null });

                    try {
                        const response = await AuthService.login(params);

                        if (!response.data) {
                            set({
                                isLoading: false,
                                error: response.detalhes || 'Não foi possível realizar o login',
                            });
                            return false;
                        }
                        const user = await AuthService.me();
                        if (!user.data && !user.success) {
                            set({
                                isLoading: false,
                                error: user.detalhes || 'Não foi possível obter os dados do usuário',
                            });
                            return false;
                        }

                        set({
                            user: user.data!,
                            isAuthenticated: true,
                            isLoading: false,
                            isAdmin: user.data!.tipo === TIPO_USUARIO_MIDDLEWARE.ADMIN.toString(),
                        });
                        return true;
                    } catch (error) {
                        console.error(error);
                        set({
                            isLoading: false,
                            error: 'Ocorreu um erro inesperado',
                        });
                        return false;
                    }
                },
                me: async () => {
                    set({ isLoading: true, error: null });
                    try {
                        const response = await AuthService.me();
                        if (response.data && response.success) {
                            set({
                                user: response.data!,
                                isAuthenticated: true,
                                isLoading: false,
                                isAdmin: response.data!.tipo === TIPO_USUARIO_MIDDLEWARE.ADMIN.toString(),
                            });
                            return response.data;
                        } else {
                            set({
                                isLoading: false,
                                user: null,
                                isAuthenticated: false,
                                isAdmin: false,
                                error: response.detalhes || 'Não foi possível obter os dados do usuário',
                            });
                            return null;
                        }
                    } catch (error) {
                        console.error(error);
                        set({ isLoading: false, error: 'Ocorreu um erro inesperado' });
                        return null;
                    }
                },
                logout: async () => {
                    set({ isLoading: true, error: null });
                    try {
                        const response = await AuthService.logout();
                        if (response.data && response.success) {
                            set({
                                user: null,
                                isAuthenticated: false,
                                isLoading: false,
                                isAdmin: false,
                            });
                            window.location.reload();
                            return true;
                        } else {
                            set({
                                isLoading: false,
                                error: response.detalhes || 'Não foi possível realizar o logout',
                            });
                            return false;
                        }
                    } catch (error) {
                        console.error(error);
                        set({ isLoading: false, error: 'Ocorreu um erro inesperado' });
                        return false;
                    }
                },
                setUser: (user: UsuarioEntidade | null) => {
                    set({
                        user,
                        isAuthenticated: !!user,
                    });
                }
            }),
            {
                name: "auth-storage"
            }
        )
    )
);
