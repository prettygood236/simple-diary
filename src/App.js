import { useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

function App() {
  const dataId = useRef(1);

  const [data, setData] = useState([]);
  const onCreate = (author, content, emotion) => {
    const created_data = new Date().getTime();
    const newItem = {
      id: dataId.current,
      author,
      content,
      emotion,
      created_data,
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  };
  const onDelete = (targetId) => {
    const deletedDiaryList = data.filter((it) => it.id !== targetId);
    setData(deletedDiaryList);
  };

  return (
    <div className='App'>
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diarylist={data} onDelete={onDelete} />
    </div>
  );
}

export default App;
