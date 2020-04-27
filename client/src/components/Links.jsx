import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth'
import Button from 'react-bootstrap/Button'
import {withRouter} from 'react-router-dom';

const Collapse = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

const List = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})``

const Item = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``


class Links extends Component {

    render() {
        return (
            <React.Fragment>
                <Link to="/" className="navbar-brand">
                    MERN Local Restaurant Database
                </Link>
                <Collapse>
                    <List>
                        <Item>
                            <Link to="/restaurants/list" className="nav-link">
                                List Restaurants
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/restaurants/create" className="nav-link">
                                Create Restaurant
                            </Link>
                        </Item>
                        <Item>
                            {this.props.isAuthenticated ?
                            <Link to="/logout" className="nav-link">Logout</Link> 
                            : <Link to="/auth" className="nav-link">Admin Login</Link>

                            }
                        </Item>
                    </List>
                </Collapse>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
      isAuthenticated: state.auth.token !== null
    };
  };
  
  
export default withRouter( connect( mapStateToProps, null )( Links ) );

