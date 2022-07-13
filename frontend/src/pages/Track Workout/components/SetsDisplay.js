import SetDisplay from "./SetDisplay";
import "./SetsDisplay.css";

const SetsDisplay = ({ sets, deleteSet }) => {
  return (
    <div className="setsDisplay">
      <h5 className="setsDisplay__header">Sets Completed</h5>
      {sets.map((set, index) => (
        <SetDisplay
          set={set}
          key={index}
          onDeleteSet={() => deleteSet(index)}
        />
      ))}
    </div>
  );
};

export default SetsDisplay;
