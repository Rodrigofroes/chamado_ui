export const FormatarHorasParaSegundos = (horas: number): number => {
    return horas * 3600;
}

export const FormatarSegundosParaHorasInteger = (segundos: number): number => {
    const horas = segundos / 3600;
    return horas;
}

export const FormatarSegundosParaHoras = (segundos: number): string => {
    const horas = segundos / 3600;

    if (horas < 1) {
        const minutos = Math.round(horas * 60);
        return `${minutos} min`;
    }

    return Number.isInteger(horas)
        ? `${horas} h`
        : `${horas.toFixed(1)} h`;
};