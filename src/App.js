import logo from './logo.svg';
import './App.css';

import React, { createRef } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
 const users = [
  { id: 1, name: 'Alice', gender: 'f' },
  { id: 2, name: 'Bob', gender: 'm' },
  { id: 3, name: 'Tom', gender: 'm' },
  { id: 4, name: 'Mary', gender: 'f' },
 ];

 const Male = props => {
    return (
    <ul>
      {users.filter(u => u.gender === 'm')
      .map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
    );
 }

 const Female = props => {
    return (
    <ul>
      {users.filter(u => u.gender === 'f')
      .map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
    );
 }


const Item = ({ name, price }) => (
  <li>{name}, ${price}</li>
  )
  
  const App = props => {
      
    let nameRef = createRef();
    let priceRef = createRef();
    const add = () => {
      props.add(
        props.items.length + 1,
        nameRef.current.value,
        priceRef.current.value
        );
      }
      return (
        <div>
          <Router>
            <div>
              <ul>
                <li><Link to="/male">Male</Link></li>
                <li><Link to="/female">Female</Link></li>
              </ul>
              <div style={{background: 'cyan', padding: 20}}>
                  <Switch>
                    <Route path="/male"><Male /></Route>
                    <Route path="/female"><Female /></Route>
                </Switch>
              </div>
            </div>
          </Router>
          <ul>
            {props.items.map(i => (
              <Item 
              key={i.id}
              name={i.name} 
              price={i.price} 
              />
              ))}
          </ul>
          <input type="text" ref={nameRef} /><br />
          <input type="text" ref={priceRef} /><br />
          <button onClick={add}>Add</button>
        </div>
          )
        }
        const stateToProps = state => {
          return {
            items: state
          };
        }
        const dispatchToProps = dispatch => {
          return {
            add: (id, name, price) => {
              dispatch({ 
                type: 'ADD', 
                item: { id, name, price } 
              });
            }
          }
        }
        const ReduxApp = connect(stateToProps, dispatchToProps)(App);
        
        export default ReduxApp;
        