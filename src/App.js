// src/App.js
import React, { useState } from "react";
import "./App.css"; // For styling
import Header from "./components/Header/Header";

const SCHEMA_OPTIONS = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" },
];

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [segmentName, setSegmentName] = useState("");
  const [schemas, setSchemas] = useState([]);
  const [selectedSchema, setSelectedSchema] = useState("");

  const handleSaveSegmentClick = () => setShowPopup(true);
  const handleBackSegmentClick = () => setShowPopup(false);
  
  const handleSaveToServer = () => {
    if(segmentName.length<=0){
      return alert("Please Enter Name of the Segment")
    }
    const data = {
      segment_name: segmentName,
      schema: schemas.map((schema) => {
        const foundSchema = SCHEMA_OPTIONS.find((s) => s.value === schema);
        return { [schema]: foundSchema ? foundSchema.label : "Unknown" };
      }),
    };

    fetch("https://webhook.site/da387460-ecbe-48f1-8fe4-f2dad8a6f617", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => alert("Data sent to server:", data))
      .catch((error) => alert("Error:", error));

    setShowPopup(false);
    setSegmentName("");
    setSchemas([]);
  };

  // ---------

  // Handle the change of selected schema
  const handleSelectChange = (e) => {
    setSelectedSchema(e.target.value);
  };

  // Add the selected schema to the list when the button is clicked
  const handleAddSchema = () => {
    if (!selectedSchema) return;

    // Prevent duplicate selections (this check is redundant due to filtering, but is an extra safeguard)
    if (schemas.includes(selectedSchema)) {
      alert("This option is already selected!");
      return;
    }

    setSchemas([...schemas, selectedSchema]);
    setSelectedSchema(""); // Reset the select box after adding
  };

  // Remove a schema from the list
  const handleRemoveSchema = (valueToRemove) => {
    setSchemas(schemas.filter((schema) => schema !== valueToRemove));
  };

  // Filter out options that have already been selected
  const availableOptions = SCHEMA_OPTIONS.filter(
    (option) => !schemas.includes(option.value)
  );
  return (
    <div className="App">
      <div>
        <Header title="View Audience" />
        <div className="saveBtn">
          <div>
            <button onClick={handleSaveSegmentClick}>Save segment</button>
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="popup">
          <Header title="Save Segment" handleBackSegmentClick={handleBackSegmentClick} />
          <div className="userDetails">
            <div style={{ margin: "24px" }}>
              <label htmlFor="">Enter the Name of the Segment</label>
              <input
                type="text"
                placeholder="Name of the segment"
                value={segmentName}
                onChange={(e) => setSegmentName(e.target.value)}
              />
              <p>To save your segment, you need to add the schemas to build the query</p>
              <div className="all-traits">
                <div className="traits">
                  <ul>
                    <li>User Traits</li>
                    <li>Group Traits</li>
                  </ul>
                </div>
              </div>

              <div>
                {/* Initial Select Box */}
                <select value={selectedSchema} onChange={handleSelectChange}>
                  <option value="">Select an option</option>
                  {availableOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {/* Add Button */}
                <button className="buttonSchema" onClick={handleAddSchema}><span>+</span> <span>Add new schema</span></button>

                {/* Render dynamic select elements */}
                {schemas.map((schema, index) => {
                  let schemaOption = SCHEMA_OPTIONS.find((s) => s.value === schema);

                  return (
                    <div
                      key={index}
                      className="schema-item"
                      style={{ marginTop: "10px", display: "flex", alignItems: "center" }}
                    >
                      {/* New Select Element with Selected Option */}
                      <select value={schema} onChange={() => { }} disabled>
                        <option value={schema}>
                          {schemaOption ? schemaOption.label : "Unknown"}
                        </option>
                      </select>
                      {/* Delete Button */}
                      <button
                        onClick={() => handleRemoveSchema(schema)}
                        className="deletebtn"
                      >
                        -
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="saveSegment">
              <button onClick={handleSaveToServer}>Save the segment</button>
              <button onClick={() => {setShowPopup(false); setSchemas([])}}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
