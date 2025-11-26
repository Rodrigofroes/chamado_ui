import SetorSecao from "@/components/setores/setorSecao";

export default async function SetoresPage({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    return <SetorSecao id={id} />;
}