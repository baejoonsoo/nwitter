import { useEffect, useState } from 'react';
import { Auth_State_Changed } from 'FB_Instance';
import AppRouter from 'components/Router';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    Auth_State_Changed((user) => {
      if (user) {
        setUserObj(user);
      } else {
        userObj(null);
      }
      setInit(true);
    });
  }, []);
  return (
    <div>
      {init ? (
        <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        'initializing...'
      )}
    </div>
  );
}

export default App;
