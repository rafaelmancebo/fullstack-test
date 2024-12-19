import { Button } from '@headlessui/react';
import React from 'react';

interface CustomButtonProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    color: 'blue' | 'red' | 'green';
    type?: 'button' | 'submit' | 'reset';
}

const CustomButton: React.FC<CustomButtonProps> = ({
    type = 'button',
    color,
    label,
    onClick,
    disabled = false,
}) => {
    const btnColor =
        color === 'blue'
            ? 'bg-sky-600 data-[hover]:bg-sky-500 data-[active]:bg-sky-700'
            : color === 'red'
            ? 'bg-red-500 data-[hover]:bg-red-400 data-[active]:bg-red-700'
            : 'bg-green-600 data-[hover]:bg-green-500 data-[active]:bg-green-700';
    return (
        <>
            <Button
                onClick={onClick}
                disabled={disabled}
                className={`rounded-md py-2 px-4 text-sm text-white ${btnColor} font-semibold whitespace-nowrap`}
                type={type}
            >
                {label}
            </Button>
        </>
    );
};

export default CustomButton;
