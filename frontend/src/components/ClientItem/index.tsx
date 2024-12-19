import { Button } from '@headlessui/react';
import React from 'react';
import CustomButton from '../CustomButton';
import AddressItem from '../AddressItem';
import Confirm from '../Confirm';

export type Address = {
    id: number;
    address: string;
    province: string;
    userId: number;
};

interface ClientItemProps {
    id: number;
    name: string;
    email: string;
    addresses: Address[];
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
    onViewAddress: (id: number) => void;
}

const ClientItem = ({
    id,
    name,
    email,
    addresses,
    onDelete,
    onEdit,
    onViewAddress,
}: ClientItemProps) => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <>
            <li className='my-2 border-b pb-2'>
                <div className='flex flex-wrap justify-between items-center gap-4'>
                    <div className='w-full md:w-auto md:flex-1 flex gap-4'>
                        <div>
                            <h3 className='text-sm'>Name</h3>
                            <div className='font-bold text-sm'>{name}</div>
                        </div>
                        <div>
                            <h3 className='text-sm'>Email</h3>
                            <div className='font-bold text-sm'>{email}</div>
                        </div>
                    </div>
                    <div className='flex-1 flex gap-4'>
                        <CustomButton
                            label={'Delete'}
                            onClick={() => {
                                onDelete(id);
                            }}
                            color={'red'}
                        />
                        {addresses ? (
                            <CustomButton
                                label={'Addresses'}
                                onClick={() => {
                                    onViewAddress(id);
                                }}
                                color={'blue'}
                            />
                        ) : null}

                        <CustomButton
                            label={'New address'}
                            onClick={() => {
                                onViewAddress(id);
                            }}
                            color={'green'}
                        />
                    </div>
                </div>
                {addresses.map((address) => {
                    return (
                        <AddressItem
                            id={address.id}
                            address={address.address}
                            province={address.province}
                            onDelete={function (id: number): void {
                                throw new Error('Function not implemented.');
                            }}
                        />
                    );
                })}
                <Confirm
                    title='Are you sure that you want to delete the address?'
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    onYes={() => {
                        console.log('Yes');
                        setIsOpen(false);
                    }}
                />
            </li>
        </>
    );
};

export default ClientItem;
