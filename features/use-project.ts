import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useCreateProject = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (prompt: string) =>
      await axios.post("/api/project", { prompt }).then((res) => res.data),
    onSuccess: (data) => {
      console.log("Project created successfully:", data);
      toast.success("Project created successfully!");
      router.push(`/project/${data.data.id}`);
    },
    onError: (error) => {
      console.error("Error creating project:", error);
      toast.error("Failed to create project. Please try again.");
    },
  });
};

export const useFetchProjects = (userId?: string | null) => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await axios.get("/api/project");
      return response.data.data;
    },
    enabled: !userId,
  });
};
