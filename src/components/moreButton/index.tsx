import "./index.css";

export const MoreButton = (props : any) => {
  return (
    <div className="moreButton" >
      <label className="bar" htmlFor="check">
        <input type="checkbox" id="check" onClick={props.handleNav} />

        <span className="top"></span>
        <span className="middle"></span>
        <span className="bottom"></span>
      </label>
    </div>
  );
};
