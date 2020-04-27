import React, { Component } from 'react'
import ReactTable from 'react-table'
import api from '../api'

import styled from 'styled-components'

import 'react-table/react-table.css'
import './style.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
    padding-top: 50px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`

const MastPadding = styled.div`
    padding-bottom: 100px;
`


class UpdateRestaurant extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/restaurants/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateUser}>Update</Update>
    }
}

class DeleteRestaurant extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do tou want to delete the Restaurant ${this.props.id} permanently?`,
            )
        ) {
            api.deleteRestaurantById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>
    }
}

class RestaurantsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            restaurants: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllRestaurants().then(restaurants => {
            console.log('this is called');
            this.setState({
                restaurants: restaurants.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { restaurants, isLoading } = this.state
        console.log("HERE IS REST");
        const Statuses = ( {values} ) => {
            // Loop through the array and create a badge-like component instead of a comma-separated string
            return (
              <>
                {values.map((status, idx) => {
                    var patt = /no/i;
                    // checks if it's on on badge on an off badge
                    if (patt.test(status)) {
                  return (
                    <span key={idx} className="badge-off">
                      {status}
                    </span>
                  );
                }
                else {
                    return (
                        <span key={idx} className="badge-on">
                          {status}
                        </span>
                      );
                }
                })}
              </>
            );
        };
        console.log(restaurants);
        console.log("loggint his")
        const columns = [
            {
                Header: 'Score',
                accessor: 'score',
                filterable: true,
                width: 70,
            },
            {
                Header: 'Name',
                accessor: 'name',
                filterable: true,
                width: 300,

            },
            {
                Header: 'Phone #',
                accessor: 'phone',
                filterable: true,
                width: 130,
            },
            {
                Header: 'Precautions',
                accessor: 'precautions',
                filterable: true,
            },
            {
                Header: 'Statuses',
                accessor: 'status',
                filterable: true,
                Cell: v => <Statuses values={v.value} />
                //Cell: v => <h1>{v.value}</h1>,
            },
            {
                Header: '',
                accessor: '',
                width: 70,
                Cell: function(props) {
                    return (
                        <span>
                            <DeleteRestaurant id={props.original._id} />
                        </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                width: 70,
                Cell: function(props) {
                    return (
                        <span>
                            <UpdateRestaurant id={props.original._id} />
                        </span>
                    )
                },
            },
        ]

        let showTable = true
        if (!restaurants.length) {
            showTable = false
        }

        return (
            <MastPadding>
                <Wrapper>
                    {showTable && (
                        <ReactTable
                            data={restaurants}
                            columns={columns}
                            loading={isLoading}
                            defaultPageSize={20}
                            showPageSizeOptions={false}
                            minRows={0}
                            useResizeColumns={true}
                            resizable={true}
                        />
                    )}
                </Wrapper>
            </MastPadding>
        )
    }
}

export default RestaurantsList
