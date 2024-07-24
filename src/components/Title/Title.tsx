import './Title.css';

const Title = (props: { theme: string }) => {
  return (
    <div className={`${props.theme} title-container`}>
      <div className="logo"></div>
      <h1 className="title-text">find your character</h1>
    </div>
  );
};

export default Title;
