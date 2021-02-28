import Tabs from "../Tabs/Tabs"
import Avatar from "../Avatar/Avatar"
// import Calendar from "../Calendar/Calendar"
import styled from "styled-components"
import { useEffect, useState } from 'react'
import avatar from "../../assets/avatar.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 
import { usePosts } from "../../providers/posts"
import debounce from 'lodash/debounce'


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

  .react-datepicker-wrapper input {
    border: none;
    font-family: 'Open Sans';
    text-align: center;
    background: #f4f5f6;
    padding: 7px 0px;
    border-radius: 8px;
    color: #555;
    display: flex;
    margin: auto;
  }

  .react-datepicker-wrapper {
    margin: auto;
  }
  .search-inactive {
    display: none;
  }
  .search-active input{
    border: none;
    font-family: 'Open Sans';
    text-align: center;
    background: #f4f5f6;
    padding: 7px 0px;
    border-radius: 8px;
    color: #555;
    display: flex;
    margin: auto;
  }

  .datepicker-inactive {
    display: none;
  }

`

//Render nav function
function Nav(props) {
  
  const { setPostedBefore, setTopic } = usePosts();

  const [tabs, setTabs] = useState(props.tabs)
  const [startDate, setStartDate] = useState(new Date());
  const [ searchActive, setSearchActive ] = useState(false);

  useEffect(() => {
    setTabs(props.tabs);
  }, [props.tabs])


  function toggleSearch() {
    setSearchActive(!searchActive);
    setTopic(null);
    document.getElementById("input-search").value = ""
  }

  const handleFilter = debounce((val) => {
    console.log("val",val)
    setTopic(val)
  }, 250)

  function searchPostByTopic(topic) {
    const value = topic.target.value
    handleFilter(value)
  }
  
  function queryByDate(date){
    let queryDate = new Date(date.getFullYear(), date.getMonth(), (date.getDate() + 1));
    setPostedBefore(queryDate.toISOString());
    console.log(queryDate.toISOString())
    date.toISOString()
    setStartDate(date);
  }
  return (
    <StyledNav>
      <div className="nav-menu-wrapper">
        <Avatar className="avatar" src={avatar} />
        <span className={searchActive ? "datepicker-inactive" : ""}>
          <DatePicker dateFormat="dd/MM/yyyy"  selected={startDate} onChange={date => {
            queryByDate(date)
          }} />
        </span>
        <div className={searchActive ? "search-active" : "search-inactive"}>
          <input id="input-search" onInput={(data) => console.log(data.target.value)} onChange={ e => searchPostByTopic(e)}></input>
        </div>
        <div className="search" onClick={() => toggleSearch()}>
          <FontAwesomeIcon icon="search"></FontAwesomeIcon>
        </div>
      </div>
      <Tabs tabs={tabs}/>
    </StyledNav>
  )
}


export default Nav;