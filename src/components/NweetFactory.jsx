import { addNweet, attachmentUploadString, GetDownloadURL } from 'FB_Instance';
import { v4 } from 'uuid';
import { useRef, useState } from 'react';

const NweetFactory = ({ userObj }) => {
  const [newNweet, setNewNweet] = useState('');
  const [attachment, setAttachment] = useState('');
  const fileInput = useRef();

  const onSubmit = async (event) => {
    event.preventDefault();

    let attachmentURL = '';

    if (attachment !== '') {
      const response = await attachmentUploadString(
        attachment,
        `${userObj.uid}/${v4()}`,
      );
      attachmentURL = await GetDownloadURL(response.ref);
    }

    const nweet = {
      text: newNweet,
      attachmentURL,
    };
    await addNweet(nweet, userObj.uid);

    setNewNweet('');
    setAttachment('');
    fileInput.current.value = null;
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
  );
};

export default NweetFactory;
