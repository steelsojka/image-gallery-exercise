import React from 'react';
import { AppState, Action } from 'src/state';

export const StoreContext = React.createContext<{ state: AppState; dispatch: React.Dispatch<Action> }>({ state: {} as any, dispatch: () => {} });
