'use client'

import axios from "axios";
import {AiFillGithub} from "react-icons/ai";
import {FcGoogle} from "react-icons/fc";
import {useCallback, useState} from "react";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "@/app/components/modals/Modal";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import toast from "react-hot-toast";
import Button from "@/app/components/Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import {signIn} from "next-auth/react";
import {fastRefreshReducer} from "next/dist/client/components/router-reducer/reducers/fast-refresh-reducer";
import {router} from "next/client";
import {useRouter} from "next/navigation";

const LoginModal = () => {
    const router = useRouter()
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        signIn('credentials', {
            ...data,
            redirect: false,
        })
            .then((callback) => {
                setIsLoading(false)

                if (callback?.ok) {
                    toast.success('Вход осуществлен успешно')
                    router.refresh()
                    loginModal.onClose()
                }

                if (callback?.error) {
                    toast.error(callback.error)
                }
            })
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="С возвращением!"
                subtitle="Войдите в аккаунт"
                center
            />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                label="Пароль"
                type="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr/>
            <Button
                outline
                label="Продолжить с Google"
                icon={FcGoogle}
                onClick={() => {}}
            />
            <Button
                outline
                label="Продолжить с Github"
                icon={AiFillGithub}
                onClick={() => {}}
            />
            <div
                className="
                    text-neutral-500
                    text-center
                    mt-4
                    font-light
                "
            >
                <p>Есть аккаунт?
                    <span
                        onClick={registerModal.onClose}
                        className="
                            text-neutral-800
                            cursor-pointer
                            hover:underline
                        "
                    > Авторизация
                    </span>
                </p>
            </div>
        </div>
    )


    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Авторизация"
            actionLabel="Продолжить"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            //footer={footerContent}
        />
    )
}

export default LoginModal