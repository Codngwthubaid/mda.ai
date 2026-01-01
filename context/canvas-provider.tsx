import React, { createContext, useCallback, useContext, useState } from "react";
import { THEME_LIST, ThemeType } from "@/lib/themes";
import { FrameType } from "@/types/project";

export type LoadingStatusType =
  | "initializing"
  | "running"
  | "analyzing"
  | "generating"
  | "completed"
  | "error";

interface CanvasInterfaceProvider {
  theme?: ThemeType;
  setTheme: (id: string) => void;
  themes: ThemeType[];

  frames: FrameType[];
  setFrames: (frames: FrameType[]) => void;
  updateFrame: (id: string, data: Partial<FrameType>) => void;
  addFrame: (frame: FrameType) => void;

  selectedFrameId?: string | null;
  selectedFrame: FrameType | null;
  setSelectedFrameId: (id: string | null) => void;

  loadingStatus: LoadingStatusType;
}

const CanvasContext = createContext<CanvasInterfaceProvider | undefined>(
  undefined!
);

export const ContextProvider = ({
  children,
  initialFrames,
  initialThemeId,
  hasInitFrames,
  projectId,
}: {
  children: React.ReactNode;
  initialFrames?: FrameType[];
  initialThemeId?: string;
  hasInitFrames: boolean;
  projectId: string | null;
}) => {
  const [themeId, setThemeId] = useState<string>(
    initialThemeId || THEME_LIST[0].id
  );
  const [frames, setFrames] = useState<FrameType[]>(initialFrames || []);
  const [selectedFrameId, setSelectedFrameId] = useState<string | null>(null);
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatusType>(
    hasInitFrames ? "initializing" : "completed"
  );
  const themes = THEME_LIST.find((theme) => theme.id === themeId);
  const selectedFrame =
    selectedFrameId && selectedFrameId.length > 0
      ? frames.find((frame) => frame.id === selectedFrameId) || null
      : null;

  // init inngestial functions for real time events

  const addFrame = useCallback((frame: FrameType) => {
    setFrames((prev) => [...prev, frame]);
  }, []);

  const updateFrame = useCallback((id: string, data: Partial<FrameType>) => {
    setFrames((prev) =>
      prev.map((frame) => (frame.id === id ? { ...frame, ...data } : frame))
    );
  }, []);

  return (
    <CanvasContext.Provider
      value={{
        theme: themes,
        setTheme: setThemeId,
        themes: THEME_LIST,
        frames,
        setFrames,
        selectedFrameId,
        selectedFrame,
        setSelectedFrameId,
        updateFrame,
        addFrame,
        loadingStatus,
        // setLoadingStatus,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => {
  const context = useContext(CanvasContext);
  if (context === undefined)
    throw new Error("useCanvas must be used within a CanvasProvider");
  return context;
};
