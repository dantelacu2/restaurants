import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { Component } from "react";
import api from '../api'

function isReturned(flat_element) {
  try {
      if (flat_element != null) return flat_element;
      else return "loading";
  }
  catch {
      return "loading";
  }
}


class FooterPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
        time: [],
    }
}

componentDidMount = async () => {
  console.log('this called');
  await api.getStats().then(statistics => {
      this.setState({
          time: statistics.data.time
      });
  }).catch(err => {
      console.log("ERROR w/ mounting: " + err);
  })
}
  render () {
    const { time } = this.state;
    return (
    <MDBFooter color="black" className="font-small pt-2 mt-4 text-right fixed-bottom">
      <MDBContainer>
        <MDBRow>
          <MDBCol>
          <p className="text-left">Made by Dante Lacuadra</p>
          </MDBCol>
          <MDBCol>
            <p>Data was last updated on {isReturned(time[0])}, {isReturned(time[1])}</p>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBFooter>
    );
}
}

export default FooterPage;