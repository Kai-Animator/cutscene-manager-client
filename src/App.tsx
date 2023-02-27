import { useState, createContext } from 'react';
import CutsceneInfo from './components/CutsceneInfo';
import Cutscenes from './components/Cutscenes';

interface DisplayContext {
  setIsCsInfo: (i: boolean) => void;
}

export const DisplayContext = createContext<DisplayContext>({
  setIsCsInfo: () => {},
});

function Home() {
  const [isCsInfo, setIsCsInfo] = useState<boolean>(false);

  const tailHome: string =
    'w-screen h-screen bg-slate-600 flex flex-col justify-center items-center';

  return (
    <div className={`Home ${tailHome}`}>
      <h1 className=''>Cutscene Manager</h1>
      <DisplayContext.Provider value={{ setIsCsInfo }}>
        {isCsInfo ? <CutsceneInfo /> : <Cutscenes />}
      </DisplayContext.Provider>
    </div>
  );
}

export default Home;
