import React, {createContext, ReactNode, useContext, useState} from 'react';

type FocusContextType = {
   focusState: number;
   setFocusState: React.Dispatch<React.SetStateAction<number>>;
};

const FocusContext = createContext<FocusContextType | undefined>(undefined);

export const FocusProvider: React.FC<{children: ReactNode}> = ({ children }) => {
   const [focusState, setFocusState] = useState(0);

   return (
      <FocusContext.Provider value={{ focusState, setFocusState }}>
         {children}
      </FocusContext.Provider>
   );
};

export const useFocus = () => {
   const context = useContext(FocusContext);
   if (!context) {
      throw new Error('useFocus must be used within a FocusProvider');
   }
   return context;
};