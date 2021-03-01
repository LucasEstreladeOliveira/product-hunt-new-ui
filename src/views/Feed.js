import { Switch, Route } from 'react-router-dom';
import PostList from '../components/Molecules/PostList/PostList'
import { useLocation, useRouteMatch } from 'react-router-dom'
import { useEffect, useState } from 'react';
import Nav from "../components/Molecules/Nav/Nav"

function Feed() {

  const location = useLocation();
  let { path, url } = useRouteMatch();
  const [tabs, setTabs] = useState([{name: "Popular", route: `${url}`, selected: false}, {name: "Newest", route: `${url}/newest`, selected: false}])

  function selectTab() {
    return tabs.map( tab => {
      if(tab.route === location.pathname) {
        tab.selected = true
      }else{
        tab.selected = false
      }
      return tab;
    })
  }
  useEffect(() => {
    let newTabs = selectTab();
    setTabs(newTabs);
    // eslint-disable-next-line
  }, [location])

  return (
    <div>
      <Nav tabs={tabs}/>
      <Switch>
      <Route exact path={`${path}/`}>
        <PostList ordem="RANKING"/>
      </Route>
      <Route path={`${path}/newest`}>
        <PostList ordem="NEWEST"/>
      </Route>
      </Switch>
    </div>
  )
}

export default Feed;