"use client";

import React from "react";
import { useFetchProjectById } from "@/features/use-project-id";
import { useParams } from "next/navigation";
import Header from "./_common/Header";
import Canvas from "@/components/canvas";
import { ContextProvider as CanvasProvider } from "@/context/canvas-provider";

const Page = () => {
  const params = useParams();
  const id = params.id as string;

  const { data: project, isPending } = useFetchProjectById(id);
  const frames = project?.frames;
  const themeId = project?.theme;

  const hasInitFrames = frames && frames.length > 0;

  if (!isPending && !project) {
    return <div>Project not found</div>;
  }

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative h-screen w-full flex flex-col">
      <Header projectName={project.name} />
      <CanvasProvider
        initialFrames={frames}
        projectId={project?.id}
        initialThemeId={themeId}
        hasInitFrames={hasInitFrames}
      >
        <div className="flex w-full flex-1 overflow-hidden">
          <div className=" relative flex-1">
            <Canvas
              projectId={project?.id || null}
              projectName={project?.name || ""}
              isPending={isPending}
            />
          </div>
        </div>
      </CanvasProvider>
    </div>
  );
};

export default Page;
