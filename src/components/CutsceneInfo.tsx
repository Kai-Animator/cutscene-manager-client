import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { DisplayContext } from '../App';
import CutsCards from './CutsCards';

interface Props {
  cs_code: string;
}

function CutsceneInfo({ cs_code }: Props) {
  const [csInfo, setCsInfo] = useState<boolean | {}[]>(false);
  const [cutsInfo, setCutsInfo] = useState<any>(false);

  async function csData(): Promise<void> {
    await axios(`http://localhost:4000/cutscenes/${cs_code}`).then((res) =>
      setCsInfo(res.data)
    );
  }

  async function getCuts(): Promise<void> {
    await axios(`http://localhost:4000/cutscenes/${cs_code}/cuts`).then((res) =>
      setCutsInfo(res.data)
    );
    console.log(cutsInfo);
  }

  useEffect(() => {
    csData();
  }, []);

  useEffect(() => {
    getCuts();
  }, [csInfo]);

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
                return <CutsCards key={index} {...cut} />;
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CutsceneInfo;
