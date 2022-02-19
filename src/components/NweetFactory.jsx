import { addNweet, attachmentUploadString, GetDownloadURL } from 'FB_Instance';
import { v4 } from 'uuid';
import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

const NweetFactory = ({ userObj }) => {
  const [newNweet, setNewNweet] = useState('');
  const [attachment, setAttachment] = useState('');
  const fileInput = useRef();

  const onSubmit = async (event) => {
    if (newNweet === '') {
      return;
    }

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
    setAttachment('');
    fileInput.current.value = null;
  };
  return (
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          value={newNweet}
          onChange={onChange}
          type="text"
          placeholder="what'on your mind?"
          maxLength={120}
        />
        <button className="factoryInput__arrow">Nweet</button>
      </div>
      <label htmlFor="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        ref={fileInput}
        onChange={onFileChange}
        style={{
          opacity: 0,
        }}
      />
      {attachment && (
        <div className="factoryForm__attachment">
          <img
            src={attachment}
            alt="preview"
            style={{
              backgroundImage: attachment,
            }}
          />
          <duv onClick={onClearAttachment}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </duv>
        </div>
      )}
    </form>
  );
};

export default NweetFactory;
