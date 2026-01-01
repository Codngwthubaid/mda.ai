import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFetchProjectById = (projectId: string) => {
    return useQuery({
        queryKey: ['project', projectId],
        queryFn: async () => {
            const response = await axios.get(`/api/project/${projectId}`);
            return response.data;
        },
        enabled: !!projectId,
    });
}