export enum TIPO_USUARIO {
    ADMIN = "Administrador",
    CLIENT = "Usuário"
}

export enum TIPO_CHAMADO_STATUS {
    ABERTO = "Aberto",
    EM_ANDAMENTO = "Em Andamento",
    AGUARDANDO_RESPOSTA = "Aguardando Resposta",
    ENVIO_DE_OBJETO = "Envio de Objeto",
    FINALIZADO = "Finalizado",
    FINALIZADO_POR_FALTA_DE_RETORNO = "Finalizado por Falta de Retorno"
}

export enum TIPO_USUARIO_MIDDLEWARE {
    ADMIN = "ADMIN",
    CLIENT = "CLIENT"
}

export enum TIPO_CHAMADO {
    COMPUTADOR = "Computador",
    NOTEBOOK = "Notebook",
    IMPRESSORA = "Impressora",
    MONITOR = "Monitor",
    MELHORIA = "Melhoria de Sistema",
    INSTALACAO = "Instalação/Configuração",
    ACESSO = "Solicitação de Acesso",
    SUPORTE = "Suporte Técnico",
    OUTRO = "Outros",
}

export enum EMAIL {
    ABERTURA_CHAMADO = "Abertura de Chamado",
    ATUALIZACAO_CHAMADO = "Atualização de Chamado",
    FECHAMENTO_CHAMADO = "Fechamento de Chamado"
}

const base = [
    "{{nome_usuario}}",
    "{{titulo_chamado}}",
    "{{descricao_chamado}}",
    "{{tipo_chamado}}",
    "{{status_chamado}}",
    "{{data_criacao}}"
]

const baseAtualizacao = [
    ...base,
    "{{prioridade_chamado}}",
    "{{observacao_chamado}}",
    "{{usuario_responsavel_chamado}}",
]

const baseFechamento = [
    ...baseAtualizacao,
    "{{terminado_em}}",
]

export const TIPO_EMAIL = [
    {
        tipo: Object.keys(EMAIL)[0],
        descricao: EMAIL.ABERTURA_CHAMADO,
        campos: base
    },
    {
        tipo: Object.keys(EMAIL)[1],
        descricao: EMAIL.ATUALIZACAO_CHAMADO,
        campos: baseAtualizacao
    },
    {
        tipo: Object.keys(EMAIL)[2],
        descricao: EMAIL.FECHAMENTO_CHAMADO,
        campos: baseFechamento
    },
]