import React, { Component } from "react";
import "./TodoApp.css";

export default class TodoApp extends Component {
  state = {
    input: "",
    items: [],
    edit: false,
    key: null,
    isOpen: false,
    editedInput: "",
  };

  handleChange = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  handleEditChange = (event) => {
    this.setState({
      editedInput: event.target.value,
    });
  };

  storeItem = (event) => {
    event.preventDefault();
    const { input } = this.state;
    if(input){
    this.setState({
      items: [...this.state.items, input],
      input: "",
    });
  }

  };

  deleteItem = (key) => {
    this.setState({
      items: this.state.items.filter((item, index) => index !== key),
    });
  };

  editItem = (event) => {
    event.preventDefault();
    const { key, editedInput, items } = this.state;
    if(editedInput && key){
    items.splice(key, 1, editedInput); // Replace 'banana' with 'blueberry'
    this.setState({
      items: items,
      key: null,
      editedInput: "",
      edit: false,
      isOpen: false,
    });
  }else{
    this.setState({
      isOpen:false
    })
  }
  };

  openPopup = (key) => {
    this.setState({
      edit: true,
      isOpen: true,
      key: key,
      editedInput: this.state.items[key],
    });
  };

  closePopup = () => {
    this.setState({
      isOpen: false,
    });
  };

  render() {
    const { input, items, edit, key, isOpen, editedInput } = this.state;

    return (
      <div className="todo-container">
        <form className="input-section" onSubmit={this.storeItem}>
          <h1>Todo App</h1>
          <input
            type="text"
            value={input}
            onChange={this.handleChange}
            placeholder="Enter Items..."
          />
        </form>
        <ul>
          {items.map((data, index) => (
            <li key={index}>
              {data}
              <div className="icon">
                <i
                  className="far fa-edit"
                  onClick={() => this.openPopup(index)}
                ></i>
                <i
                  className="fas fa-trash-alt"
                  onClick={() => this.deleteItem(index)}
                ></i>
              </div>
            </li>
          ))}
        </ul>

        <div>
          {isOpen && (
            <div className="popup">
              <div className="popup-inner">
                <h2 style={{ color: "white" }}>Edit the item</h2>
                <form className="dialog-input-section" onSubmit={this.editItem}>
                  <input
                    type="text"
                    value={editedInput}
                    onChange={this.handleEditChange}
                    placeholder="Enter Items..."
                  />
                </form>
                <div className="btn">
                  <button className="edit-btn" onClick={this.editItem}>
                    Edit
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => this.closePopup()}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
