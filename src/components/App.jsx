import { useEffect, useState } from 'react';
import { authService, Auth_State_Changed } from 'FB_Instance';
import AppRouter from 'components/Router';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [changeName, setChangeName] = useState(false);

  useEffect(() => {
    Auth_State_Changed((user) => {
      if (user) {
        setUserObj(user);
      } else {
        setUserObj(null);
      }

      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    setUserObj(authService.currentUser);
    setChangeName((prev) => !prev);
  };

  return (
    <div>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        'initializing...'
      )}
    </div>
  );
}

export default App;
