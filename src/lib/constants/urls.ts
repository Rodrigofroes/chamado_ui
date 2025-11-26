export const AUTH = {
    rota: '/auth/login',
} as const;

export const AUTH_REDIRECT = {
    rota: '/auth/redirect',
}

export const ROUTES_ADMIN = [
    { rota: '/admin/dashboard' },
    { rota: '/admin/setores' },
    { rota: '/admin/usuarios' },
    { rota: '/admin/configuracoes' },
] as const;

export const ROUTES_CLIENT = [
    { rota: '/abrir-chamado' },
    { rota: '/chamados' },
] as const;

export const API_ENDPOINTS = {
    DASHBOARD: {
        LISTAR: '/home',
    },
    CHAMADO_USUARIO: {
        UPDATE: (id: string) => `/chamados-usuarios/atualizar/${id}/chamado`,
    },
    CHAMADO: {
        CREATE: '/chamados',
        FIND_ALL: (url: string) => `/chamados${url}`,
        FIND_BY_ID: (id: string) => `/chamados/${id}`,
        UPDATE: (id: string) => `/chamados/${id}`,
        DELETE: (id: string) => `/chamados/${id}`,
    },
    AUTH: {
        SEND_VERIFICATION_CODE: '/auth/email-verification',
        LOGIN: '/auth/code-verification',
        ME: '/auth/me',
        LOGOUT: '/auth/logout',
    },
    USUARIO: {
        CREATE: '/usuarios',
        FIND_ALL: '/usuarios',
        FIND_ALL_ADMIN: '/usuarios/type/admin',
        FIND_BY_ID: (id: string) => `/usuarios/${id}`,
        UPDATE: (id: string) => `/usuarios/${id}`,
        DELETE: (id: string) => `/usuarios/${id}`,
    },
    SETOR: {
        CREATE: '/setores',
        FIND_ALL: '/setores',
        FIND_BY_ID: (id: string) => `/setores/${id}`,
        UPDATE: (id: string) => `/setores/${id}`,
        DELETE: (id: string) => `/setores/${id}`,
    },
    PRIORIDADE: {
        CREATE: '/prioridades',
        FIND_ALL: '/prioridades',
        FIND_BY_ID: (id: string) => `/prioridades/${id}`,
        UPDATE: (id: string) => `/prioridades/${id}`,
        DELETE: (id: string) => `/prioridades/${id}`,
    },
    EMAIL: {
        CREATE: '/emails',
        FIND_ALL: '/emails',
        FIND_BY_ID: (id: string) => `/emails/${id}`,
        UPDATE: (id: string) => `/emails/${id}`,
        DELETE: (id: string) => `/emails/${id}`,
    }
}