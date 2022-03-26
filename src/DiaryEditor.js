const DiaryEditor = () => {
  return <div className='DiaryEditor'>
    <h2>오늘의 일기</h2><div><input name='author'>      </input></div><div><textarea name='content'></textarea></div><div><select><option value={1}></option></select></div></div>
}

export default DiaryEditor