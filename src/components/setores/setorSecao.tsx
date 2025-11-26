"use client";

import { useRouter } from "next/navigation";
import Cabecalho from "../cabecalho";
import Container from "../container";
import { ArrowLeft, Loader2 } from "lucide-react";
import useUsuarioHook from "@/hooks/useUsuarioHook";
import { useEffect } from "react";
import useSetorHook from "@/hooks/useSetoreHook";
import { Form } from "../ui/form";
import SetorForm from "./setorForm";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { SetorDataForm } from "@/lib/validations/setorValidation";
import Loader from "../loader";

interface SetorSecaoProps {
    id?: string;
}

export default function SetorSecao({ id }: SetorSecaoProps) {
    const { listar, state: { madeInitialFetch, usuarios } } = useUsuarioHook();
    const { form, criar, state: { isLoading: isLoadingSetor }, buscar, atualizar } = useSetorHook();
    const router = useRouter();

    useEffect(() => {
        const fetchSetor = async () => {
            if (id) {
                await buscar(id);
            }
        }

        const fetchUsuarios = async () => {
            await listar();
        }
        if (!madeInitialFetch) {
            fetchUsuarios();
        }

        fetchSetor();

    }, [madeInitialFetch, id]);

    const onSubmit = async (data: SetorDataForm) => {
        let response;
        if (!id) {
            response = await criar(data);
        } else {
            response = await atualizar(id, data);
        }

        if (response) {
            router.back();
        }
    }

    return (
        <Container>
            <Cabecalho
                titulo={id ? "Editar Setor" : "Criar Setor"}
                descricao={id ? "Edite as informações do setor." : "Crie um novo setor para sua empresa."}
                onAdicionar={() => router.back()}
                textoBotao="Voltar"
                icon={ArrowLeft}
            />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                    <Card>
                        <CardContent className="flex flex-col gap-4">
                            <SetorForm form={form} usuarios={usuarios!} isLoading={isLoadingSetor} />
                            <CardFooter className="p-0">
                                <Button type="submit" disabled={isLoadingSetor} className="w-52">
                                    {id ? (
                                        isLoadingSetor ? (
                                            <div className="flex items-center">
                                                <Loader texto="Salvando..." />
                                            </div>
                                        ) : (
                                            "Salvar alterações"
                                        )
                                    ) : isLoadingSetor ? (
                                        <div className="flex items-center">
                                            <Loader texto="Salvando..." />
                                        </div>
                                    ) : (
                                        "Criar setor"
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