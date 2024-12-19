import React from 'react';
import CustomButton from '../CustomButton';

export type Address = {
    id: number;
    address: string;
    province: string;
    userId: number;
};

interface AddressItemProps {
    id: number;
    address: string;
    province: string;
    onDelete: (id: number) => void;
}

const AddressItem = ({ id, address, province, onDelete }: AddressItemProps) => {
    return (
        <>
            <li className='flex flex-wrap justify-between items-center gap-4 my-2'>
                <div className='w-full md:w-auto md:flex-1 flex gap-4'>
                    <div>
                        <h3 className='text-sm'>Adress</h3>
                        <div className='font-bold text-sm'>{address}</div>
                    </div>
                    <div>
                        <h3 className='text-sm'>Province</h3>
                        <div className='font-bold text-sm'>{province}</div>
                    </div>
                </div>
                <div className='flex-1 flex justify-end gap-4'>
                    <CustomButton
                        label={'Delete'}
                        onClick={() => {
                            onDelete(id);
                        }}
                        color={'red'}
                    />
                </div>
            </li>
        </>
    );
};

export default AddressItem;
