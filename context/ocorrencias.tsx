import { createContext, ReactChild, ReactChildren, useState } from 'react';
import { Ocorrencia } from '../common/types/ocorrencias-file';

interface ComponentProps {
  children: ReactChild | ReactChildren;
}

type ProviderType = {
  ocorrencias: Ocorrencia[] | undefined;
  setOcorrencias: (ocorrencias: Ocorrencia[] | undefined) => void;
};

const initialValues: ProviderType = {
  ocorrencias: undefined,
  setOcorrencias: () => null,
};

const OcorrenciasContext = createContext<ProviderType>(initialValues);

const OcorrenciasProvider = ({ children }: ComponentProps) => {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>();

  return (
    <OcorrenciasContext.Provider
      value={{
        ocorrencias,
        setOcorrencias,
      }}
    >
      {children}
    </OcorrenciasContext.Provider>
  );
};

export { OcorrenciasProvider, OcorrenciasContext };
