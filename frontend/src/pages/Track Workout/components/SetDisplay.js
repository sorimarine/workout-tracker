import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faUndo, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "./SetDisplay.css";
const SetDisplay = ({ set, onDeleteSet }) => {
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);

  const deleteSet = () => {
    setShowDeleteBtn(false);
    onDeleteSet();
  };

  return (
    <span className="setDisplay">
      {showDeleteBtn ? (
        <div>
          <button onClick={() => setShowDeleteBtn(false)}>
            <FontAwesomeIcon icon={faUndo} />
          </button>
          <button>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button onClick={deleteSet}>
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
      ) : (
        <button
          className="setDisplay__btn"
          onClick={() => setShowDeleteBtn(true)}
        >
          {set.rep}@{set.weight}lbs
        </button>
      )}
    </span>
  );
};

export default SetDisplay;
