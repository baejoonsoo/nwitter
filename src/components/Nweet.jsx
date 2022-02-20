import { deleteAttachment, deleteNweet, editNweet } from 'FB_Instance';
import { useState } from 'react';
import Swal from 'sweetalert2';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const onDeleteClick = () => {
    Swal.fire({
      text: 'Are you sure you want to delete this nweet?',
      showCancelButton: true,
      confirmButtonColor: '#d33', // confrim 버튼 색깔 지정
      cancelButtonColor: '#909090', // cancel 버튼 색깔 지정
      confirmButtonText: 'Delete', // confirm 버튼 텍스트 지정
      cancelButtonText: 'Cancel', // cancel 버튼 텍스트 지정
      allowOutsideClick: false,
      icon: 'question',
    }).then((res) => {
      if (res.isConfirmed) {
        deleteNweet(nweetObj.id);
        deleteAttachment(nweetObj.attachmentURL);
      }
    });
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onChangeNweet = ({ target: { value } }) => setNewNweet(value);

  const onSubmit = (event) => {
    event.preventDefault();
    editNweet(nweetObj.id, newNweet);
    setEditing(false);
  };
  return (
    <div className="nweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              autoFocus
              type="text"
              placeholder="edit your nweet"
              value={newNweet}
              className="formInput"
              onChange={onChangeNweet}
              required
            />
            <button className="formBtn">update Nweet</button>
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentURL && (
            <img src={nweetObj.attachmentURL} alt="attachment" />
          )}
          {isOwner && (
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
