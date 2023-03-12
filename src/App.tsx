import { useState, createContext, useEffect } from 'react';
import CutsceneInfo from './components/CutsceneInfo';
import Cutscenes from './components/Cutscenes';
import Login from './Login';
import Signup from './Signup';

interface DisplayContextTypes {
  setIsCsInfo: (i: boolean | string) => void;
  isCsInfo: boolean | string;
}

export const DisplayContext = createContext<DisplayContextTypes>({
  setIsCsInfo: () => {},
  isCsInfo: false,
});

function Home() {
  const [isCsInfo, setIsCsInfo] = useState<string | boolean>(false);
  const [isSettings, setIsSettings] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [isSignup, setIsSignup] = useState<boolean>(false);
  const [login, setLogin] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<{}>({});

  const tailHome: string =
    'w-screen h-screen bg-slate-600 flex flex-col justify-center items-center';

  function check() {
    if (localStorage['user']) {
      setLogin(true);
    }
  }
  useEffect(() => {
    check();
  }, []);

  if (login === false) {
    return (
      <>
        {isSignup ? (
          <Signup
            setIsSignup={setIsSignup}
            setUserInfo={setUserInfo}
            setLogin={setLogin}
          />
        ) : (
          <Login
            setIsSignup={setIsSignup}
            setUserInfo={setUserInfo}
            setLogin={setLogin}
          />
        )}
      </>
    );
  } else {
    return (
      <div className={`Home ${tailHome}`}>
        <h1 className='text-white font-bold text-4xl mb-4'>Cutscene Manager</h1>
        <DisplayContext.Provider value={{ setIsCsInfo, isCsInfo }}>
          {isCsInfo ? (
            <CutsceneInfo
              setIsCsInfo={setIsCsInfo}
              cs_code={`${isCsInfo}`}
              setIsSettings={setIsSettings}
              isSettings={isSettings}
              setRefresh={setRefresh}
              refresh={refresh}
            />
          ) : (
            <Cutscenes
              isSettings={isSettings}
              setIsSettings={setIsSettings}
              setRefresh={setRefresh}
            />
          )}
        </DisplayContext.Provider>
      </div>
    );
  }
}

export default Home;
