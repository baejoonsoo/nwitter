import { getMyNweets, logOut } from 'FB_Instance';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = ({ userObj }) => {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    logOut();
    navigate('/');
  };

  const getMyNweet = async () => {
    const querySnapshot = await getMyNweets(userObj.uid);
    querySnapshot.docs.forEach((docs) => console.log(docs.data()));
  };

  useEffect(() => {
    getMyNweet();
  }, []);

  return (
    <>
      <button onClick={onLogOutClick}>Log out</button>
    </>
  );
};

export default Profile;
