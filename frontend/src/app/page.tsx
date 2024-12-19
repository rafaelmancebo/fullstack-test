'use client';
import AddNewAddress from '@/components/AddNewAddress';
import AddNewUser from '@/components/AddNewUser';
import ClientItem from '@/components/ClientItem';
import Confirm from '@/components/Confirm';
import CustomButton from '@/components/CustomButton';
import { useClients } from '@/hooks/useClients';

import { useState } from 'react';
import { User } from '../../utils/types';
import { useQueryClient } from '@tanstack/react-query';

export default function Home() {
    const queryClient = useQueryClient();
    const { getClients, deleteClients } = useClients({
        onSuccessNewClient: () => {},
        onSuccessDeleteClient: () => {
            queryClient.invalidateQueries({ queryKey: ['get-client'] });
        },
    });
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenNewUser, setIsOpenNewUser] = useState(false);
    const [isOpenNewAddress, setIsOpenNewAddress] = useState(false);
    const [currentClient, setCurrentClient] = useState<User | null>(null);

    // const [deleteType, setDeleteType] = useState<'client' | 'address' | null>(null);
    return (
        <div className='p-0 m-0 flex justify-start items-center flex-col min-h-screen'>
            <main className='flex flex-col items-center  w-full px-5'>
                <div className='p-4 border rounded-lg shadow-lg w-full max-w-[700px] mt-16'>
                    <h1 className='text-3xl font-bold mb-5'>OrioTek - clients</h1>
                    {getClients.data ? (
                        <div className='flex justify-end mb-6'>
                            <CustomButton
                                label={'Add a new client'}
                                onClick={() => {
                                    setIsOpenNewUser(true);
                                }}
                                color={'green'}
                            />
                        </div>
                    ) : null}

                    {getClients.data ? (
                        <ul className='pl-0'>
                            {getClients.data.map((item) => {
                                return (
                                    <ClientItem
                                        key={item.id}
                                        id={item.id}
                                        name={item.name}
                                        email={item.email}
                                        addresses={item.Address}
                                        onDelete={function (user: User): void {
                                            setIsOpen(true);
                                            setCurrentClient(user);
                                        }}
                                        onNewAddress={function (user: User): void {
                                            setCurrentClient(user);
                                            setIsOpenNewAddress(true);
                                        }}
                                    />
                                );
                            })}
                        </ul>
                    ) : (
                        <div className='flex flex-col items-center justify-center h-full mx-0 bg-slate-100 p-6 rounded-lg'>
                            <h2 className='text-xl font-bold'>No clients available</h2>
                            <p className='text-gray-500 mt-0 text-center'>
                                Please add some clients to see them here.
                            </p>
                            <div className='mt-4'>
                                <CustomButton
                                    label={'Add a new client'}
                                    onClick={() => {
                                        setIsOpenNewUser(true);
                                    }}
                                    color={'green'}
                                />
                            </div>
                        </div>
                    )}
                </div>
                <Confirm
                    title={
                        currentClient && currentClient?.Address.length > 0
                            ? 'You should delete the addresses first'
                            : 'Are you sure that you want to delete the client?'
                    }
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    onYes={() => {
                        if (currentClient && currentClient?.Address.length === 0) {
                            deleteClients.mutate({ id: currentClient?.id });
                        }
                        setIsOpen(false);
                    }}
                />
                <AddNewUser isOpen={isOpenNewUser} setIsOpen={setIsOpenNewUser} />
                {currentClient ? (
                    <AddNewAddress
                        isOpen={isOpenNewAddress}
                        setIsOpen={setIsOpenNewAddress}
                        user={currentClient}
                    />
                ) : null}
            </main>
        </div>
    );
}
