import { Button, Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import React from 'react';
import CustomButton from '../CustomButton';

export type Address = {
    id: number;
    address: string;
    province: string;
    userId: number;
};

interface ConfirmProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    onYes: () => void;
    title: string;
    description?: string;
}

const Confirm = ({ onYes, isOpen, setIsOpen, title, description }: ConfirmProps) => {
    return (
        <>
            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className='relative z-50 transition-opacity duration-300 ease-in-out'
            >
                <div className='fixed inset-0 flex w-screen items-center justify-center p-4 bg-black bg-opacity-25'>
                    <DialogPanel className='max-w-lg space-y-4 border bg-white p-8 shadow-2xl rounded-lg transform transition-transform duration-300 ease-in-out'>
                        <DialogTitle className='font-bold'>{title}</DialogTitle>
                        {description ? <Description>{description}</Description> : null}

                        <div className='flex gap-4 justify-end'>
                            <CustomButton
                                label='Cancel'
                                onClick={() => setIsOpen(false)}
                                color={'blue'}
                            />
                            <CustomButton label='Yes' onClick={onYes} color={'green'} />
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
};

export default Confirm;
