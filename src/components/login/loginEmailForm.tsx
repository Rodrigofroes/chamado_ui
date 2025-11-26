import { useFormContext } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { LOGIN_STEPS } from "@/lib/types/auth";
import { loginDataForm } from "@/lib/validations/loginValidation";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import Loader from "../loader";

interface loginFormProps {
    setLoginStep: (step: LOGIN_STEPS) => void;
}

export function LoginEmailForm({ setLoginStep }: loginFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const { requestVerificationCode } = useAuthStore();
    const form = useFormContext<loginDataForm>();

    const onSubmit = async () => {
        setIsLoading(true);

        try {
            const isEmailValid = await form.trigger('email');
            if (!isEmailValid) {
                return;
            }
            const email = form.getValues('email');

            setIsLoading(true);
            // clearError();

            const success = await requestVerificationCode({ email });
            if (success) {
                setLoginStep(LOGIN_STEPS.LOGIN);
            }

            setIsLoading(false);
        } catch (error) {
            console.error("Erro ao enviar código:", error);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="flex flex-col gap-8">
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input
                                onFocus={() => form.clearErrors('email')}
                                autoComplete="email"
                                placeholder="ex: usuario@exemplo.com"
                                {...field}
                            />
                        </FormControl>
                        <FormDescription>
                            Digite o email usado no cadastro.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <Button className="w-full" onClick={onSubmit} disabled={isLoading}>
                {isLoading ? (
                    <>
                        <Loader texto="Entrando..." />
                    </>
                ) : (
                    'Entrar'
                )}
            </Button>
        </div>
    );
}