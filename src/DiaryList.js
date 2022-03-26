import DiaryItem from './DiaryItem';

const DiaryList = ({ diarylist, onDelete }) => {
  return (
    <div className='DiaryList'>
      <h2>일기 리스트</h2>
      <h4>{diarylist.length}개의 일기가 있습니다</h4>
      <div>
        {diarylist.map((it) => (
          <DiaryItem key={it.id} {...it} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};
DiaryList.defaultProps = { diarylist: [] };

export default DiaryList;
