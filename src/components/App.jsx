import { useState } from 'react';
import { authService } from 'FB_Instance';
import AppRouter from 'components/Router';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

  return (
    <div>
      <h1>{}</h1>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </div>
  );
}

export default App;
