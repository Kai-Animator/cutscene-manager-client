import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';
import { useState } from 'react';

interface Props {
  setIsSettings: React.Dispatch<React.SetStateAction<boolean>>;
}

const tailInput: string =
  'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer';
const tailLabel: string =
  'peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6';
const tailButton: string =
  'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800';

interface CsInfoTypes {
  csCode: string;
  csName: string;
  startDate: any;
  endDate: any;
  dueDate: any;
  director: string;
  sceneStatus: string;
  totalCuts: string | number;
}

function CreateNewScene({ setIsSettings }: Props) {
  const [newCsInfo, setNewCsInfo] = useState<CsInfoTypes>({
    /*cs_code: '',
    cs_name: '',
    start_date: '',
    end_date: '',
    due_date: '',
    director: '',
    scene_status: '',
    total_cuts: '',*/

    csCode: '',
    csName: '',
    startDate: '',
    endDate: '',
    dueDate: '',
    director: '',
    sceneStatus: '',
    totalCuts: '',
  });

  function handleSubmit(e: { preventDefault: () => void }): void {
    axios.post('https://java-server-csmanager.onrender.com/cutscenes', newCsInfo);
    setIsSettings(false);
    e.preventDefault();
  }

  function postNewScene() {
    console.log(newCsInfo);
  }

  function handleChange(e: { target: { name: string; value: string } }): void {
    setNewCsInfo({ ...newCsInfo, [e.target.name]: e.target.value });
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
            name='csCode'
            id='csCode'
            className={`${tailInput}`}
            onChange={handleChange}
            required
          />
          <label className={`${tailLabel}`}>Cutscene Code</label>
        </div>
        <div className='relative z-0 w-full mb-6 group'>
          <input
            type='text'
            name='csName'
            id='csName'
            className={`${tailInput}`}
            onChange={handleChange}
            required
          />
          <label className={`${tailLabel}`}>Cutscene Name</label>
        </div>
        <div className='grid md:grid-cols-2 md:gap-6'>
          <div className='relative z-0 w-full mb-6 group'>
            <input
              type='date'
              name='startDate'
              id='startDate'
              className={`${tailInput}`}
              onChange={handleChange}
              required
            />
            <label className={`${tailLabel}`}>Start Date</label>
          </div>
          <div className='relative z-0 w-full mb-6 group'>
            <input
              type='date'
              name='endDate'
              id='endDate'
              onChange={handleChange}
              className={`${tailInput}`}
            />
            <label className={`${tailLabel}`}>End Date</label>
          </div>
        </div>
        <div className='grid md:grid-cols-2 md:gap-6'>
          <div className='relative z-0 w-full mb-6 group'>
            <input
              type='date'
              name='dueDate'
              id='dueDate'
              onChange={handleChange}
              className={`${tailInput}`}
            />
            <label className={`${tailLabel}`}>Due Date</label>
          </div>
          <div className='relative z-0 w-full mb-6 group'>
            <input
              type='number'
              name='totalCuts'
              id='totalCuts'
              className={`${tailInput}`}
              onChange={handleChange}
              required
            />
            <label className={`${tailLabel}`}>Total Cuts</label>
          </div>
        </div>
        <div className='grid md:grid-cols-2 md:gap-6'>
          <div className='relative z-0 w-full mb-6 group'>
            <input
              type='text'
              name='director'
              id='director'
              className={`${tailInput}`}
              onChange={handleChange}
              required
            />
            <label className={`${tailLabel}`}>Director</label>
          </div>
          <div className='relative z-0 w-full mb-6 group'>
            <input
              type='text'
              name='sceneStatus'
              id='sceneStatus'
              className={`${tailInput}`}
              onChange={handleChange}
              required
            />
            <label className={`${tailLabel}`}>Cutscene Status</label>
          </div>
        </div>
        <button type='submit' className={`${tailButton}`}>
          Add New Scene
        </button>
      </form>
    </div>
  );
}

export default CreateNewScene;
