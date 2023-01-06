import React, { useState ,useEffect} from "react";
import List from "./TodoItems";


function App() {
  
  useEffect(()=>{
    getItems();
  },[items]);
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }
  

  async function addItem() {
    const res =await fetch("/item",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        item:inputText,
      })

    })
    const data=await res.json();
    console.log(data);
    setItems((prevItems) => {
      return [...prevItems, inputText];
    });
    setInputText("");
  }
  async function DeleteItem(id) {
    const valueItem=items.filter((items, index) => {
      return index == id;
    });
    const res=await fetch("/delete",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        item:valueItem[0],
      })

    })
    setItems((prevItems) => {
      return prevItems.filter((items, index) => {
        return index != id;
      });
    });
  }
  function HandleKey(event) {
    const key = event.key;
    if (key == "Enter") {
      addItem();
    }
  }
  async function getItems(){
    const res=await fetch("/itemArray",{
      method:"GET"
    })
    const data= await res.json();
    let result = data.map(a => a.item);
    console.log(result);
    setItems(result);
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input
          onChange={handleChange}
          type="text"
          value={inputText}
          placeholder="Enter to do item"
          onKeyDown={HandleKey}
        />
        <button onClick={addItem}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {items.map((todoItem, index) => (
            <List
              key={index}
              id={index}
              text={todoItem}
              onChecked={DeleteItem}
            />
            // <li
            //   style={submit ? { textDecoration: "line-through" } : null}
            //   id={index}
            //   onClick={Handleclick}
            // >
            //   {todoItem}
            // </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
