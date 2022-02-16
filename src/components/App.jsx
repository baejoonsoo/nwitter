import { useEffect, useState } from 'react';
import { Auth_State_Changed } from 'FB_Instance';
import AppRouter from 'components/Router';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    Auth_State_Changed((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <div>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : 'initializing...'}
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </div>
  );
}

export default App;
