import Tab from "./Tab"
import styled from "styled-components"
import { useHistory } from 'react-router-dom'
import { useState } from 'react';


const StyledTabs = styled.div`
  display: flex;

  background-color: #ffffff;

  .selected {
    border-bottom: 1px solid red;    
  }
  .selected div{
    color: red;
  }
`


//Render tabs function
function Tabs(props) {

  let history = useHistory();

  const [tabs, setTabs] = useState(props.tabs)

  function selectTab(tab) {
    let newTabs = tabs.map( t => {
      if(t.name === tab.name){
        history.push(tab.route)
      }
      return t;
    })

    setTabs(newTabs);
  }

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