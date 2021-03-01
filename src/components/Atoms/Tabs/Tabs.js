import Tab from "./Tab"
import styled from "styled-components"
import { useHistory } from 'react-router-dom'
import { useState } from 'react';

const StyledTabs = styled.div`
  display: flex;

  background-color: #ffffff;

  .selected {
    border-bottom: 1px solid #d9552d;    
  }
  .selected div{
    color: #d9552d;
  }
`

//Render tabs function
function Tabs(props) {

  //Handle route when tab is clicked
  let history = useHistory();

  //Create tabs state based on tabs prop
  const [tabs, setTabs] = useState(props.tabs)

  //Handles tab selection and redirect to selected tab
  function selectTab(tab) {
    let newTabs = tabs.map( t => {
      if(t.name === tab.name){
        history.push(tab.route)
      }
      return t;
    })
    setTabs(newTabs);
  }

  //Render styled tabs
  return (
    <StyledTabs>{
    tabs.map( (tab, index) => {
      return (
        <Tab key={index} className={tab.selected ? "selected" : ""} onClick={() => selectTab(tab)}>
          <div className="link">
              {tab.name}
          </div>
            </Tab>   
            )
          })}
    </StyledTabs>
  )
}

export default Tabs;