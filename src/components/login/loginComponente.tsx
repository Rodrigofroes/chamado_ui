"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { loginDataForm, loginSchema } from "@/lib/validations/loginValidation"
import { useState } from "react"
import { LOGIN_STEPS } from "@/lib/types/auth"
import { LoginEmailForm } from "./loginEmailForm"
import { LoginCodigoForm } from "./loginCodigoForm"
import { GalleryVerticalEnd } from "lucide-react"

export default function LoginComponente() {
    const [loginStep, setLoginStep] = useState<LOGIN_STEPS>(LOGIN_STEPS.REQUEST_CODE);

    const form = useForm<loginDataForm>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            code: ""
        }
    })

    const formSteps: { [key in LOGIN_STEPS]: React.ReactNode } = {
        [LOGIN_STEPS.REQUEST_CODE]: <LoginEmailForm setLoginStep={setLoginStep} />,
        [LOGIN_STEPS.LOGIN]: <LoginCodigoForm setLoginStep={setLoginStep} />,
    };

    return (
        <div className="max-w-md w-full mx-auto flex flex-col gap-12">
            <div className="flex flex-col items-center gap-2 text-center">
                <a
                    href="#"
                    className="flex flex-col items-center gap-2 font-medium"
                >
                    <div className="flex size-8 items-center justify-center rounded-md">
                        <GalleryVerticalEnd className="size-6" />
                    </div>
                    <span className="sr-only">Helpdesk</span>
                </a>
                <h1 className="text-xl font-bold">Bem-vindo ao Helpdesk</h1>
            </div>
            <FormProvider {...form}>{formSteps[loginStep]}</FormProvider>
        </div>
    );
}
