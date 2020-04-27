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
// function isReturned(flat_element) {
//     try {
//         if (flat_element != null) return flat_element;
//         else return "loading";
//     }
//     catch {
//         return "loading";
//     }
// }


class StatusUpdate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            new_data: [],
        }
    }
    // updates state if data is retrieved.
    componentDidMount = async () => {
        console.log('this called');
        await api.massStatusUpdate().then(info => {
            this.setState({
                new_data: [info],
            });
        }).catch(err => {
            console.log("ERROR w/ mounting: " + err);
        })
    }

    render() {
        const { new_data } = this.state;
        return (
        <Wrapper>
            <MastPadding>
            <div className="row">
                {new_data}
            </div>
            </MastPadding>
        </Wrapper>
        );
    }

}

export default StatusUpdate
