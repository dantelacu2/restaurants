import React, { Component } from 'react'
import './style.css'; // Tell webpack that Button.js uses these styles
import styled from 'styled-components'
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../api'


const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
    padding-top: 50px;
`
const CardBody = styled.div.attrs({
    className: 'card-body text-center text-secondary',
})``

const Card = styled.div.attrs({
    className: 'card'
})``

const Column = styled.div.attrs({
    className: 'col-md-4'
})``


class Masthead extends Component {
    constructor(props) {
        super(props)
        this.state = {
            statistics: [],
        }
    }

    componentDidMount = async () => {
        await api.getStats().then(statistics => {
            console.log('this is called');
            console.log("HERE");
            console.log(statistics.data.data);
            console.log("HERE");
            this.setState({
                statistics: statistics.data.data,
            })
        })
    }

    render() {
        console.log(this.state)
        const { statistics } = this.state
        return (
        <Wrapper>
            <div className="row">
                <Column>
                    <Card>
                        <CardBody>Cases in {statistics[3]}</CardBody>
                        <CardBody><h1>{statistics[0]}</h1></CardBody>
                    </Card>
                </Column>
                <Column>
                    <Card>
                        <CardBody>Deaths in {statistics[3]}</CardBody>
                        <CardBody><h1>{statistics[1]}</h1></CardBody>
                    </Card>
                </Column>
                <Column>
                    <Card>
                        <CardBody>Recoveries in {statistics[3]}</CardBody>
                        <CardBody><h1>{statistics[2]}</h1></CardBody>
                    </Card>
                </Column>
            </div>
        </Wrapper>
        );
    }

}

export default Masthead
