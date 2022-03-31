import { useState, useEffect } from 'react';

const MyCuriosity = () => {
  const [state, setState] = useState(1);

  useEffect(() => {
    setState((state) => state + 1);
  }, []);

  return (
    <div className='MyCuriosity' style={{ padding: 50 }}>
      <div>{state}</div>
      <button onClick={useEffect}>TEST</button>
    </div>
  );
};

export default MyCuriosity;
