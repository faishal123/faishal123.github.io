import { useEffect, useState } from "react";
import { getCssPropertyValue } from "../common";

export const useWatchhCssVariables = (key: string) => {
  const valueRaw = getCssPropertyValue(key);

  const [variableValue, setVariableValue] = useState(valueRaw);

  useEffect(() => {
    if (variableValue !== valueRaw) {
      setVariableValue(valueRaw);
    }
  }, [valueRaw]);

  return variableValue;
};
