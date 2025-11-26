"use client";

import { LOGIN_STEPS } from "@/lib/types/auth";
import { loginDataForm } from "@/lib/validations/loginValidation";
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { useAuthStore } from "@/lib/store/authStore";
import { useState } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";
import Loader from "../loader";
import { AUTH_REDIRECT } from "@/lib/constants/urls";


interface loginFormProps {
    setLoginStep: (step: LOGIN_STEPS) => void;
}

export function LoginCodigoForm({ setLoginStep }: loginFormProps) {
    const { login, requestVerificationCode } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);
    const form = useFormContext<loginDataForm>();

    const router = useRouter();

    const onSubmit = async () => {
        const isCodeValid = await form.trigger('code');
        if (!isCodeValid) {
            return;
        }

        setIsLoading(true);

        const data = form.getValues();
        const success = await login(data);

        if (success) {
            router.push(AUTH_REDIRECT.rota);
        }

        setIsLoading(false);
    };

    const onBack = () => {
        setLoginStep(LOGIN_STEPS.REQUEST_CODE);
    };

    const onResendCode = async () => {
        const email = form.getValues('email');

        setIsLoading(true);

        await requestVerificationCode({ email });

        setIsLoading(false);
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="mb-8 space-y-2 text-center">
                <h2 className="text-2xl font-semibold tracking-tight">Verifique seu email</h2>
                <p className="text-muted-foreground text-sm">
                    Enviamos um código de verificação para: {form.getValues('email')}, verifique sua caixa de
                    entrada e spam.
                </p>
            </div>
            <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <InputOTP
                                maxLength={6}
                                {...field}
                                onChange={field.onChange}
                                onFocus={() => form.clearErrors('code')}
                                containerClassName="justify-center"
                            >
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                </InputOTPGroup>
                                <InputOTPGroup>
                                    <InputOTPSlot index={1} />
                                </InputOTPGroup>
                                <InputOTPGroup>
                                    <InputOTPSlot index={2} />
                                </InputOTPGroup>
                                <InputOTPGroup>
                                    <InputOTPSlot index={3} />
                                </InputOTPGroup>
                                <InputOTPGroup>
                                    <InputOTPSlot index={4} />
                                </InputOTPGroup>
                                <InputOTPGroup>
                                    <InputOTPSlot index={5} />
                                </InputOTPGroup>
                            </InputOTP>
                        </FormControl>
                        <FormMessage className="text-center" />
                    </FormItem>
                )}
            />

            <div>
                <Button type="button" onClick={onSubmit} className="w-full" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Loader texto="Entrando..." />
                        </>
                    ) : (
                        'Confirmar'
                    )}
                </Button>
                <Button
                    type="button"
                    variant="link"
                    className="mt-2 w-full"
                    disabled={isLoading}
                    onClick={onResendCode}
                >
                    {isLoading ? (
                        <>
                            <Loader texto="Reenviando código..." />
                        </>
                    ) : (
                        'Reenviar código'
                    )}
                </Button>

                <Separator className="my-2" />

                <Button
                    type="button"
                    variant="link"
                    className="mt-2 w-full"
                    disabled={isLoading}
                    onClick={onBack}
                >
                    Voltar
                </Button>

            </div>
        </div>
    );
}
