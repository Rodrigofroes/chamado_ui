"use client";

import { Plus } from "lucide-react";
import Cabecalho from "../cabecalho";
import Container from "../container";
import AbrirChamadoForm from "./abrirChamadoForm";
import { Form } from "../ui/form";
import useAbrirChamadoHook from "@/hooks/useAbrirChamadoHook";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { AbrirChamadoFormData } from "@/lib/validations/chamadoValidation";
import { useRouter } from "next/navigation";
import Loader from "../loader";

export default function AbrirChamadoComponente() {
    const { form, criar, state: { isLoading } } = useAbrirChamadoHook();

    const router = useRouter();

    const onSubmit = async (data: AbrirChamadoFormData) => {
        const form = new FormData();
        form.append("titulo", data.titulo);
        form.append("tipo", data.tipo);
        form.append("descricao", data.descricao);
        if (data.documentos && data.documentos.length > 0) {
            data.documentos.forEach((doc) => {
                form.append("documentos", doc);
            });
        }

        const response = await criar(form);
        if (response) {
            router.push("/chamados");
        }
    }

    return (
        <Container>
            <Cabecalho
                titulo="Abrir Chamado"
                descricao="Abra um novo chamado para solicitar suporte ou relatar um problema."
                onAdicionar={() => { }}
                textoBotao="Abrir Chamado"
                icon={Plus}
            />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <Card className="rounded-md">
                        <CardContent>
                            <AbrirChamadoForm form={form} />
                            <CardFooter className="p-0 mt-4">
                                <Button
                                    disabled={isLoading}
                                    type="submit"
                                >
                                    {isLoading ?
                                        <Loader texto="Abrindo..." />
                                        : "Abrir Chamado"}
                                </Button>
                            </CardFooter>
                        </CardContent>
                    </Card>
                </form>
            </Form>
        </Container>
    );
}