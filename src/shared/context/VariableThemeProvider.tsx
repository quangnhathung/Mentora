import { vars } from 'nativewind';
import React, { createContext } from 'react';
import { View } from 'react-native';

import { scalingPoints } from '@/shared/constants/ScalingPoints';

export const VariableThemeContext = createContext<Record<string, any>>({});

export const VariableThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const generatedVars = vars(scalingPoints);

  return (
    <VariableThemeContext.Provider value={generatedVars}>
      {/* generatedVars applies all --fs-*, --lh-* as inline styles */}
      <View style={[{ flex: 1, width: '100%', height: '100%' }, generatedVars]}>
        {children}
      </View>
    </VariableThemeContext.Provider>
  );
};
