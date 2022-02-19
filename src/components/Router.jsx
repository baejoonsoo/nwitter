import { HashRouter, Route, Routes } from 'react-router-dom';
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Navigation from 'components/Navigation';
import Profile from 'routes/Profile';

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  return (
    <HashRouter>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route
              path="/"
              element={
                <div
                  style={{
                    maxWidth: 890,
                    width: '100%',
                    margin: '0 auto',
                    marginTop: 80,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Home userObj={userObj} />
                </div>
              }
            />
            <Route
              path="/profile"
              element={
                <div
                  style={{
                    maxWidth: 890,
                    width: '100%',
                    margin: '0 auto',
                    marginTop: 80,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Profile refreshUser={refreshUser} userObj={userObj} />
                </div>
              }
            />
          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;
