import { Suspense } from "react";
import ChamadosComponente from "@/components/chamados/chamadosComponente";

export default function ChamadosPage() {
  return (
    <Suspense>
      <ChamadosComponente />
    </Suspense>
  );
}
