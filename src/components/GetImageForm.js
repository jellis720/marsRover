import React, { Component } from 'react';
import GetImageButton from './GetImageButton';
import ImageDisplay from './ImageDisplay';

const API_KEY = "pwTpXANgJpqSBOrdi3LGYt8thLebtnP98YSIfYrW"

export default class GetImageForm extends Component {
  constructor(props){
    super(props);

    this.handleRover = this.handleRover.bind(this);
    this.handleCamera = this.handleCamera.bind(this);
    this.handleSol = this.handleSol.bind(this);
    this.fetchRoverImage = this.fetchRoverImage.bind(this);

    this.state = {
      rover: 'Curiosity',
      camera: 'FHAZ',
      images: [],
      sol: 0,
    }
  }

  handleRover(event){
    this.setState({rover: event.target.value})
  }

  handleCamera(event){
    this.setState({rover: event.target.value})
  }

  handleSol(event){
    this.setState({rover: event.target.value})
  }

  fetchRoverImage=()=>{
    this.setState({camera: this.state.camera, rover: this.state.rover, sols: this.state.sols, images: []});

    let camera = this.state.camera;
    let rover = this.state.rover;
    let solNum = this.state.sol;
    let URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${solNum}&camera=${camera}&api_key=${API_KEY}`;

    fetch(URL).then(results=>results.json()).then(data=>{
      this.setState({camera: this.state.camera, rover: this.state.rover, sol: this.state.sol, images: data.photos});
    }).catch((error)=>{
      console.log('error', error)
    });
  }

  render() {
    return (
      <div className="form_container">
        <div className="form-group">
          <label htmlFor="roverLabel">
            Select Rover:
          </label>
          <select onChange={this.handleRover} id = "roverID" value= {this.state.value}>
            <option value="Curiosity">Curiousity</option>
            <option value="Opportunity">Opportunity</option>
            <option value="Spririt">Spririt</option>
          </select>
          <label htmlFor="camera">Camera View</label>
          <select onChange={this.handleCamera} id = "roverID" value= {this.state.value}>
            <option value="fhaz">Front Hazard</option>
            <option value="rhaz">Rear Hazard</option>
            <option value="navcam">Navigation Camera</option>
          </select>
          <label htmlFor="sol">Martian Sol: 1000-2000</label>
          <input type="number" onChange={this.handleSol} max="2000" min="1000" value={this.state.value}/>
          <GetImageButton search={this.fetchRoverImage}/>
          <h1 className="roverName">{this.state.rover}</h1>
          <ImageDisplay photos={this.state.images}/>
        </div>
      </div>
    );
  }
}
