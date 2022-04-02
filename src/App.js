import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT':
      return action.data;

    case 'CREATE':
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date,
      };
      // 어차피 같은 이름이기 때문에 created_date : created_date 처럼 적지 않더라도
      // create_date key를 찾아 create_data value를 업데이트한다.
      return [newItem, ...state];

    case 'REMOVE':
      return state.filter((it) => it.id !== action.targetId);

    case 'EDIT':
      return state.map((it) =>
        it.id === action.targetId ? { ...it, content: action.newContent } : it
      );
    default:
      return state;
  }
};

const App = () => {
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      'https://jsonplaceholder.typicode.com/comments'
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((it) => {
      return {
        id: dataId.current++,
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
      };
    });
    dispatch({ type: 'INIT', data: initData });
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((author, content, emotion) => {
    dispatch({
      type: 'CREATE',
      data: { id: dataId.current, author, content, emotion },
    });
    dataId.current += 1;
    // deps가 data state [data] => data state가 변할때 마다 렌더링되는 (삭제, 수정시에도 렌더링) 딜레마에 빠진다.
    // deps가 빈 배열 [] => 처음에 렌더링될때의 빈 배열인 data state를 저장하고 있다.
    // 항상 최신의 data값을 가지고 있는 함수 setData의 최신의 data를 가지고 오도록 *함수형 업데이트* 해주면 된다!
    // setData((data) => [newItem, ...data]);
  }, []);

  const onRemove = useCallback((targetId) => {
    // dispatch에 의해 발생된 상태변화 함수 reducer는 항상 최신의 state를 반영하므로 useCallback사용 시 deps 걱정이 필요하지 않다.
    dispatch({ type: 'REMOVE', targetId });
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: 'EDIT', targetId, newContent });
  }, []);

  // useMemo : memoized된 값을 반환하며 deps가 바뀔때만 된 감싼 함수를 다시 실행한다.
  // * useCallback : memoized된 함수를 반환한다.
  const memoizedDiaryAnalysis = useMemo(() => {
    if (data.length === 0) {
      return { goodCount: 0, badCount: 0, goodRatio: 0 };
    }
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = memoizedDiaryAnalysis;

  const store = {
    data,
  };

  const memoizedDispatches = useMemo(() => {
    return { onCreate, onRemove, onEdit };
  }, []);

  return (
    <DiaryStateContext.Provider value={store}>
      {/* Provider도 컴포넌트이기 때문에 props가 변경되면 리렌더링된다. 
      따라서 data가 바뀌어서 리랜더링 될때 최적화한 onCreate, onEdit, onRemove도 리랜더되지 않으려면 Provider를 나누어 주어야 한다 */}
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className='App'>
          {/* React LifeCycle에 접근하게 해주는 useEffect 실습
          <LifeCycle /> */}
          {/* props가 바뀔때만 컴포넌트를 랜더링해주는 고차컴포넌트 React.memo 실습 */}
          {/* <OptimizeTest /> */}
          {/* <OptimizeTest2 /> */}
          <DiaryEditor />
          <div>전체 일기 : {data.length}</div>
          <div>기분 좋은 일기 개수 : {goodCount}</div>
          <div>기분 나쁜 일기 개수 : {badCount}</div>
          <div>기분 좋은 일기 비율 : {goodRatio}%</div>
          <DiaryList />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
};

export default App;
