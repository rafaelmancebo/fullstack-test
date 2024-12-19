import { Button } from '@headlessui/react';
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: boolean;
    errorText?: string;
}

const Input = (props: InputProps) => {
    const { className, label, error, errorText, ...prop } = props;
    return (
        <div className='flex flex-col mb-4'>
            {label ? <label className='text-sm mb-1'>{label}</label> : null}
            <input
                {...prop}
                className={`${className} px-4 py-2 text-base border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent`}
            />
            {error ? <p className='text-red-500 text-sm my-2'>{errorText}</p> : null}
        </div>
    );
};

export default Input;
