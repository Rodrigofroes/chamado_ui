"use client";

import { Form } from "@/components/ui/form";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import TemplateForm from "./templateForm";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { TIPO_EMAIL } from "@/lib/types/types";
import useTemplateEmailHook from "@/hooks/useTemplateEmailHook";
import { EmailFormData } from "@/lib/validations/emaiilValidation";

interface TemplateContainerProps {
    setOpen: (open: boolean) => void;
    id?: string;
}

export default function TemplateContainer({ setOpen, id }: TemplateContainerProps) {
    const { form, criar, limparFormulario, state: { isLoading }, buscar, atualizar } = useTemplateEmailHook();
    const [atalhosEmUso, setAtalhosEmUso] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                await buscar(id);
            } else {
                limparFormulario();
            }
        }

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const onSubmit = async (data: EmailFormData) => {
        if (!id) {
            await criar(data);
            setOpen(false);
        } else {
            await atualizar(id!, data);
            setOpen(false);
        }
    }


    const handleCancel = () => {
        limparFormulario();
        setOpen(false);
    }

    const handleAtalhoClick = (atalho: string) => {
        const corpoAtual = form.getValues("corpo");
        form.setValue("corpo", corpoAtual + " " + atalho);
        setAtalhosEmUso([...atalhosEmUso, atalho]);
    }

    const tipoAtual = form.watch("tipo");

    const fetchAtalhos = () => {
        const tipoEncontrado = TIPO_EMAIL.find((tipo) => tipo.tipo === tipoAtual);
        return tipoEncontrado?.campos || [];
    }

    return (
        <>
            <Tabs>
                <TabsList>
                    <TabsTrigger value="chamado">Chamado</TabsTrigger>
                    <TabsTrigger value="unidades">Unidades</TabsTrigger>
                </TabsList>

                <TabsContent value="chamado" className="overflow-auto p-2 max-h-[500px]">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <TemplateForm form={form} />

                            <div>
                                <h3 className="font-medium mb-2">Atalhos disponíveis:</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                    {fetchAtalhos().map((atalho, index) => (
                                        <Button
                                            key={index}
                                            type="button"
                                            size="sm"
                                            onClick={() => handleAtalhoClick(atalho)}
                                            variant="outline"
                                            className="justify-start font-mono text-xs"
                                        >
                                            {atalho}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <DialogFooter className="gap-2">
                                <Button type="button" variant="outline" onClick={handleCancel}>
                                    Cancelar
                                </Button>
                                <Button type="submit" disabled={isLoading}>
                                    {id ? "Salvar" : "Criar"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </TabsContent>

                <TabsContent value="unidades">
                    <div>Conteúdo Unidades aqui</div>
                </TabsContent>
            </Tabs>
        </>
    );
}