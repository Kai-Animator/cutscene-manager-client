import { useContext } from 'react';
import { DisplayContext } from '../App';

interface Props {
  csName: string;
  csCode: string;
  sceneStatus: string;
}

function CutsceneCards({ csName, csCode, sceneStatus }: Props) {
  const { setIsCsInfo } = useContext(DisplayContext);

  function handleChange(): void {
    setIsCsInfo(csCode);
  }

  return (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 mt-2 mb-2 cursor-pointer" onClick={handleChange}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   {csCode}
                </th>
                <td className="px-6 py-4">
                    {csName}
                </td>
                <td className="px-6 py-4">
                    {sceneStatus}
                </td>
            </tr>
  );
}

export default CutsceneCards;
