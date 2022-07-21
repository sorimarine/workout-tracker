import { useState } from "react";
import "./AddSet.css";

const AddSet = ({ onSetComplete, w = 0, r = 1 }) => {
  const [weight, setWeight] = useState(w);
  const [rep, setRep] = useState(r);
  const [inputError, setInputError] = useState("");
  const maxWeight = 9999,
    minWeight = 0;
  const maxRep = 9999,
    minRep = 1;

  const onSetAdded = () => {
    setInputError("");
    if (Number(weight) < 0) {
      setInputError("Weight must be a number greater than 0.");
      return;
    }
    if (!Number.isInteger(Number(rep)) || Number(rep) < 1) {
      setInputError("Rep must be an integer greater than 1.");
      return;
    }
    onSetComplete({ weight: Number(weight), rep: Number(rep) });
  };

  const adjustWeight = (adjustment) => {
    let newWeight = Number(weight) + Number(adjustment);
    if (newWeight < minWeight) newWeight = minWeight;
    else if (newWeight > maxWeight) newWeight = maxWeight;
    setWeight(newWeight);
  };

  const adjustRep = (adjustment) => {
    let newRep = Number(rep) + adjustment;
    if (newRep < minRep) newRep = minRep;
    else if (newRep > maxRep) newRep = maxRep;
    setRep(newRep);
  };

  const setInputDiv = (
    <div className="addSet">
      <h5 className="addSet__header">Add Set</h5>
      <div className="addSet__container">
        <label htmlFor="weight">weight: </label>
        <div className="addSet__inputDiv">
          <button className="primary" onClick={() => adjustWeight(-5)}>
            -5
          </button>
          <input
            className="addSet__numberInput"
            id="weight"
            value={weight}
            type="number"
            onChange={(e) => setWeight(e.target.value)}
            max="9999"
            min="0"
          />
          <button className="primary" onClick={() => adjustWeight(5)}>
            +5
          </button>
        </div>
        <label htmlFor="rep">rep: </label>
        <div className="addSet__inputDiv">
          <button className="primary" onClick={() => adjustRep(-1)}>
            -1
          </button>
          <input
            className="addSet__numberInput"
            id="rep"
            value={rep}
            type="number"
            step="1"
            min="1"
            max="9999"
            onChange={(e) => setRep(e.target.value)}
          />
          <button className="primary" onClick={() => adjustRep(1)}>
            +1
          </button>
        </div>
        {inputError && (
          <p>
            <em>{inputError}</em>
          </p>
        )}
        <button className="primary" onClick={onSetAdded}>
          Add
        </button>
      </div>
    </div>
  );

  return setInputDiv;
};

export default AddSet;
