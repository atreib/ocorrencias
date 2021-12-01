import _ from 'lodash';
import { XIcon } from '@heroicons/react/outline';

interface SuccessAlertProps {
  title: string;
  message: string;
  closeCallback: () => void;
}

export const SuccessAlert = ({
  title,
  message,
  closeCallback,
}: SuccessAlertProps) => (
  <div
    className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
    role="alert"
  >
    <strong className="font-bold">{_.upperFirst(title)}</strong>
    <span className="block sm:inline pl-1">{_.upperFirst(message)}</span>
    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
      <XIcon
        className="fill-current h-6 w-6 text-green-500 hover:text-green-800 cursor-pointer"
        onClick={closeCallback}
      />
    </span>
  </div>
);
