import React, { createContext, useContext, useState } from 'react';
import { Measurement, PhotoState, UserInput } from '../types';

interface AppState {
  userInput: UserInput;
  photos: PhotoState;
  measurements: Measurement[] | null;
  hasSideView: boolean;
  processingTimeMs: number | null;
}

interface AppContextValue extends AppState {
  setUserInput: (input: UserInput) => void;
  setFrontPhoto: (uri: string) => void;
  setSidePhoto: (uri: string | null) => void;
  setResults: (measurements: Measurement[], hasSideView: boolean, ms: number) => void;
  reset: () => void;
}

const defaultState: AppState = {
  userInput: { height: '', weight: '', footSize: '', gender: 'unknown' },
  photos: { frontUri: null, sideUri: null },
  measurements: null,
  hasSideView: false,
  processingTimeMs: null,
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(defaultState);

  const setUserInput = (input: UserInput) =>
    setState(s => ({ ...s, userInput: input }));

  const setFrontPhoto = (uri: string) =>
    setState(s => ({ ...s, photos: { ...s.photos, frontUri: uri } }));

  const setSidePhoto = (uri: string | null) =>
    setState(s => ({ ...s, photos: { ...s.photos, sideUri: uri } }));

  const setResults = (measurements: Measurement[], hasSideView: boolean, ms: number) =>
    setState(s => ({ ...s, measurements, hasSideView, processingTimeMs: ms }));

  const reset = () => setState(defaultState);

  return (
    <AppContext.Provider value={{ ...state, setUserInput, setFrontPhoto, setSidePhoto, setResults, reset }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
