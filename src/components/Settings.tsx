import { useContext } from 'react';
import { DisplayContext } from '../App';
import CreateNewCut from './CreateNewCut';
import CreateNewScene from './CreateNewScene';

interface Props {
  setIsSettings: React.Dispatch<React.SetStateAction<boolean>>;
  csCode?: string;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const tailBlackOpacity: string =
  'bg-black absolute left-0 top-0 w-screen h-screen bg-opacity-60 flex items-center justify-center';
const tailSettingsContainer: string =
  'bg-white relative h-auto w-1/2 rounded-md text-black';

function Settings({ setIsSettings, csCode, setRefresh}: Props) {
  const { isCsInfo } = useContext(DisplayContext);

  return (
    <div className={`top-container ${tailBlackOpacity}`}>
      <div className={`settings-container ${tailSettingsContainer}`}>
        {
        isCsInfo ? (
          <CreateNewCut setIsSettings={setIsSettings} csCode={csCode} setRefresh={setRefresh}/>
        ) : (
          <CreateNewScene setIsSettings={setIsSettings} />
        )
      }
      </div>
    </div>
  );
}

export default Settings;
