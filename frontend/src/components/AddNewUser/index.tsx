import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import React, { useRef } from 'react';
import CustomButton from '../CustomButton';
import { useForm, SubmitHandler } from 'react-hook-form';
import Input from '../Input';
import { useClients } from '@/hooks/useClients';
import { useQueryClient } from '@tanstack/react-query';

interface AddNewUserProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}
type Inputs = {
    name: string;
    email: string;
};
const AddNewUser = ({ isOpen, setIsOpen }: AddNewUserProps) => {
    const form = useRef<HTMLFormElement>(null);
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>();
    const { newClients, getClients } = useClients({
        onSuccessNewClient: () => {
            setIsOpen(false);
            queryClient.invalidateQueries({ queryKey: ['get-client'] });
        },
    });
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        newClients.mutate(data);
    };
    return (
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
                            placeholder='Full name'
                            {...register('name', {
                                required: 'Full name is required',
                            })}
                            error={errors.name ? true : false}
                            errorText={errors.name ? errors.name.message : undefined}
                            label='Full name'
                        />
                        <Input
                            type='email'
                            placeholder='Email'
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: 'Invalid email address',
                                },
                                validate: (value) =>
                                    !getClients.data?.some((client) => client.email === value) ||
                                    'Email already exists',
                            })}
                            error={errors.email ? true : false}
                            errorText={errors.email ? errors.email.message : undefined}
                            label='Email'
                        />

                        <div className='flex gap-4 justify-end'>
                            <CustomButton
                                label='Cancel'
                                onClick={() => {
                                    reset();
                                    setIsOpen(false);
                                }}
                                color={'blue'}
                            />
                            <CustomButton
                                label='Save'
                                type='submit'
                                color={'green'}
                                disabled={newClients.isPending}
                                onClick={() => {}}
                            />
                        </div>
                    </form>
                </DialogPanel>
            </div>
        </Dialog>
    );
};

export default AddNewUser;
