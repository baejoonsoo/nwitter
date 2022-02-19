import { deleteNweet, editNweet } from 'FB_Instance';
import { useState } from 'react';
import Swal from 'sweetalert2';

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
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="edit your nweet"
              value={newNweet}
              onChange={onChangeNweet}
              required
            />
            <button>update Nweet</button>
          </form>
          <button onClick={toggleEditing}>Calcel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentURL && (
            <img
              src={nweetObj.attachmentURL}
              alt="attachment"
              width="50px"
              height="50px"
            />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
