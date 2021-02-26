import { Switch, Route } from 'react-router-dom';
import PostList from '../components/Post/PostList'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';
import Nav from "../components/Nav/Nav"

function Feed() {

  const location = useLocation();

  const [tabs, setTabs] = useState([{name: "Popular", route: "/", selected: false}, {name: "Newest", route: "/newest", selected: false}])

  useEffect(() => {
    let newTabs = tabs.map( tab => {
      if(tab.route === location.pathname) {
        tab.selected = true
      }else{
        tab.selected = false
      }
      return tab;
    })
    setTabs(newTabs);
  }, [location])

  return (
    <div>
      <Nav tabs={tabs}/>
      <Switch>
      <Route exact path="/">
        <PostList ordem="RANKING"/>
      </Route>
      <Route path="/newest">
        <PostList ordem="NEWEST"/>
      </Route>
      </Switch>
    </div>
  )
}

export default Feed;