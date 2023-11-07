import "./style.css";

interface InfoSvgIconProps {
  status: String;
  handleInfoCardClick: () => void;
}

export function InfoSvgIcon({ status, handleInfoCardClick }: InfoSvgIconProps) {
  const handleColor = () => {
    if (status == "ultrapassou") return "#FF0A0A";
    if (status == "alerta") return "#CEBA00";
    if (status == "ok") return "#3B7600";
  };
  return (
    <svg
      onClick={handleInfoCardClick}
      fill={handleColor()}
      className={`imgInfoIcon ` + status}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="40px"
      height="40px"
      viewBox="0 0 490.318 490.318"
      xmlSpace="preserve"
    >
      <g>
        <g>
          <g>
            <path
              d="M245.148,0C109.967,0,0.009,109.98,0.009,245.162c0,135.182,109.958,245.156,245.139,245.156
				c135.186,0,245.162-109.978,245.162-245.156C490.31,109.98,380.333,0,245.148,0z M245.148,438.415
				c-106.555,0-193.234-86.698-193.234-193.253c0-106.555,86.68-193.258,193.234-193.258c106.559,0,193.258,86.703,193.258,193.258
				C438.406,351.717,351.706,438.415,245.148,438.415z"
            />
            <path
              d="M270.036,221.352h-49.771c-8.351,0-15.131,6.78-15.131,15.118v147.566c0,8.352,6.78,15.119,15.131,15.119h49.771
				c8.351,0,15.131-6.77,15.131-15.119V236.471C285.167,228.133,278.387,221.352,270.036,221.352z"
            />
            <path
              d="M245.148,91.168c-24.48,0-44.336,19.855-44.336,44.336c0,24.484,19.855,44.34,44.336,44.34
				c24.485,0,44.342-19.855,44.342-44.34C289.489,111.023,269.634,91.168,245.148,91.168z"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
