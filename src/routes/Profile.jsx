import { getMyNweets, logOut, updateProfileName } from 'FB_Instance';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = ({ refreshUser, userObj }) => {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    logOut();
    navigate('/');
  };

  const [newDisplayName, setNewDisplayName] = useState(
    userObj.displayName ?? 'User',
  );

  const getMyNweet = async () => {
    const querySnapshot = await getMyNweets(userObj.uid);
    querySnapshot.docs.forEach((docs) => console.log(docs.data()));
  };

  useEffect(() => {
    getMyNweet();
  }, []);

  const onChangeDisplayName = ({ target: { value } }) => {
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (userObj.displayName !== newDisplayName) {
      await updateProfileName(userObj, { displayName: newDisplayName });
      refreshUser();
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          placeholder="Display name"
          type="text"
          onChange={onChangeDisplayName}
          value={newDisplayName}
        />
        <button>Update Profile</button>
      </form>
      <button onClick={onLogOutClick}>Log out</button>
    </>
  );
};

export default Profile;
