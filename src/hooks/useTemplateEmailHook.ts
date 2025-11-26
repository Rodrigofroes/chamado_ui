import { EmailService } from "@/lib/api/services/emailService";
import { TemplateEmailEntidade } from "@/lib/types/entidades/templateEmailEntidade";
import { EMAIL } from "@/lib/types/types";
import { EmailFormData, emailSchema } from "@/lib/validations/emaiilValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface StateHook {
    templates: TemplateEmailEntidade[] | null;
    template: TemplateEmailEntidade | null;
    error: string | null;
    madeInitialFetch: boolean;
    isLoading: boolean;
}

const initialState: StateHook = {
    templates: [],
    template: null,
    error: null,
    madeInitialFetch: false,
    isLoading: false
};

const useTemplateEmailHook = () => {
    const [state, setState] = useState<StateHook>(initialState);

    const handleState = (partialState: Partial<StateHook>) => {
        setState((prevState) => ({
            ...prevState,
            ...partialState,
        }));
    }

    const form = useForm<EmailFormData>({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            nome: "",
            assunto: "",
            corpo: "",
            tipo: "ABERTURA_CHAMADO"
        },
    })

    const listar = async () => {
        try {
            handleState({ isLoading: true, madeInitialFetch: true });
            const response = await EmailService.listar();
            if (!response.success && !response.data) {
                handleState({ error: response.detalhes || "Erro ao listar templates de email" });
                toast.error(response.detalhes || "Erro ao listar templates de email");
                return;
            }
            handleState({ templates: response.data });
        } catch (error) {
            console.error("Error listing templates:", error);
            handleState({ error: "Erro ao listar templates de email" });
        } finally {
            handleState({ isLoading: false });
        }
    }

    const criar = async (data: EmailFormData) => {
        try {
            handleState({ isLoading: true });
            const response = await EmailService.criar(data);
            if (!response.success && !response.data) {
                handleState({ error: response.detalhes || "Erro ao criar template de email" });
                toast.error(response.detalhes || "Erro ao criar template de email");
                return;
            }
            toast.info("Template de email criado com sucesso")
            handleState({ template: response.data });
            form.reset();
        } catch (error) {
            console.error("Error creating template:", error);
            handleState({ error: "Erro ao criar template de email" });
        } finally {
            handleState({ isLoading: false });
        }
    }

    const atualizar = async (id: string, data: EmailFormData) => {
        try {
            handleState({ isLoading: true });
            const response = await EmailService.atualizar(id, data);
            if (!response.success && !response.data) {
                handleState({ error: response.detalhes || "Erro ao atualizar template de email" });
                toast.error(response.detalhes || "Erro ao atualizar template de email");
                return;
            }
            toast.info("Template de email atualizado com sucesso")
            handleState({ template: response.data });
        } catch (error) {
            console.error("Error creating template:", error);
            handleState({ error: "Erro ao atualizar template de email" });
        } finally {
            handleState({ isLoading: false });
        }
    }


    const buscar = async (id: string) => {
        try {
            handleState({ isLoading: true });
            const response = await EmailService.buscar(id);
            if (!response.success && !response.data) {
                handleState({ error: response.detalhes || "Erro ao buscar template de email" });
                toast.error(response.detalhes || "Erro ao buscar template de email");
                return;
            }

            form.reset({
                nome: response.data?.nome ?? "",
                assunto: response.data?.assunto ?? "",
                corpo: response.data?.corpo ?? "",
                tipo: (response.data?.tipo ?? "ABERTURA_CHAMADO") as "ABERTURA_CHAMADO" | "ATUALIZACAO_CHAMADO" | "FECHAMENTO_CHAMADO"
            })


            handleState({ template: response.data });

        } catch (error) {
            console.error("Error creating template:", error);
            handleState({ error: "Erro ao criar template de email" });
        } finally {
            handleState({ isLoading: false });
        }
    }

    const deletar = async (id: string) => {
        try {
            handleState({ isLoading: true });
            const response = await EmailService.deletar(id);
            if (!response.success && !response.data) {
                handleState({ error: response.detalhes || "Erro ao deletar template de email" });
                toast.error(response.detalhes || "Erro ao deletar template de email");
                return;
            }

            toast.info("Template deletado com sucesso")
            handleState({ template: null });
        } catch (error) {
            console.error("Error creating template:", error);
            handleState({ error: "Erro ao deletar template de email" });
        } finally {
            handleState({ isLoading: false });
        }
    }

    const limparFormulario = () => {
        form.reset({
            nome: "",
            assunto: "",
            corpo: "",
            tipo: "ABERTURA_CHAMADO"
        })
        handleState({ template: null });
    }

    return {
        form,
        listar,
        criar,
        limparFormulario,
        state,
        buscar,
        deletar,
        atualizar
    }
}

export default useTemplateEmailHook;