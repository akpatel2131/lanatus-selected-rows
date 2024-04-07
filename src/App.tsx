import React, { useCallback, useMemo, useState } from 'react';
import {MenuItem, Select} from '@mui/material';
import styles from './app.module.css';


// Define type for options
type OptionsProps = {id: string, name: string};

// Define mock data
const MockData: OptionsProps[] = [ // Ensure MockData array type is OptionsProps[]
  { id: "1", name: "Rows 1" },
  { id: "2", name: "Rows 2" },
  { id: "3", name: "Rows 3" },
  { id: "4", name: "Rows 4" },
  { id: "5", name: "Rows 5" },
  { id: "6", name: "Rows 6" }
];


function App() {
  // State to manage selected options
  const [selectOptions, setSelectOption] = useState<OptionsProps[]>([]);

  // Function to handle checkbox click
  const handleClick = useCallback((value: OptionsProps) => {
    // Use functional updates for state to ensure correct state is used
    setSelectOption(prevOptions => {
      // Check if value already exists in selected options
      const hasElement = prevOptions.find(item => item.name === value.name);

      // Update options based on whether value already exists or not
      if (hasElement) {
        return prevOptions.filter(item => item.name !== value.name);
      } else {
        return [...prevOptions, value];
      }
    });
  }, []);

  // Memoize select box component to optimize rendering
  const selectBox = useMemo(() => {
    // Determine value to display in select box
    const value = selectOptions.length > 0 ? selectOptions[0].name : "Please select options";

    return (
      <Select displayEmpty className={styles.select} renderValue={() => value} >
        {selectOptions.map(item => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
      </Select>
    );
  }, [selectOptions]);


  return (
    <div className={styles.container}>
        {/* check list container code */}
      <div className={styles.optionsContainer}>
        <div>Selected Rows</div>
        {MockData.map(item => (
          <div key={item.id} className={styles.selectBox}>
            <input type='checkbox' value={item.id} onClick={() => handleClick(item)}/>
            {item.name}
          </div>
        ))}
      </div>
      {/* select container code */}
      <div className={styles.optionsContainer}>
        <div>Base Rows</div>
        <div>{selectBox}</div>
      </div>
    </div>
  );
}


export default App;
