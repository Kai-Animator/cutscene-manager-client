import axios from 'axios';
import { MouseEvent, useEffect, useState } from 'react';
import Settings from './Settings';
import CutsceneCards from './CutsceneCards';

// const tailCsContainer: string =
//   'bg-slate-200 h-2/3 w-4/5 text-slate rounded flex items-center flex-col pt-6';
const tailAddButton: string =
  'text-white bg-slate-500 w-1/4 rounded m-4 p-1 hover:bg-slate-700';

interface AxiosCs {
  data: {
    cs_code: string;
    cs_name: string;
    scene_status: string;
  }[];
}

interface Props {
  isSettings: boolean
  setIsSettings: React.Dispatch<React.SetStateAction<boolean>>;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

function Cutscenes({isSettings, setIsSettings, setRefresh}: Props) {
  const [allCsInfo, setAllCsInfo] = useState<any | null>(null);

  useEffect(() => {
    getAllCutscenes();
  }, [isSettings]);

  async function getAllCutscenes(): Promise<void> {
    const allCutscenes: AxiosCs = await axios(
      'http://localhost:4000/cutscenes'
    );
    setAllCsInfo(allCutscenes.data);
  }

  function handleNewScene(e: MouseEvent): void {
    setIsSettings(true);
    e.preventDefault();
  }

  return (
    <div className={`cutscenes-container flex flex-col items-center w-3/4`}>
      <div className='w-auto overflow-y-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Cutscene Code
              </th>
              <th scope='col' className='px-6 py-3'>
                Cutscene Name
              </th>
              <th scope='col' className='px-6 py-3'>
                Cutscene Status
              </th>
            </tr>
          </thead>
          <tbody>
            {allCsInfo &&
              allCsInfo.map((cutscene: any, index: any): JSX.Element => {
                return <CutsceneCards key={index} {...cutscene} />;
              })}
          </tbody>
        </table>
      </div>
      {isSettings && <Settings setIsSettings={setIsSettings} setRefresh={setRefresh}/>}
      <button
        className={`add-cs-button ${tailAddButton}`}
        onClick={handleNewScene}
      >
        Add Cutscene
      </button>
    </div>
  );
}

export default Cutscenes;
