import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';
import { useState } from 'react';

interface Props {
  setIsSettings: React.Dispatch<React.SetStateAction<boolean>>;
  cs_code: string | undefined;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const tailInput: string =
  'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer';
const tailLabel: string =
  'peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6';
const tailButton: string =
  'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800';

interface cutTypes {
  cs_code: any;
  cut_name: string;
  start_date: any;
  end_date: any;
  animator: string;
  cut_status: string;
}

function CreateNewCut({ setIsSettings, cs_code , setRefresh}: Props) {
  const [newCutInfo, setNewCutInfo] = useState<cutTypes>({
    cs_code: '',
    cut_name: '',
    start_date: '',
    end_date: '',
    animator: '',
    cut_status: '',
  });

  function handleSubmit(e: { preventDefault: () => void }): void {
    const newObj: any = newCutInfo;
    newObj['cs_code'] = cs_code
    axios.post(`https://csmanager-server.onrender.com/cutscenes/${cs_code}/cuts`, newObj);
    setIsSettings(false);
    setRefresh(true)
    e.preventDefault();
  }

  function handleChange(e: { target: { name: string; value: string } }): void {
    setNewCutInfo({ ...newCutInfo, [e.target.name]: e.target.value });
  }

  return (
    <div className='m-6 mt-2'>
      <div className='text-blue-800 mb-4 justify-end flex'>
        <FontAwesomeIcon
          icon={faXmarkCircle}
          className='scale-150 m-2 hover:text-red-800 cursor-pointer'
          onClick={() => setIsSettings(false)}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div className='relative z-0 w-full mb-6 group'>
          <input
            type='text'
            name='cut_name'
            id='cut_name'
            className={`${tailInput}`}
            onChange={handleChange}
            required
          />
          <label className={`${tailLabel}`}>Cut Name</label>
        </div>
        <div className='relative z-0 w-full mb-6 group'>
          <input
            type='text'
            name='animator'
            id='animator'
            className={`${tailInput}`}
            onChange={handleChange}
          />
          <label className={`${tailLabel}`}>Animator</label>
        </div>
        <div className='relative z-0 w-full mb-6 group'>
          <input
            type='text'
            name='cut_status'
            id='cut_status'
            className={`${tailInput}`}
            onChange={handleChange}
            required
          />
          <label className={`${tailLabel}`}>Progress Status</label>
        </div>
        <div className='grid md:grid-cols-2 md:gap-6'>
          <div className='relative z-0 w-full mb-6 group'>
            <input
              type='date'
              name='start_date'
              id='start_date'
              onChange={handleChange}
              className={`${tailInput}`}
            />
            <label className={`${tailLabel}`}>Start Date</label>
          </div>
          <div className='relative z-0 w-full mb-6 group'>
            <input
              type='date'
              name='end_date'
              id='end_date'
              className={`${tailInput}`}
              onChange={handleChange}
            />
            <label className={`${tailLabel}`}>End Date</label>
          </div>
        </div>
        <div className='flex justify-center'>
          <button type='submit' className={`${tailButton}`}>
            Add Cut
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateNewCut;
