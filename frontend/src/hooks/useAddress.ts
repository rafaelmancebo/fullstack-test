import { useMutation } from '@tanstack/react-query';
import api from '../../utils/api';

export function useAddress({
    onSuccessNewAddress,
    onErrorNewAddress,
    onSuccessDeleteAddress,
    onErrorDeleteAddress,
}: {
    onSuccessNewAddress?: () => void;
    onErrorNewAddress?: () => void;
    onSuccessDeleteAddress?: () => void;
    onErrorDeleteAddress?: () => void;
}) {
    const newAddress = useMutation({
        mutationFn: async ({
            address,
            province,
            user,
        }: {
            address: string;
            province: string;
            user: number;
        }) => {
            const response = await api.post(`/api/addresses/${user}`, { address, province });
            return response.data;
        },
        onSuccess: async () => {
            if (onSuccessNewAddress) {
                onSuccessNewAddress();
            }
        },
        onError: (error) => {
            if (onErrorNewAddress) {
                onErrorNewAddress();
            } else {
                console.log(error);
            }
        },
    });
    const deleteAddress = useMutation({
        mutationFn: async ({ id }: { id: number }) => {
            const response = await api.delete(`/api/addresses/${id}`);
            return response.data;
        },
        onSuccess: async () => {
            if (onSuccessDeleteAddress) {
                onSuccessDeleteAddress();
            }
        },
        onError: (error) => {
            if (onErrorDeleteAddress) {
                onErrorDeleteAddress();
            } else {
                console.log(error);
            }
        },
    });
    return { newAddress, deleteAddress };
}
