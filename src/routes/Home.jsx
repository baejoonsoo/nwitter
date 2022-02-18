import Nweet from 'components/Nweet';
import { addNweet, onSnapShot } from 'FB_Instance';
import { useEffect, useRef, useState } from 'react';

const Home = ({ userObj }) => {
  const [newNweet, setNewNweet] = useState('');
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState(null);
  const fileInput = useRef();

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

  const onFileChange = ({ target: { files } }) => {
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;

      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => {
    setAttachment(null);
    fileInput.current.value = null;
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
        <input
          type="file"
          accept="image/*"
          ref={fileInput}
          onChange={onFileChange}
        />
        <button>Nweet</button>
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" alt="preview" />
            <button onClick={onClearAttachment}>clear</button>
          </div>
        )}
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
