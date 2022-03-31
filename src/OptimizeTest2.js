import React, { useEffect, useState } from 'react';

const CounterA = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`Update :: CounterA : ${count}`);
  });
  return <div>{count}</div>;
});

const CounterB = ({ obj }) => {
  useEffect(() => {
    console.log(`Update :: CounterB : ${obj.count}`);
  });
  return <div>{obj.count}</div>;
};

const areEqual = (prevProps, nextProps) => {
  // return true => 이전 프롭스와 현재 프롭스가 같다, 즉 리렌더링을 일으키지 않는다.
  // return false => 이전 프롭스와 현재 프롭스가 다르다, 즉 리렌더링을 일으킨다.
  return prevProps.obj.count == nextProps.obj.count;
};

const MemoizedCounterB = React.memo(CounterB, areEqual);

const OptimizeTest2 = () => {
  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({ count: 1 });

  return (
    <div className='OptimizeTest' style={{ padding: 50 }}>
      <div>
        <h2>Counter A</h2>
        <CounterA count={count} />
        {/* setCount(count) => state가 현재와 같기 때문에 리렌더되지 않는다 (물론 다른 state가 바뀔땐 리렌더된다.) */}
        <button onClick={() => setCount(count)}>A button</button>
      </div>
      <div>
        <h2>Counter B</h2>
        {/* 고차컴포넌트를 반환하는 React.memo의 인자에 이렇게 props를 전달할 수 있다 */}
        <MemoizedCounterB obj={obj} />
        <button onClick={() => setObj({ count: obj.count + 1 })}>
          B button
        </button>
      </div>
    </div>
  );
};

export default OptimizeTest2;
