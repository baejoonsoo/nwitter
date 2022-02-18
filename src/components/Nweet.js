import { deleteNweet } from 'FB_Instance';
import Swal from 'sweetalert2';

const Nweet = ({ nweetObj, isOwner }) => {
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
  return (
    <div>
      <h4>{nweetObj.text}</h4>
      {isOwner && (
        <>
          <button onClick={onDeleteClick}>Delete Nweet</button>
          <button>Edit Nweet</button>
        </>
      )}
    </div>
  );
};

export default Nweet;
