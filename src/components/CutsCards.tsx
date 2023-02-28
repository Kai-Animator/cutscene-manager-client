interface Props {
  cut_id: number;
  cs_code: string;
  cut_name: string;
  start_date: any;
  end_date: any;
  animator: string;
  cut_status: string;
}

function CutsCards({
  cs_code,
  cut_id,
  cut_name,
  start_date,
  end_date,
  animator,
  cut_status,
}: Props) {
  return (
    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 mt-2 mb-2 cursor-pointer'>
      <th
        scope='row'
        className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
      >
        {cut_name}
      </th>
      <td className='px-6 py-4'>{new Date(start_date).toLocaleDateString()}</td>
      <td className='px-6 py-4'>{new Date(end_date).toLocaleDateString()}</td>
      <td className='px-6 py-4'>{animator}</td>
      <td className='px-6 py-4'>{cut_status}</td>
      <td className='px-6 py-4'>
        <a
          href='#'
          className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
        >
          Edit
        </a>
      </td>
    </tr>
  );
}

export default CutsCards;
