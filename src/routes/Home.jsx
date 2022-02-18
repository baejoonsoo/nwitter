import Nweet from 'components/Nweet';
import { addNweet, onSnapShot } from 'FB_Instance';
import { useEffect, useState } from 'react';

const Home = ({ userObj }) => {
  const [newNweet, setNewNweet] = useState('');
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    onSnapShot((snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await addNweet(newNweet, userObj.uid);
    setNewNweet('');
  };
  const onChange = ({ target: { value } }) => {
    setNewNweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={newNweet}
          onChange={onChange}
          type="text"
          placeholder="what'on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
