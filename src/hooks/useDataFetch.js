import { useQuery } from '@tanstack/react-query';


export const useDataFetch = (url) => {

    const { isLoading, error, data: fetchedData, refetch } = useQuery([url], () =>

        fetch(process.env.NEXT_PUBLIC_API_BASE_URL + url, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => res.json())
    );

    return { fetchedData: fetchedData?.result, refetch, isLoading, error };

};
