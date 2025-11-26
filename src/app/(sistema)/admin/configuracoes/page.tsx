"use client";

import ConfiguracoesComponente from "@/components/configuracoes/configuracoesComponente";
import { Suspense } from "react";

export default function ConfiguracoesPage() {
    return (
        <Suspense>
             <ConfiguracoesComponente />
        </Suspense>
    );
}