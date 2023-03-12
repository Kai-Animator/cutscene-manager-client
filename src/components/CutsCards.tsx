import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import axios from 'axios';

interface Props {
  cs_code: string;
  cut_name: string;
  start_date: any;
  end_date: any;
  animator: string;
  cut_status: string;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

function CutsCards({
  cs_code,
  cut_name,
  start_date,
  end_date,
  animator,
  cut_status,
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
      `http://68.183.190.129/cutscenes/${cs_code}/cuts/${cut_name}`
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
        {isInput.name ? <input type='text'></input> : cut_name}
      </th>
      <td
        id='start'
        className='px-6 py-4 text-center'
        onClick={handleEdit}
      >
        {start_date
          ? new Date(start_date).toLocaleDateString()
          : 'To be Decided'}
      </td>
      <td
        id='end'
        className='px-6 py-4 text-center'
        onClick={handleEdit}
      >
        {end_date ? new Date(end_date).toLocaleDateString() : 'To be Decided'}
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
        {cut_status}
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
