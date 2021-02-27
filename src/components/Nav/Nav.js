import Tabs from "../Tabs/Tabs"
import Avatar from "../Avatar/Avatar"
import Calendar from "../Calendar/Calendar"
import styled from "styled-components"
import { useEffect, useState } from 'react'
import avatar from "../../assets/avatar.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const StyledNav = styled.div`
  background-color: #ffffff;

  .nav-menu-wrapper {
    display: flex;
    justify-content: space-between;
    padding: 20px 15px;
  }
  
  .search {
    color: #71828a;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    cursor: pointer;
  }

`

//Render nav function
function Nav(props) {
  
  const [tabs, setTabs] = useState(props.tabs)

  useEffect(() => {
    setTabs(props.tabs);
  }, [props.tabs])
 
  return (
    <StyledNav>
      <div className="nav-menu-wrapper">
        <Avatar className="avatar" src={avatar} />
        <Calendar />
        <div className="search">
          <FontAwesomeIcon icon="search"></FontAwesomeIcon>
        </div>
      </div>
      <Tabs tabs={tabs}/>
    </StyledNav>
  )
}


export default Nav;