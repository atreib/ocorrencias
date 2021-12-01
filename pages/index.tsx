import type { NextPage } from 'next';
import { useContext } from 'react';
import { OcorrenciasCharts } from '../components/pages/ocorrencias-charts';
import { OcorrenciasForm } from '../components/pages/ocorrencias-form';
import { OcorrenciasContext } from '../context/ocorrencias';

const Home: NextPage = () => {
  const { ocorrencias } = useContext(OcorrenciasContext);

  return (
    <div className="absolute min-h-full w-full flex items-center justify-center bg-gray-100 py-16">
      <div className="bg-white shadow-sm rounded-md p-8 mx-8 max-w-full w-full md:w-3/5">
        {ocorrencias && <OcorrenciasCharts />}
        {!ocorrencias && <OcorrenciasForm />}
      </div>
    </div>
  );
};

export default Home;
