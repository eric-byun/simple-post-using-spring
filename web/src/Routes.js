import React, { Component } from 'react';
import styled from 'styled-components';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { PostList } from './pages/PostList';
import { PostView } from './pages/PostView';
import { PostWrite } from './pages/PostWrite';

class Routes extends Component {
  render() {
    return (
      <MainBody>
        <Router>
          <Switch>
            <Route exact path="/" exact={true} component={PostList} />
            <Route exact path="/new" component={PostWrite} />
            <Route exact path="/:id" component={PostView} />
            <Route exact path="/:id/edit" component={PostWrite} />
          </Switch>
        </Router>
      </MainBody>
    );
  }
}

const MainBody = styled.div`
  width: 72rem;
  display: flex;
  margin: auto;
`;

export default Routes;
