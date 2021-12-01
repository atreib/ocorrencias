import { Ocorrencia } from '../common/types/ocorrencias-file';

const colors = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)',
];

interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string[];
  borderColor?: string[];
  borderWidth?: number;
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export const getChartByMonth = (ocorrencias: Ocorrencia[]): ChartData => {
  const groupedByMonth: { [k: string]: number } = {};
  ocorrencias.forEach((ocorrencia) => {
    const value =
      groupedByMonth[ocorrencia.mes] === undefined
        ? 1
        : groupedByMonth[ocorrencia.mes] + 1;
    groupedByMonth[ocorrencia.mes] = value;
  });

  const labels = Object.keys(groupedByMonth);
  const datasets: ChartDataset = {
    label: 'Por mês',
    data: labels.map((mes) => groupedByMonth[mes]),
    borderWidth: 1,
    backgroundColor: [colors[0]],
    borderColor: [colors[0]],
  };
  return { labels, datasets: [datasets] };
};

export const getChartByFact = (ocorrencias: Ocorrencia[]): ChartData => {
  const propriedadeDeAgrupamento = 'fato';
  const groupedBy: { [k: string]: number } = {};
  ocorrencias.forEach((ocorrencia) => {
    const propriedade = ocorrencia[propriedadeDeAgrupamento];
    const value = !groupedBy[propriedade] ? 1 : groupedBy[propriedade] + 1;
    groupedBy[propriedade] = value;
  });

  const labels = Object.keys(groupedBy);
  const datasets: ChartDataset = {
    label: 'Por fato',
    data: labels.map((grupo) => groupedBy[grupo]),
    borderWidth: 1,
    backgroundColor: [colors[1]],
    borderColor: [colors[1]],
  };
  return { labels, datasets: [datasets] };
};

export const getChartByNeighbour = (ocorrencias: Ocorrencia[]): ChartData => {
  const propriedadeDeAgrupamento = 'bairro';
  const groupedBy: { [k: string]: number } = {};
  ocorrencias.forEach((ocorrencia) => {
    const propriedade = ocorrencia[propriedadeDeAgrupamento];
    const value = !groupedBy[propriedade] ? 1 : groupedBy[propriedade] + 1;
    groupedBy[propriedade] = value;
  });

  const labels = Object.keys(groupedBy);
  const datasets: ChartDataset = {
    label: 'Por bairro',
    data: labels.map((grupo) => groupedBy[grupo]),
    borderWidth: 1,
    backgroundColor: [colors[2]],
    borderColor: [colors[2]],
  };
  return { labels, datasets: [datasets] };
};
