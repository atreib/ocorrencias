import { NextApiRequest, NextApiResponse } from 'next';
import formidable, { IncomingForm, Fields, Files } from 'formidable';
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

    // TODO: Processando o arquivo
    const data = [{}] as Ocorrencia[];

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};
