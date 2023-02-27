import { useContext } from 'react';
import { DisplayContext } from '../App';

interface Props {
  cs_name: string;
  cs_code: string;
  scene_status: string;
}

const tailCsCard: string =
  'bg-slate-700 text-white w-5/6 h-1/5 p-2 mt-1 rounded hover:bg-slate-600 cursor-pointer hover:scale-103 flex flex-col items-center justify-center';
const tailCardTop: string = 'h-1/4 flex place-content-between w-full';
const tailCardBot: string = 'h-3/4 w-full';

function CutsceneCards({ cs_name, cs_code, scene_status }: Props) {
  const { setIsCsInfo } = useContext(DisplayContext);

  function handleChange(): void {
    setIsCsInfo(true);
  }

  return (
    <div className={`cs-card-container ${tailCsCard}`} onClick={handleChange}>
      <div className={`card-top ${tailCardTop}`}>
        <p>{cs_code}</p>
        <p>{scene_status}</p>
      </div>
      <div className={`card-bot ${tailCardBot}`}>
        <h1>{cs_name}</h1>
      </div>
    </div>
  );
}

export default CutsceneCards;
