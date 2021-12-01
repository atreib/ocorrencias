import { useContext, useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { OcorrenciasContext } from '../../context/ocorrencias';
import { ChartData, getChartByNeighbour } from '../../services/charts';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const ChartByNeighbour = () => {
  const { ocorrencias } = useContext(OcorrenciasContext);
  const [data, setData] = useState<ChartData>();

  useEffect(() => {
    if (!ocorrencias) return;
    const data = getChartByNeighbour([...ocorrencias]);
    setData(data);
  }, [ocorrencias]);

  return !ocorrencias ? (
    <></>
  ) : (
    <div>
      {data && (
        <Bar
          data={data}
          width={400}
          height={200}
          options={{
            maintainAspectRatio: false,
          }}
        />
      )}
    </div>
  );
};
