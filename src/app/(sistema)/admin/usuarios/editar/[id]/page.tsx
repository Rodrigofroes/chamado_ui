import UsuarioSecao from "@/components/usuarios/usuarioSecao";

export default async function UsuarioPage({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    return <UsuarioSecao id={id} />
}