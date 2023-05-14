import React, { useContext, useState, useEffect } from 'react'
import TodoContext from '../context/todo/TodoContext';
import { TodoContextType } from '../common/Types';
import { TodoTask } from '../common/Interfaces';
import { Button, Checkbox, Input } from "@material-ui/core";
import update from 'immutability-helper'
import Popup from './shared/Popup';
import CSS from 'csstype'
import { faCodeBranch, faDeleteLeft, faCircleChevronDown, faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function Dashboard() {

    const {todoList, setTodoList} = useContext(TodoContext) as TodoContextType;
    const [newTask, setNewTask] = useState<string>('')
    const [open, setOpen] = useState(false);
    const [idx, setIdx] = useState(-1);
    const [dropdown, setDropdown] = useState<boolean[]>([])


    useEffect(()=>{
      const dropdowns = Array(todoList.length).fill(true);
      setDropdown(dropdowns);
    },[])

    useEffect(()=>{
    },[todoList])


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setIdx(-1);
        setNewTask('');
    };

    const toggleDropdown = (idx: number) => {
      const updatedDropdown = dropdown.slice();
      updatedDropdown[idx] = !updatedDropdown[idx];
      setDropdown(updatedDropdown);
    }

    const addList = ()=> {
        handleClose();
        if(newTask === '') return;
        let updatedTodoList = todoList.slice();
        updatedTodoList.push({heading: newTask, list: [] as TodoTask[]} as TodoTask);
        setTodoList(updatedTodoList);
        let updatedDropdown = dropdown.slice();
        updatedDropdown.push(false);
        setDropdown(updatedDropdown);
        setNewTask('');
      }
    
      const deleteList = (idx: number) => {
        let updatedTodoList = todoList.slice();
        updatedTodoList.splice(idx,1);
        setTodoList(updatedTodoList);
        let updatedDropdown = dropdown.slice();
        updatedDropdown.splice(idx,1);
        setDropdown(updatedDropdown);
      }
    
      const addItemToList = (idx: number) => {
        handleClose();
        if(newTask === '') return;
        let updatedList = todoList[idx]?.list as TodoTask[];
        updatedList.push({heading: newTask} as TodoTask);
        const updatedTask = {...todoList[idx], list: updatedList}
        const updatedTodoList= update(todoList, {$splice: [[idx, 1, updatedTask]]});
        setTodoList(updatedTodoList);
        setNewTask('');
      }
    
      const removeTask = (idx: number, subIdx: number) => {
        let updatedList = todoList[idx]?.list as TodoTask[];
        updatedList.splice(subIdx, 1);
        const updatedTask = {...todoList[idx], list: updatedList}
        const updatedTodoList= update(todoList, {$splice: [[idx, 1, updatedTask]]});
        setTodoList(updatedTodoList)
      }

      const handleAddItemButtonClick = (idx: number) => {
        setIdx(idx);
        handleClickOpen();
      } 

    const deleteIconStyles: CSS.Properties = {
        fontSize: '24px',
    }

    const addSubtask: CSS.Properties = {
        fontSize: '16px',
        borderRadius: '50%',
        minWidth: '0',
        margin: '0 0 0 8px',
    }

    const headingStyle: CSS.Properties = {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '0 10%',
      height: '28px',
      borderBottom: '1px black solid'
    }

    const flexRow: CSS.Properties = {
      display: 'flex',
      flexDirection: 'row'
    }

    const dropdownStyle: CSS.Properties = {
      textAlign: 'left',
      margin: '0 16%'
    }

    const marginAuto: CSS.Properties = {
      margin: 'auto'
    }

  return (
    <div>
        <h1>
            Dashboard
        </h1>
        <Popup 
          open={open} 
          newTask={newTask}
          setNewTask={setNewTask}
          setOpen={setOpen} 
          handleClose={handleClose}
          addList={addList}
          addItemToList={addItemToList}
          idx={idx}
        />
        
      <Button onClick={ () => {handleClickOpen() }} color="primary" variant="outlined" > Add Todo List</Button>
      <div>
        {todoList.map((item,idx) => {

          return (
            <div>
            <div style={headingStyle}>
              <div style={flexRow}>
                <Button onClick={ () => toggleDropdown(idx) } style={addSubtask} > <FontAwesomeIcon icon={dropdown[idx] ? faCircleChevronDown : faCircleChevronRight} /></Button>
                <h5 style={marginAuto}>  {item.heading} </h5>
                </div>
              <div style={flexRow}>
                <Button onClick={ () => { handleAddItemButtonClick(idx) }} color="primary" style={addSubtask} > <FontAwesomeIcon icon={faCodeBranch} rotation={90} /> </Button>
                <Button onClick={() => { deleteList(idx)}} color="secondary" style={addSubtask}> <span className="material-icons mat-fab" style={deleteIconStyles} >delete</span> </Button>
              </div>
            </div>
            {dropdown[idx] && 
            (<div style={dropdownStyle}>
              {item.list?.map((subItem, subIdx) => {
                return(
                  <p>
                    {subItem.heading}
                    <Button onClick={() => removeTask(idx, subIdx)} color="secondary" style={addSubtask}> <FontAwesomeIcon icon={faDeleteLeft} />  </Button>
                  </p>
                )
              })}
            </div>)}

            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Dashboard