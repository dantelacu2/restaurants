import React, { Component } from 'react'
import './style.css'; // Tell webpack that Button.js uses these styles
import styled from 'styled-components'
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../api'

const MastPadding = styled.div`
    padding-bottom: 100px;
`
const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
    padding-top: 50px;
`
const CardBody = styled.div.attrs({
    className: 'card-body text-center text-black',
})``

const Card = styled.div.attrs({
    className: 'card'
})`
`

const Column = styled.div.attrs({
    className: 'col-md-4'
})`
padding: 20px;
`

// turns a number into a Locale String but only if it exists.
function isReturned(flat_element) {
    try {
        if (flat_element != null) return flat_element;
        else return "loading";
    }
    catch {
        return "loading";
    }
}


class Masthead extends Component {
    constructor(props) {
        super(props)
        this.state = {
            statistics: [],
            time: [],
        }
    }
    // updates state if data is retrieved.
    componentDidMount = async () => {
        console.log('this called');
        await api.getStats().then(statistics => {
            this.setState({
                statistics: statistics.data.data,
                time: statistics.data.time
            });
        }).catch(err => {
            console.log("ERROR w/ mounting: " + err);
        })
    }

    render() {
        const { statistics, time } = this.state;
        return (
        <Wrapper>
            <MastPadding>
            <div className="row">
                <Column>
                    <Card>
                        <CardBody>Global Confirmed Cases </CardBody>
                        <CardBody><h1>{isReturned(statistics[0]).toLocaleString()}</h1></CardBody>
                    </Card>
                </Column>
                <Column>
                    <Card>
                        <CardBody>Global confirmed deaths</CardBody>
                        <CardBody><h1>{isReturned(statistics[1]).toLocaleString()}</h1></CardBody>
                    </Card>
                </Column>
                <Column>
                    <Card>
                        <CardBody>Global confirmed recoveries</CardBody>
                        <CardBody><h1>{isReturned(statistics[2]).toLocaleString()}</h1></CardBody>
                    </Card>
                </Column>
            </div>
            </MastPadding>
        </Wrapper>
        );
    }

}

export default Masthead
