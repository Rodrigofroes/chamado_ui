"use client";

import { Plus } from "lucide-react";
import Cabecalho from "../cabecalho";
import Container from "../container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import PrioridadeComponente from "./prioridade/prioridadeComponente";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import PrioridadeContainerForm from "./prioridade/prioridadeContainerForm";
import TemplateContainer from "./template/templateContainer";
import TemplateComponente from "./template/templateComponente";

type TabType = "prioridades" | "unidades" | "smtp" | "template-email";

interface DialogConfig {
    titulo: string;
    descricao: string;
}

const dialogConfigs: Record<TabType, DialogConfig> = {
    prioridades: {
        titulo: "Prioridade",
        descricao: "Gerencie as prioridades do sistema"
    },
    unidades: {
        titulo: "Unidade",
        descricao: "Gerencie as unidades do sistema"
    },
    smtp: {
        titulo: "Configuração SMTP",
        descricao: "Configure o servidor SMTP"
    },
    "template-email": {
        titulo: "Template de E-mail",
        descricao: "Gerencie os templates de e-mail"
    }
};

export default function ConfiguracoesComponente() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const initialTab = (searchParams.get("tab") ?? "prioridades") as TabType;
    const [tab, setTab] = useState<TabType>(initialTab);
    const [id, setId] = useState<string | undefined>(undefined);
    const [open, setOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const addParamTab = (newTab: TabType) => {
        setTab(newTab);
        const url = new URL(window.location.href);
        url.searchParams.set("tab", newTab);
        router.push(url.toString());
    }

    useEffect(() => {
        addParamTab(initialTab);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialTab]);

    const handleEdit = (editId: string) => {
        setId(editId);
        setOpen(true);
    }

    const handleAdd = () => {
        setId(undefined);
        setOpen(true);
    }

    const handleCloseDialog = (isOpen: boolean) => {
        if (!isOpen) {
            setId(undefined);
            // Força atualização da lista ao fechar o dialog
            setRefreshKey(prev => prev + 1);
        }
        setOpen(isOpen);
    }

    const renderFormContent = () => {
        switch (tab) {
            case "prioridades":
                return <PrioridadeContainerForm setOpen={handleCloseDialog} id={id} />;
            case "unidades":
                // return <UnidadeContainerForm setOpen={handleCloseDialog} id={id} />;
                return <div>Form Unidades aqui</div>;
            case "smtp":
                // return <SmtpContainerForm setOpen={handleCloseDialog} />;
                return <div>Form SMTP aqui</div>;
            case "template-email":
                // return <TemplateEmailContainerForm setOpen={handleCloseDialog} id={id} />;
                return <TemplateContainer setOpen={handleCloseDialog} id={id} />;
            default:
                return null;
        }
    }

    const currentDialogConfig = dialogConfigs[tab];

    return (
        <Container>
            <Cabecalho
                titulo="Configurações"
                descricao="Gerencie as configurações do sistema."
                onAdicionar={handleAdd}
                icon={Plus}
                textoBotao="Adicionar"
            />

            <Tabs value={tab} onValueChange={(value) => addParamTab(value as TabType)}>
                <TabsList>
                    <TabsTrigger value="prioridades">Prioridades</TabsTrigger>
                    <TabsTrigger value="unidades">Unidades</TabsTrigger>
                    <TabsTrigger value="smtp">SMTP</TabsTrigger>
                    <TabsTrigger value="template-email">Template de E-mail</TabsTrigger>
                </TabsList>

                <TabsContent value="prioridades">
                    <PrioridadeComponente key={refreshKey} handlerEdit={handleEdit} />
                </TabsContent>

                <TabsContent value="unidades">
                    {/* <UnidadeComponente handlerEdit={handleEdit} handlerDelete={() => {}} /> */}
                    <div>Conteúdo Unidades aqui</div>
                </TabsContent>

                <TabsContent value="smtp">
                    {/* Formulário SMTP não precisa de lista */}
                    <div>Conteúdo SMTP aqui</div>
                </TabsContent>

                <TabsContent value="template-email">
                    <TemplateComponente key={refreshKey} handlerEdit={handleEdit} />
                </TabsContent>
            </Tabs>

            <Dialog open={open} onOpenChange={handleCloseDialog}>
                <DialogContent className="min-w-[1200px] ">
                    <DialogHeader>
                        <DialogTitle className="mb-4">
                            {id ? `Editar ${currentDialogConfig.titulo}` : `Nova ${currentDialogConfig.titulo}`}
                        </DialogTitle>
                    </DialogHeader>
                    {renderFormContent()}
                </DialogContent>
            </Dialog>
        </Container>
    )
}