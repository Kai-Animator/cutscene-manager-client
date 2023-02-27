import axios from 'axios';
import { useEffect, useState } from 'react';
import CutsceneCards from './CutsceneCards';

const tailCsContainer: string =
  'bg-slate-100 h-2/3 w-3/5 text-slate rounded flex items-center flex-col pt-6';

interface AxiosCs {
  data: {
    cs_code: string;
    cs_name: string;
    scene_status: string;
  }[];
}

function Cutscenes() {
  const [allCsInfo, setAllCsInfo] = useState<any | null>(null);

  async function getAllCutscenes(): Promise<void> {
    const allCutscenes: AxiosCs = await axios(
      'http://localhost:4000/cutscenes'
    );
    setAllCsInfo(allCutscenes.data);
  }

  useEffect(() => {
    getAllCutscenes();
  }, []);

  return (
    <div className={`cutscenes-container ${tailCsContainer}`}>
      {allCsInfo && allCsInfo.map((cutscene, index) => {
        return <CutsceneCards key={index} {...cutscene} />;
      })}
    </div>
  );
}

export default Cutscenes;
