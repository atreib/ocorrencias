import { useContext } from 'react';
import { OcorrenciasContext } from '../../context/ocorrencias';
import { ChartByMonth } from '../charts/by-month';
import { ChartByFact } from '../charts/by-fact';
import { ChartByNeighbour } from '../charts/by-neighbour';

export const OcorrenciasCharts = () => {
  const { ocorrencias, setOcorrencias } = useContext(OcorrenciasContext);

  const back = () => {
    setOcorrencias(undefined);
  };

  return !ocorrencias ? (
    <></>
  ) : (
    <div>
      <div className="mb-8 w-full">
        <button
          onClick={() => back()}
          type="button"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-gray-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Carregar outra planilha
        </button>
      </div>
      <div>Total de ocorrencias: {ocorrencias.length}</div>
      <div className="space-y-8">
        <div className="shadow-md rounded-md p-4">
          <ChartByMonth />
        </div>
        <div className="shadow-md rounded-md p-4">
          <ChartByFact />
        </div>
        <div className="shadow-md rounded-md p-4">
          <ChartByNeighbour />
        </div>
      </div>
    </div>
  );
};
