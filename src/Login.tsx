import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const app = initializeApp({
  apiKey: 'AIzaSyAHujC21hbzGiX8iL7UqxdeehLZ19fxrRo',
  authDomain: 'mylibrary-f9f02.firebaseapp.com',
  projectId: 'mylibrary-f9f02',
  storageBucket: 'mylibrary-f9f02.appspot.com',
  messagingSenderId: '840845900664',
  appId: '1:840845900664:web:7df9bf6371a592a83ae68d',
});

const auth = getAuth(app);

interface Props {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSignup: React.Dispatch<React.SetStateAction<boolean>>;
  setUserInfo: any;
}

function Login({ setIsSignup, setUserInfo, setLogin }: Props) {
  function handleChange(): void {
    setIsSignup(true);
  }

  function handleForm(e: any): void {
    signInWithEmailAndPassword(
      auth,
      e.target.email.value,
      e.target.password.value
    )
      .then((userCredential: {user: any}) => {
          setLogin(userCredential.user.uid);
          localStorage.setItem('user', userCredential.user.uid)
          setLogin(true);
        }
      )
      .catch((error: { code: any; message: any }) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    e.preventDefault();
  }

  return (
    <section className='bg-gray-50 dark:bg-gray-900'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <a
          href='#'
          className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'
        >
          Cutscene Manager
        </a>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              Sign in to your account
            </h1>
            <form className='space-y-4 md:space-y-6' onSubmit={handleForm}>
              <div>
                <label
                  htmlFor='email'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Your email
                </label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center'
                  placeholder='youremail@mail.com'
                  required={true}
                />
              </div>
              <div>
                <label
                  htmlFor='password'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='••••••••'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  required={true}
                />
              </div>
              <button
                type='submit'
                className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
              >
                Sign in
              </button>
              <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                Don’t have an account yet?{' '}
                <a
                  href='#'
                  className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                  onClick={handleChange}
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
