import React, { Component } from 'react'
import ReactTable from 'react-table'
import api from '../api'

import styled from 'styled-components'

import 'react-table/react-table.css'

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
        console.log("HERE IS REST")
        console.log(restaurants);
        const columns = [
            {
                Header: 'ID',
                accessor: '_id',
                filterable: true,
            },
            {
                Header: 'Name',
                accessor: 'name',
                filterable: true,
            },
            {
                Header: 'Status',
                accessor: 'status',
                filterable: true,
            },
            {
                Header: 'Precautions',
                accessor: 'precautions',
                filterable: true,
            },
            {   Header: 'Score',
                accessor: 'score',
                filterable: true,
            },
            {
                Header: '',
                accessor: '',
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
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={restaurants}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={false}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    }
}

export default RestaurantsList
