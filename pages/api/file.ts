import xlsx from 'node-xlsx';
import { NextApiRequest, NextApiResponse } from 'next';
import formidable, { IncomingForm, Fields, Files, File } from 'formidable';
import {
  Ocorrencia,
  VALID_FILE_TYPES_MIME,
} from '../../common/types/ocorrencias-file';

interface FormidableRequest {
  fields: Fields;
  files: Files;
}

export const config = {
  api: {
    bodyParser: false,
  },
};

const getFileFromRequest = async (_req: NextApiRequest) =>
  new Promise(
    // eslint-disable-next-line no-unused-vars
    (resolve: (_result: FormidableRequest) => void, reject) => {
      const form = new IncomingForm();
      // eslint-disable-next-line consistent-return
      form.parse(_req, (err: Error, fields: Fields, files: Files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    }
  );

const processFile = async (file: File): Promise<Ocorrencia[]> => {
  const workSheetsFromBuffer = xlsx.parse(file.filepath);
  if (
    !workSheetsFromBuffer ||
    workSheetsFromBuffer.length == 0 ||
    !workSheetsFromBuffer[0].data
  ) {
    throw new Error('O arquivo enviado é inválido');
  }
  const planilha = workSheetsFromBuffer[0].data as string[][];
  planilha.shift();

  if (!planilha) throw new Error('O arquivo enviado é inválido');

  // COLOCAR AQUI O NUMERO DE CADA COLUNA (começando a contar por 0)
  const NRO_COLUNA_FATO = 1;
  const NRO_COLUNA_MES = 2;
  const NRO_COLUNA_BAIRRO = 9;

  const dados = planilha
    ?.map((linha) => {
      const fato = linha[NRO_COLUNA_FATO];
      const mes = linha[NRO_COLUNA_MES];
      const bairro = linha[NRO_COLUNA_BAIRRO];

      if (fato && mes && bairro) {
        return { fato, mes, bairro };
      }
    })
    .filter((x) => x);

  return dados as Ocorrencia[];
};

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Formatando o request para tratar o envio de arquivos usando a lib Formidable
    const req = await getFileFromRequest(_req);

    // Validando o envio do arquivo
    const { file } = req.files;
    if (!file) throw new Error('Por favor, envie um arquivo valido');
    const { mimetype } = file as formidable.File;
    if (
      !VALID_FILE_TYPES_MIME.split(',').some((x) =>
        mimetype!.toLowerCase().includes(x)
      )
    ) {
      throw new Error('O tipo de arquivo selecionado é inválido.');
    }

    // Processando a planilha e criando um JSON com todos os dados
    const data = await processFile(file as File);

    return res.status(200).send(data);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};
