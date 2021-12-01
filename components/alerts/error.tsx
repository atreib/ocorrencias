import _ from 'lodash';
import { XIcon } from '@heroicons/react/outline';

interface ErrorAlertProps {
  title: string;
  message: string;
  closeCallback: () => void;
}

export const ErrorAlert = ({
  title,
  message,
  closeCallback,
}: ErrorAlertProps) => (
  <div
    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
    role="alert"
  >
    <strong className="font-bold">{_.upperFirst(title)}</strong>
    <span className="block sm:inline pl-1">{_.upperFirst(message)}</span>
    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
      <XIcon
        className="fill-current h-6 w-6 text-red-500 hover:text-red-800 cursor-pointer"
        onClick={closeCallback}
      />
    </span>
  </div>
);
