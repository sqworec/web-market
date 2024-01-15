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

const RegisterModal = () => {
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const [isLoading, setIsLoading] = useState(false)
    const [isPasswordShowed, setIsPasswordShowed] = useState(false)

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        axios.post('/api/register', data)
            .then(() => {
                registerModal.onClose()
            })
            .catch((error) => {
                toast.error("Что-то пошло не так")
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const toggle = useCallback(() => {
        registerModal.onClose()
        loginModal.onOpen()
    },[loginModal, registerModal])


    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Добро пожаловать в Минскхлебпром"
                subtitle="Создайте аккаунт"
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
                id="fullName"
                label="ФИО"
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
            {/*<Button*/}
            {/*    outline*/}
            {/*    label="Продолжить с Google"*/}
            {/*    icon={FcGoogle}*/}
            {/*    onClick={() => {}}*/}
            {/*/>*/}
            {/*<Button*/}
            {/*    outline*/}
            {/*    label="Продолжить с Github"*/}
            {/*    icon={AiFillGithub}*/}
            {/*    onClick={() => {}}*/}
            {/*/>*/}
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
                        onClick={toggle}
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
            isOpen={registerModal.isOpen}
            title="Регистрация"
            actionLabel="Продолжить"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default RegisterModal