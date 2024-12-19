import { Button, Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import React, { useRef } from 'react';
import CustomButton from '../CustomButton';
import { useForm, SubmitHandler } from 'react-hook-form';
import Input from '../Input';
export type Address = {
    id: number;
    address: string;
    province: string;
    userId: number;
};

interface ConfirmProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}
type Inputs = {
    address: string;
    province: string;
    item?: Address;
};
const AddNewAddress = ({ isOpen, setIsOpen }: ConfirmProps) => {
    const form = useRef<HTMLFormElement>(null);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
    return (
        <>
            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className='relative z-50 transition-opacity duration-300 ease-in-out'
            >
                <div className='fixed inset-0 flex w-screen items-center justify-center p-4 bg-black bg-opacity-25'>
                    <DialogPanel className='max-w-lg space-y-4 border bg-white p-8 shadow-2xl rounded-lg transform transition-transform duration-300 ease-in-out'>
                        <DialogTitle className='font-bold'>Add a new client</DialogTitle>
                        <form ref={form} onSubmit={handleSubmit(onSubmit)}>
                            <Input
                                type='text'
                                placeholder='Address'
                                {...register('address', {
                                    required: 'Address is required',
                                })}
                                error={errors.address ? true : false}
                                errorText={errors.address ? errors.address.message : undefined}
                                label='Address'
                            />
                            <Input
                                type='text'
                                placeholder='Province'
                                {...register('province', {
                                    required: 'Province is required',
                                })}
                                error={errors.province ? true : false}
                                errorText={errors.province ? errors.province.message : undefined}
                                label='Province'
                            />

                            <div className='flex gap-4 justify-end'>
                                <CustomButton
                                    label='Cancel'
                                    onClick={() => setIsOpen(false)}
                                    color={'blue'}
                                />
                                <CustomButton
                                    label='Save'
                                    type='submit'
                                    onClick={() => {}}
                                    color={'green'}
                                />
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
};

export default AddNewAddress;
