import './FlyoutElement.css';
import { MouseEvent, useState, useContext } from 'react';
import { useAppSelector, useAppDispatch } from './../../hooks/redux';
import { arrOfSelected } from './../../store/reducers/selectedCharactersSlice';
import { ThemeContext } from './../../context/ThemeContext';

const FlyoutElement = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const theme = isDarkTheme ? 'theme-dark' : 'theme-light';

  const selectedArr = useAppSelector((state) => state.selected.selected);
  const dispatch = useAppDispatch();

  const removeSelected = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(arrOfSelected([]));
  };

  const [url, setUrl] = useState<string>();

  const downloadSelected = () => {
    const titleKeys = Object.keys(selectedArr[0]);
    const refinedData = [];
    refinedData.push(titleKeys);
    selectedArr.forEach((item) => {
      refinedData.push(Object.values(item));
    });
    let csvContent = '';

    refinedData.forEach((row) => {
      csvContent += row.join(',') + '\n';
    });
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8,' });
    const url = URL.createObjectURL(blob);
    setUrl(url);
  };

  let wordItem: string;
  if (selectedArr.length === 1) {
    wordItem = 'item';
  } else {
    wordItem = 'items';
  }

  return (
    <div className={`flyout ${theme}`} data-testid="flyout">
      <button className={`flyout__unselect ${theme} button`} onClick={removeSelected}>
        Unselect all
      </button>
      <div className={`flyout__count ${theme}`}>
        {selectedArr.length} {wordItem} are selected
      </div>
      <a
        href={url}
        download={`${selectedArr.length}__characters.csv`}
        className={`flyout__download ${theme} button`}
        onClick={downloadSelected}
      >
        Download
      </a>
    </div>
  );
};
export default FlyoutElement;
