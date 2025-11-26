export interface DashboardEntidade {
    status: StatusDashboard[];
    setor: SetorDashboard[];
    tempoMedio: TempoMedioAtendimento;
    tempoMedioPrioridade: TempoMedioAtendimentoPorPrioridade[];
}

export interface SetorDashboard {
    data: string;
    setor: string;
    quantidade: number;
}

export interface StatusDashboard {
    status: string;
    quantidade: number;
}

export interface TempoMedioAtendimento {
    tempoMedio: number;
}

export interface TempoMedioAtendimentoPorPrioridade {
    prioridade: string;
    tempoMedio: number;
    sla: boolean;
    cor?: string;
}