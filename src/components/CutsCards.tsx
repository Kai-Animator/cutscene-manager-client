import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import axios from 'axios';

interface Props {
  csCode: string;
  cutName: string;
  startDate: any;
  endDate: any;
  animator: string;
  cutStatus: string;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

function CutsCards({
  csCode,
  cutName,
  startDate,
  endDate,
  animator,
  cutStatus,
  setRefresh
}: Props) {
  const [isInput, setIsInput] = useState<{ [k: string]: boolean }>({
    name: false,
    status: false,
    start: false,
    end: false,
    anim: false,
  });
  const [refreshRandom, setRefreshRandom] = useState<number>(0);

  function handleEdit(e: any): void {
    isInput[e.target.id] = true;
    setRefreshRandom(Math.random());
  }

  async function handleDelete(e: any): Promise<void> {
    await axios.delete(
      `https://java-server-csmanager.onrender.com/cutscenes/${csCode}/cuts/${cutName}`
    );
    setRefresh(true)
    e.preventDefault();
  }

  return (
    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 mt-2 mb-2 checkRefresh'>
      <th
        scope='row'
        id='name'
        className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white  text-center'
        onClick={handleEdit}
      >
        {isInput.name ? <input type='text'></input> : cutName}
      </th>
      <td
        id='start'
        className='px-6 py-4 text-center'
        onClick={handleEdit}
      >
        {startDate
          ? new Date(startDate).toLocaleDateString()
          : 'To be Decided'}
      </td>
      <td
        id='end'
        className='px-6 py-4 text-center'
        onClick={handleEdit}
      >
        {endDate ? new Date(endDate).toLocaleDateString() : 'To be Decided'}
      </td>
      <td
        id='anim'
        className='px-6 py-4 text-center'
        onClick={handleEdit}
      >
        {animator}
      </td>
      <td
        id='status'
        className='px-6 py-4 text-center'
        onClick={handleEdit}
      >
        {cutStatus}
      </td>
      <td
        className='px-6 py-4 hover:text-gray-900 cursor-pointer text-center'
        onClick={handleDelete}
      >
        <FontAwesomeIcon icon={faTrash} className='scale-150' />
      </td>
    </tr>
  );
}

export default CutsCards;
