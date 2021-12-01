import type { NextPage } from 'next';
import { OcorrenciasForm } from '../components/pages/ocorrencias-form';

const Home: NextPage = () => {
  return (
    <div className="absolute w-full h-full flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-sm rounded-md p-8 mx-8 max-w-full w-full md:w-3/5">
        <OcorrenciasForm />
      </div>
    </div>
  );
};

export default Home;
