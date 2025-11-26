import ChamadoSecao from "@/components/chamados/chamadosSecao";

export default async function ChamadoPage({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    return <ChamadoSecao id={id} />;
}