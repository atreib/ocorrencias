import { Ocorrencia } from '../common/types/ocorrencias-file';
import { API } from './setup';

export const sendFile = async (file: File): Promise<Ocorrencia[]> => {
  const formData = new FormData();
  formData.append('file', file);
  return (await API.post(`file/`, formData)).data;
};
