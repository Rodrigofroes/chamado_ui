import { AxiosError } from 'axios';
import { UsuarioEntidade } from './entidades/usuarioEntidade';

export enum LOGIN_STEPS {
  REQUEST_CODE,
  LOGIN,
}

export interface RequestCodeParams {
  email: string;
}

export interface LoginParams {
  email: string;
  code: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  detalhes?: string;
  codigo?: number;
};

export type ApiException = AxiosError<{ detalhes: string }>;

export interface AuthState {
  user: UsuarioEntidade | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isAdmin: boolean;
}

export interface AuthEntidade {
  user: UsuarioEntidade;
  token: string;
}