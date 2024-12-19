import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';

export function useClients() {
    const mainURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const getClients = useQuery({
        queryKey: ['get-clients'],
        staleTime: 0,
        queryFn: async () => {
            const response = await api.get('/api/users');
            // const response = await fetch(`${mainURL}/api/users`, {
            //     method: 'GET',
            //     credentials: 'include',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Access-Control-Allow-Origin': '*',
            //     },
            // });

            // const data = await response.json();
            // const dat = data;
            return response;
        },
    });
    return { getClients };
}
