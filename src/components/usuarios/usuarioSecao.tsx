"use client";

import useSetorHook from "@/hooks/useSetoreHook";
import useUsuarioHook from "@/hooks/useUsuarioHook";
import { useEffect, useState } from "react";
import { Form } from "../ui/form";
import UsuarioForm from "./usuarioForm";
import Container from "../container";
import Cabecalho from "../cabecalho";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { UsuarioFormData } from "@/lib/validations/usuarioValidation";
import Loader from "../loader";

interface UsuarioSecaoProps {
    id?: string;
}

export default function UsuarioSecao({ id }: UsuarioSecaoProps) {
    const {
        form,
        state: { usuario, isLoading: isLoadingUsuarios, madeInitialFetch: madeInitialFetchUsuarios },
        criar,
        buscar,
        editar,
    } = useUsuarioHook();

    const {
        listar: listarSetores,
        state: { isLoading: isLoadingSetores, madeInitialFetch: madeInitialFetchSetores, setores }
    } = useSetorHook();

    const router = useRouter();

    useEffect(() => {
        const fetchUsuario = async () => {
            if (id) {
                await buscar(id);
            }
        }
        fetchUsuario();

        const fetchSetores = async () => {
            await listarSetores();
        }

        if (!madeInitialFetchUsuarios) {
            fetchUsuario();
        }

        if (!madeInitialFetchSetores) {
            fetchSetores();
        }

    }, [madeInitialFetchUsuarios, madeInitialFetchSetores]);

    const onSubmit = async (data: UsuarioFormData) => {
        let response;
        if (!id) {
            response = await criar(data);
        } else {
            response = await editar(id, data);
        }

        if (response) {
            router.back();
        }
    }

    return (
        <Container>
            <Cabecalho
                titulo={id ? "Editar Usuário" : "Criar Usuário"}
                descricao={id ? "Edite as informações do usuário." : "Crie um novo usuário para sua empresa."}
                onAdicionar={() => router.back()}
                textoBotao="Voltar"
                icon={ArrowLeft}
            />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                    <Card>
                        <CardContent className="flex flex-col gap-4">
                            <UsuarioForm form={form} setores={setores!} usuario={usuario!} isLoading={isLoadingSetores} />
                            <CardFooter className="p-0">
                                <Button type="submit" disabled={isLoadingSetores} className="w-52">
                                    {id ? (
                                        isLoadingSetores ? (
                                            <div className="flex items-center">
                                                <Loader texto="Salvando..." />
                                            </div>
                                        ) : (
                                            "Salvar alterações"
                                        )
                                    ) : isLoadingSetores ? (
                                        <div className="flex items-center">
                                            <Loader texto="Salvando..." />
                                        </div>
                                    ) : (
                                        "Criar usuário"
                                    )}
                                </Button>
                            </CardFooter>
                        </CardContent>
                    </Card>
                </form>
            </Form>
        </Container>
    );
}