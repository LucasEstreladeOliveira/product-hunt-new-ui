import Tabs from "../Tabs/Tabs"
import styled from "styled-components"
import { useState } from 'react'

const StyledNav = styled.div`
  background-color: #ffffff;
`

//Render nav function
function Nav(props) {
  
  const [tabs, setTabs] = useState(props.tabs)
 
  return (
    <StyledNav>
      <div>
        <div>Avatar</div>
        <div> Day </div>
        <div> search</div>
      </div>
      <Tabs tabs={tabs}/>
    </StyledNav>
  )
}


export default Nav;