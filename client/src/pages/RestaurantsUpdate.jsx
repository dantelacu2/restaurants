import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class RestaurantsUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            status: '',
            precautions: '',
            score: ''
        }
    }

    handleChangeInputName = async event => {
        const name = event.target.value
        this.setState({ name })
    }

    handleChangeInputStatus = async event => {
        const rating = event.target.value
        this.setState({ rating })
    }

    handleChangeInputPrecautions = async event => {
        const time = event.target.value
        this.setState({ time })
    }

    handleChangeInputScore = async event => {
        const score = event.target.value
        this.setState({ score })
    }

    handleUpdateRestaurant = async () => {
        const { id, name, status, precautions, score } = this.state
        const payload = { name, status, precautions, score}

        await api.updateRestaurantById(id, payload).then(res => {
            window.alert(`Restaurant updated successfully`)
            this.setState({
                name: '',
                status: '',
                precautions: '',
                score
            })
        })
    }

    componentDidMount = async () => {
        const { id } = this.state
        const restaurant = await api.getRestaurantById(id)

        this.setState({
            name: restaurant.data.data.name,
            status: restaurant.data.data.status,
            precautions: restaurant.data.data.precautions,
            score: restaurant.data.data.score
        })
    }

    render() {
        const { name, status, precautions, score } = this.state
        return (
            <Wrapper>
                <Title>Create Restaurant</Title>

                <Label>Name: </Label>
                <InputText
                    type="text"
                    value={name}
                    onChange={this.handleChangeInputName}
                />

                <Label>Status: </Label>
                <InputText
                    type="text"
                    value={status}
                    onChange={this.handleChangeInputStatus}
                />

                <Label>Precautions: </Label>
                <InputText
                    type="text"
                    value={precautions}
                    onChange={this.handleChangeInputPrecautions}
                />

                <Label>Score: </Label>
                <InputText
                    type="text"
                    value={score}
                    onChange={this.handleChangeInputScore}
                />

                <Button onClick={this.handleUpdateRestaurant}>Update Restaurant</Button>
                <CancelButton href={'/restaurants/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default RestaurantsUpdate
