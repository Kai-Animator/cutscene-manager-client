import axios from 'axios';
import { useEffect, useState } from 'react';
import CutsCards from './CutsCards';
import Settings from './Settings';

interface Props {
  csCode: string;
  setIsSettings: React.Dispatch<React.SetStateAction<boolean>>;
  isSettings: boolean;
  setIsCsInfo: (i: boolean | string) => void;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: boolean;
}

const tailBackButton: string =
  'text-white bg-slate-500 w-1/4 rounded m-4 p-1 hover:bg-red-700';
const tailAddButton: string =
  'text-white bg-blue-500 w-1/4 rounded m-4 p-1 hover:bg-white hover:text-blue-500';

function CutsceneInfo({
  csCode,
  setIsSettings,
  isSettings,
  setIsCsInfo,
  setRefresh,
  refresh,
}: Props) {
  const [csInfo, setCsInfo] = useState<boolean | {}[]>(false);
  const [cutsInfo, setCutsInfo] = useState<any>(false);

  async function csData(): Promise<void> {
    await axios(
      `https://java-server-csmanager.onrender.com/cutscenes/${csCode}`
    ).then((res) => setCsInfo(res.data));
  }

  async function getCuts(): Promise<void> {
    await axios(
      `https://java-server-csmanager.onrender.com/cutscenes/${csCode}/cuts`
    ).then((res) => setCutsInfo(res.data));
    refresh && setRefresh(false);
  }

  useEffect(() => {
    csData();
  }, []);

  useEffect(() => {
    getCuts();
  }, [csInfo]);

  useEffect(() => {
    getCuts();
  }, [refresh]);

  function handleNewCut(): void {
    setIsSettings(true);
  }

  function handleBack(): void {
    setIsCsInfo(false);
  }

  async function handleDelete(e: any): Promise<void> {
    if (window.confirm(`Are you sure you want to delete ${csCode}?`)) {
      await axios.delete(
        `https://java-server-csmanager.onrender.com/cutscenes/${csCode}`
      );
      setIsCsInfo(false);
    }
    e.preventDefault();
  }

  return (
    <div>
      <div className='w-auto overflow-y-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Cutscene Name
              </th>
              <th scope='col' className='px-6 py-3'>
                Start Date
              </th>
              <th scope='col' className='px-6 py-3'>
                End Date
              </th>
              <th scope='col' className='px-6 py-3'>
                Animator
              </th>
              <th scope='col' className='px-6 py-3'>
                Progress Status
              </th>
              <th scope='col' className='px-6 py-3'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {cutsInfo &&
              cutsInfo.map((cut: any, index: any): JSX.Element => {
                return (
                  <CutsCards
                    key={index}
                    {...cut}
                    setIsSettings={setIsSettings}
                    setRefresh={setRefresh}
                  />
                );
              })}
          </tbody>
        </table>
      </div>
      <div className='button-container flex justify-around'>
        <button
          className={`add-cs-button ${tailAddButton}`}
          onClick={handleNewCut}
        >
          Add Cut
        </button>
        <button
          className={`add-cs-button ${tailBackButton}`}
          onClick={handleDelete}
        >
          Delete this Scene.
        </button>
        <button
          className={`add-cs-button ${tailBackButton}`}
          onClick={handleBack}
        >
          Back to Cutscenes
        </button>
      </div>
      {isSettings && (
        <Settings
          setIsSettings={setIsSettings}
          csCode={csCode}
          setRefresh={setRefresh}
        />
      )}
    </div>
  );
}

export default CutsceneInfo;
