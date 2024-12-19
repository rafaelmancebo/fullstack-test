import { useMutation, useQuery } from '@tanstack/react-query';
import api from '../../utils/api';
import { User } from '../../utils/types';

export function useClients({
    onSuccessNewClient,
    onErrorNewClient,
    onSuccessDeleteClient,
    onErrorDeleteClient,
}: {
    onSuccessNewClient?: () => void;
    onErrorNewClient?: () => void;
    onSuccessDeleteClient?: () => void;
    onErrorDeleteClient?: () => void;
}) {
    const getClients = useQuery({
        queryKey: ['get-client'],
        staleTime: 0,
        queryFn: async () => {
            const response = await api.get('/api/users');
            const data: User[] = response.data;
            return data;
        },
    });
    const newClients = useMutation({
        mutationFn: async ({ name, email }: { name: string; email: string }) => {
            const response = await api.post('/api/users', { name, email });
            return response.data;
        },
        onSuccess: async () => {
            if (onSuccessNewClient) {
                onSuccessNewClient();
            }
        },
        onError: (error) => {
            if (onErrorNewClient) {
                onErrorNewClient();
            } else {
                console.log(error);
            }
        },
    });
    const deleteClients = useMutation({
        mutationFn: async ({ id }: { id: number }) => {
            const response = await api.delete(`/api/users/${id}`);
            return response.data;
        },
        onSuccess: async () => {
            if (onSuccessDeleteClient) {
                onSuccessDeleteClient();
            }
        },
        onError: (error) => {
            if (onErrorDeleteClient) {
                onErrorDeleteClient();
            } else {
                console.log(error);
            }
        },
    });
    return { getClients, newClients, deleteClients };
}
