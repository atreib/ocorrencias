import { useContext, useState } from 'react';
import {
  MAX_AVATAR_SIZE_MB,
  VALID_FILE_TYPES_MIME,
} from '../../common/types/ocorrencias-file';
import { OcorrenciasContext } from '../../context/ocorrencias';
import { sendFile } from '../../services/ocorrencias';
import { ErrorAlert } from '../alerts/error';
import { SuccessAlert } from '../alerts/success';
import { LoadingSpinner } from '../animations/loading';

const OcorrenciasForm = () => {
  const { setOcorrencias } = useContext(OcorrenciasContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>();
  const [error, setError] = useState<Error>();
  const [selectedFile, setSelectedFile] = useState<File>();

  const checkSelectedFile = (file: File) => {
    try {
      const { type, size } = file;

      if (
        !VALID_FILE_TYPES_MIME.split(',').some((x) =>
          type.toLowerCase().includes(x)
        )
      ) {
        throw new Error('O tipo de arquivo selecionado é inválido.');
      }

      if (size > MAX_AVATAR_SIZE_MB * 1048576) {
        throw new Error(
          `Arquivo selecioando é muito grande! O tamanho máximo aceito é ${MAX_AVATAR_SIZE_MB}mb`
        );
      }

      setSelectedFile(file);
    } catch (err) {
      setError(err as Error);
    }
  };

  const sendButtonHandle = () => {
    setLoading(true);
    setError(undefined);
    setSuccess(undefined);

    if (!selectedFile)
      setError(new Error('Por favor, selecione o arquivo da planilha.'));

    sendFile(selectedFile!)
      .then((data) => {
        setOcorrencias(data);
        setSuccess(
          'A planilha foi processada com sucesso. Os gráficos serão carregados em alguns instantes...'
        );
      })
      .catch((err: Error) => setError(err))
      .finally(() => setLoading(false));
  };

  return (
    <>
      {error && (
        <ErrorAlert
          title={'Ops!'}
          message={error.message}
          closeCallback={() => setError(undefined)}
        />
      )}
      {success && (
        <SuccessAlert
          title={'Sucesso!'}
          message={success}
          closeCallback={() => setSuccess(undefined)}
        />
      )}
      <div className="mt-4 md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Enviar planilha
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Faça o envio da planilha de ocorrências para gerar os gráficos.
            </p>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Arquivo da planilha{` `}
                    <span className="text-xs text-red-400">*</span>
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      {selectedFile && (
                        <div className="text-sm mb-4">
                          Arquivo <b>{`${selectedFile.name}`}</b> selecionado
                        </div>
                      )}
                      <div className="flex text-sm text-gray-600 flex-col items-center justify-center">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>
                            Clique aqui para escolher{' '}
                            {selectedFile ? 'outro' : 'o'} arquivo
                          </span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => checkSelectedFile(event.target.files![0])}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">
                        XLSX (Excel) com no máximo {MAX_AVATAR_SIZE_MB}MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                {selectedFile && (
                  <button
                    onClick={() => sendButtonHandle()}
                    type="button"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {loading && <LoadingSpinner />}
                    Enviar
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export { OcorrenciasForm };
