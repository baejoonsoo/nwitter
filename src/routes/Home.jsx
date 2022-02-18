import { addNweet, get_nweets, onSnapShot } from 'FB_Instance';
import { useEffect, useState } from 'react';

const Home = ({ userObj }) => {
  const [newNweet, setNewNweet] = useState('');
  const [nweets, setNweets] = useState([]);

  const getNweets = async () => {
    const dbNweet = await get_nweets();
    dbNweet.forEach((document) => {
      const nweetObject = {
        ...document.data(),
        id: document.id,
      };

      setNweets((prev) => [nweetObject, ...prev]);
    });
  };
  useEffect(() => {
    getNweets();
    onSnapShot();
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
          <div key={nweet.id}>
            <h4>{nweet.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
