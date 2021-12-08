import React, {
  createContext,
  ReactElement,
  useContext,
  useState,
} from 'react';

export interface IMetaData {
  title: string;
  ogImage: string;
  url: string;
  description: string;
}

interface IProviderMetaData {
  metaData: IMetaData;
  updateMetaData: (updatedMetaData: IMetaData) => void;
}

const initialMetaData: IMetaData = {
  title: '',
  ogImage: '',
  url: '',
  description: '',
};

const ContextMetaData = createContext<IProviderMetaData>(
  {} as IProviderMetaData,
);
const { Provider } = ContextMetaData;

export const ProviderMetaData = ({
  children,
}: {
  children: ReactElement;
}): ReactElement => {
  const [metaData, setMetaData] = useState<IMetaData>(initialMetaData);
  const updateMetaData = (updatedMetaData: IMetaData) => {
    setMetaData(updatedMetaData);
  };
  return (
    <Provider
      value={{
        metaData,
        updateMetaData,
      }}
    >
      {children}
    </Provider>
  );
};

export const useMetaData = (): IProviderMetaData => {
  return useContext(ContextMetaData);
};
