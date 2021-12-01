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
import { ChartData, getChartByFact } from '../../services/charts';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const ChartByFact = () => {
  const { ocorrencias } = useContext(OcorrenciasContext);
  const [byFact, setByFact] = useState<ChartData>();

  useEffect(() => {
    if (!ocorrencias) return;
    const data = getChartByFact([...ocorrencias]);
    setByFact(data);
  }, [ocorrencias]);

  return !ocorrencias ? (
    <></>
  ) : (
    <div>
      {byFact && (
        <Bar
          data={byFact}
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
