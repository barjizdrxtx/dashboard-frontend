import { useQuery } from '@tanstack/react-query';


export const useDataFetch = (url) => {

    const { isLoading, error, data: fetchedData, refetch } = useQuery([url], () =>

        fetch("https://api.onetouchemart.com/api/" + url, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => res.json())
    );

    return { fetchedData: fetchedData?.result, refetch, isLoading, error };

};
