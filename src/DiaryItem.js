import React, { useContext, useEffect, useRef, useState } from 'react';
import { DiaryDispatchContext } from './App';

const DiaryItem = ({ id, author, content, emotion, created_data }) => {
  useEffect(() => {
    console.log(`${id}번째 아이템 렌더`);
  });

  const { onRemove, onEdit } = useContext(DiaryDispatchContext);

  const [isEdit, setIsEdit] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const editContentRef = useRef();

  const toggleIsEdit = () => setIsEdit(!isEdit);

  const handleEdit = () => {
    if (editContent.length < 5) {
      editContentRef.current.focus();
      return;
    }
    if (window.confirm(`${id}번째 일기를 정말 수정하시겠습니까?`)) {
      onEdit(id, editContent);
      toggleIsEdit();
    }
  };

  const handleQuitEdit = () => {
    setIsEdit(!isEdit);
    setEditContent(content);
  };

  const handleDelete = () => {
    if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  };

  return (
    <div className='DiaryItem'>
      <div className='info'>
        <span>
          작성자 :{author} | 감정점수 : {emotion}
        </span>
        <br />
        <span className='date'>{new Date(created_data).toLocaleString()}</span>
      </div>
      <div className='content'>
        {isEdit ? (
          <>
            <textarea
              ref={editContentRef}
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
          </>
        ) : (
          <>{content}</>
        )}
      </div>

      {isEdit ? (
        <>
          <button onClick={handleEdit}>수정</button>
          <button onClick={handleQuitEdit}>취소</button>
        </>
      ) : (
        <>
          <button onClick={handleDelete}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};

export default React.memo(DiaryItem);
