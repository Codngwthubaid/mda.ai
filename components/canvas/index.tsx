import React from "react";
import { LoadingStatusType, useCanvas } from "@/context/canvas-provider";
import { cn } from "@/lib/utils";
import { Spinner } from "../ui/spinner";
import FloatingToolbar from "./canvas-floating-toolbar";

const Canvas = ({
  projectId,
  projectName,
  isPending,
}: {
  projectId: string;
  projectName: string;
  isPending: boolean;
}) => {
  const { theme, frames, selectedFrame, setSelectedFrameId, loadingStatus } =
    useCanvas();

  const currentStatus = isPending
    ? "initializing"
    : loadingStatus !== "completed" && loadingStatus !== "initializing"
    ? loadingStatus
    : "error";

  return (
    <div className="relative w-full h-full overflow-hidden">
      Canvas component
      <FloatingToolbar />
      {currentStatus && <CanvasLoader status={currentStatus} />}
      <div
        className={cn(
          "absolute top-0 left-0 w-full h-full bg-white dark:bg-gray-900"
        )}
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--primary)) 1px, transparent 1px",
          backgroundSize: "20px 20px",
        }}
      ></div>
    </div>
  );
};

export default Canvas;

function CanvasLoader({ status }: { status?: LoadingStatusType }) {
  return (
    <div
      className={cn(
        `absolute top-4 left-1/2 -translate-x-1/2 min-w-40
      max-w-full px-4 pt-1.5 pb-2
      rounded-br-xl rounded-bl-xl shadow-md
      flex items-center space-x-2 z-20
    `,
        status === "initializing" && "bg-gray-500 text-white",
        status === "running" && "bg-amber-500 text-white",
        status === "analyzing" && "bg-blue-500 text-white",
        status === "generating" && "bg-purple-500 text-white",
        status === "completed" && "bg-purple-500 text-white"
      )}
    >
      <Spinner className="w-4 h-4 stroke-3!" />
      <span className="text-sm font-semibold capitalize">
        {status === "initializing" ? "Loading Project" : status}
      </span>
    </div>
  );
}
