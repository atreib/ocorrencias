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
import { ChartData, getChartByMonth } from '../../services/charts';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const ChartByMonth = () => {
  const { ocorrencias } = useContext(OcorrenciasContext);
  const [byMonth, setByMonth] = useState<ChartData>();

  useEffect(() => {
    if (!ocorrencias) return;
    const data = getChartByMonth([...ocorrencias]);
    setByMonth(data);
  }, [ocorrencias]);

  return !ocorrencias ? (
    <></>
  ) : (
    <div>
      {byMonth && (
        <Bar
          data={byMonth}
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
