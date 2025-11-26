import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import usePrioridadeHook from "@/hooks/usePrioridadeHook";
import PrioridadeForm from "./prioridadeForm";
import { PrioridadeFormData } from "@/lib/validations/prioridadeValidation";
import { useEffect } from "react";

interface PrioridadeContainerFormProps {
    setOpen: (open: boolean) => void;
    id?: string;
}

export default function PrioridadeContainerForm({ setOpen, id }: PrioridadeContainerFormProps) {
    const { atualizar, form: formPrioridade, state: { isLoading }, criar, buscar, limparFormulario } = usePrioridadeHook();

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

    const onSubmit = async (data: PrioridadeFormData) => {
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

    return (
        <Form {...formPrioridade}>
            <form onSubmit={formPrioridade.handleSubmit(onSubmit)} className="w-full ">
                <PrioridadeForm form={formPrioridade} />

                <DialogFooter className="gap-2">
                    <Button type="button" variant="outline" onClick={handleCancel}>
                        Cancelar
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                        {id ? "Salvar" : "Criar"}
                    </Button>
                </DialogFooter>
            </form>
        </Form >
    );
}