import React from 'react';
import CustomButton from '../CustomButton';
import AddressItem from '../AddressItem';
import Confirm from '../Confirm';
import { User } from '../../../utils/types';
import { useAddress } from '@/hooks/useAddress';
import { useQueryClient } from '@tanstack/react-query';

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
    onDelete: (user: User) => void;
    onNewAddress: (user: User) => void;
}

const ClientItem = ({ id, name, email, addresses, onDelete, onNewAddress }: ClientItemProps) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [currentAddress, setCurrentAddress] = React.useState<number | null>(null);
    const queryClient = useQueryClient();
    const { deleteAddress } = useAddress({
        onSuccessDeleteAddress: () => {
            queryClient.invalidateQueries({ queryKey: ['get-client'] });
        },
    });
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
                    <div className='flex-1 flex justify-end gap-4'>
                        <CustomButton
                            label={'Delete'}
                            onClick={() => {
                                onDelete({ id, name, email, Address: addresses });
                            }}
                            color={'red'}
                        />

                        <CustomButton
                            label={'New address'}
                            onClick={() => {
                                onNewAddress({ id, name, email, Address: addresses });
                            }}
                            color={'green'}
                        />
                    </div>
                </div>
                {addresses && addresses.length > 0 ? (
                    <div className='my-2 p-2 border bg-gray-100 rounded-lg'>
                        {addresses.map((address) => {
                            return (
                                <AddressItem
                                    key={address.id}
                                    id={address.id}
                                    address={address.address}
                                    province={address.province}
                                    onDelete={function (id: number): void {
                                        setCurrentAddress(id);
                                        setIsOpen(true);
                                    }}
                                />
                            );
                        })}
                    </div>
                ) : null}
                <Confirm
                    title='Are you sure that you want to delete the address?'
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    onYes={() => {
                        if (currentAddress) {
                            deleteAddress.mutate({ id: currentAddress });
                        }
                        setIsOpen(false);
                    }}
                />
            </li>
        </>
    );
};

export default ClientItem;
