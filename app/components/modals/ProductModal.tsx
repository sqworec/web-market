'use client'

import Modal from "@/app/components/modals/Modal";
import {useMemo, useState} from "react";
import Heading from "@/app/components/Heading";
import {categories} from "@/app/components/navbar/Categories";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import { UploadDropzone} from "@/utils/uploadthing";
import toast from "react-hot-toast";
import useProductModal from "@/app/hooks/useProductModal";
import Image from "next/image";
import Input from "@/app/components/inputs/Input";
import axios from "axios";
import {useRouter} from "next/navigation";

enum STEPS {
    CATEGORY = 0,
    DESCRIPTION = 1,
    WEIGHT = 2,
    IMAGES = 3,
    PRICE = 4,
}

const ProductModal = () => {
    const router = useRouter()
    const productModal = useProductModal()

    const [step, setStep] = useState(STEPS.CATEGORY)
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            price: 1,
            weight: 1,
            imageSrc: '',
            title: '',
            description: '',
        }
    })

    const category = watch('category')
    const imageSrc = watch('imageSrc')

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    const onBack = () => {
        setStep((value) => value - 1)
    }
    const onNext = () => {
        setStep((value) => value + 1)
    }
    
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICE) {
            return onNext()
        }

        setIsLoading(true)

        axios.post('/api/products', data)
            .then(() => {
                toast.success('Продукт успешно добавлен!')
                router.refresh()
                reset()
                setStep(STEPS.CATEGORY)
                productModal.onClose()
            })
            .catch(() => {
                toast.error('Что-то пошло не так!')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Создать'
        }

        return 'Дальше'
    }, [step])

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined
        }

        return 'Назад'
    }, [step])

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Наиболее подходящая категория"
                subtitle="Выберите категорию"
            />

            <div
                className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-3
                    max-h-[50vh]
                    overflow-y-auto
                "
            >
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput
                            onClick={(category) => setCustomValue('category', category)}
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    )

    if (step === STEPS.WEIGHT) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Сколько весит данный продукт?"
                    subtitle="Укажите вес"
                />
                <Input
                    id="weight"
                    label="Вес"
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Как бы вы описали данный продукт?"
                    subtitle="Опишите в нескольких словах"
                />
                <Input
                    id="title"
                    label="Название"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr/>
                <Input
                    id="description"
                    label="Описание"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />

            </div>

        )
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Добавьте фотографию к продукту"
                    subtitle="Дайте покупателю знать как выглядит ваш продукт!"
                />

                {!imageSrc ? (
                    <UploadDropzone
                        appearance={{
                            uploadIcon: {
                                width: '50px',
                                height: '50px'
                            },
                            container: {
                                border: '1px dashed black',
                                padding: '10% 0',
                            },
                            button: {
                                color: 'black',
                                border: '1px solid gray',
                                padding: '0 10%',
                            }
                        }}
                        endpoint='imageUploader'
                        onClientUploadComplete={(res) => {
                            setCustomValue('imageSrc', res[0].url)
                            toast.success("Изображение успешно загружено")
                            console.log(res[0].url)
                        }}
                        onUploadError={(error: Error) => {
                            console.log(error.message)
                            toast.error("Что-то пошло не так!")
                        }}
                    />
                ) : (
                    <Image
                        src={imageSrc}
                        alt={'фото'}
                        width={500}
                        height={300}
                    />
                )}
            </div>
        )
    }

    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Теперь, определитесь с ценой"
                    subtitle="Укажите цену"
                />
                <Input
                    id="price"
                    label="Цена"
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    return (
        <Modal
            isOpen={productModal.isOpen}
            onClose={productModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            body={bodyContent}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            title="Добавьте новую позицию"

        />
    )
}

export default ProductModal