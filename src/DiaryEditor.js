import React, { useContext, useEffect, useRef, useState } from 'react';
import { DiaryDispatchContext } from './App';

const DiaryEditor = React.memo(() => {
  // useEffect로 리액트 생애주기에 접근해 렌더링 여부를 확인
  useEffect(() => {
    console.log('DiaryEditor Render');
  });

  const { onCreate } = useContext(DiaryDispatchContext);

  const authorRef = useRef();
  const contentRef = useRef();

  const [state, setState] = useState({
    author: '',
    content: '',
    emotion: 1,
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    return;
  };
  const handleSubmit = () => {
    if (state.author.length < 1) {
      authorRef.current.focus();
      return;
    }
    if (state.content.length < 5) {
      contentRef.current.focus();
      return;
    }
    alert('저장 성공!');
    onCreate(state.author, state.content, state.emotion);
    setState({ author: '', content: '', emotion: 1 });
  };

  return (
    <div className='DiaryEditor'>
      <h2>오늘의 일기</h2>
      <div>
        <input
          ref={authorRef}
          name='author'
          placeholder='작성자'
          type='text'
          value={state.author}
          onChange={handleChangeState}
        ></input>
      </div>
      <div>
        <textarea
          ref={contentRef}
          name='content'
          placeholder='일기'
          type='text'
          value={state.content}
          onChange={handleChangeState}
        ></textarea>
      </div>
      <div>
        <span> 오늘의 감정점수 : </span>
        <select
          name='emotion'
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>일기 저장하기</button>
      </div>
    </div>
  );
});

export default DiaryEditor;
