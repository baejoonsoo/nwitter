import { addNweet } from 'FB_Instance';
import { useState } from 'react';

const Home = () => {
  const [nweet, setNweet] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    await addNweet(nweet);
    setNweet('');
  };
  const onChange = ({ target: { value } }) => {
    setNweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="what'on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
    </div>
  );
};

export default Home;
