// const AutoComplete = ({ suggestions }) => {
//   const [filteredSuggestions, setFilteredSuggestions] = useState([]);
//   const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [input, setInput] = useState("");

//   const onChange = (e) => {
//     const userInput = e.target.value;
//     const unLinked = suggestions.filter(suggestion => {
//       return suggestion.toLowerCase().indexOf(userInput.toLowerCase()) >= 0;
//     });

//     setInput(e.target.value);
//     setFilteredSuggestions(unLinked);
//     setActiveSuggestionIndex(0);
//     setShowSuggestions(true);
//   }

//   const onClick = (e) => {
//     setFilteredSuggestions([]);
//     setInput(e.target.innerText);
//     setActiveSuggestionIndex(0);
//     setShowSuggestions(false);
//   }

//   const SuggestionsListComponent = () => {
//     return filteredSuggestions.length ? (
//       <ul className="suggestions">
//         {filteredSuggestions.map((suggestion, index) => {
//           let className;
//           if (index === activeSuggestionIndex) {
//             className = "suggestion-active";
//           }
//           return (
//             <li className={className} key={suggestion} onClick={onClick}>
//               {suggestion}
//             </li>
//           )
//         })}
//       </ul>
//     ) : (
//       <div className="no-suggestions">
//         <em>No suggestions, you're on your own!</em>
//       </div>
//     )
//   }
//   return (
//     <>
//       <input
//         type="text"
//         onChange={onChange}
//         value={input} />
//       {showSuggestions && input && <SuggestionsListComponent />}
//     </>
//   );
// };

const AutoComplete = ({ suggestions, changeHandler }) => {
  return (
    <div>
      <input
        type="text"
        list="suggestionsList"
        onChange={(e) => changeHandler(e.target.value)} />
      <datalist id="suggestionsList">
        {suggestions.map((suggestion) => {
          return <option key={suggestion} value={suggestion} />
        })};
      </datalist>
    </div>
  )
}

export default AutoComplete;