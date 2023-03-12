import { useContext } from 'react';
import { DisplayContext } from '../App';

interface Props {
  cs_name: string;
  cs_code: string;
  scene_status: string;
}

function CutsceneCards({ cs_name, cs_code, scene_status }: Props) {
  const { setIsCsInfo } = useContext(DisplayContext);

  function handleChange(): void {
    setIsCsInfo(cs_code);
  }

  return (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 mt-2 mb-2 cursor-pointer" onClick={handleChange}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   {cs_code}
                </th>
                <td className="px-6 py-4">
                    {cs_name}
                </td>
                <td className="px-6 py-4">
                    {scene_status}
                </td>
            </tr>
  );
}

export default CutsceneCards;
