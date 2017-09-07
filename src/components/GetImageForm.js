import React, { Component } from 'react';
import ImageDisplay from './ImageDisplay.js';
import GetImageButton from './GetImageButton.js';


const API_KEY = "pwTpXANgJpqSBOrdi3LGYt8thLebtnP98YSIfYrW";

class GetImageForm extends Component {
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
      sols: 0,
    }
  }

  handleRover(event){
    this.setState({rover: event.target.value})
  }

  handleCamera(event){
    this.setState({camera: event.target.value})
  }

  handleSol(event){
    this.setState({sol: event.target.value})
  }

  fetchRoverImage=()=>{
    this.setState({
      camera: this.state.camera,
      rover: this.state.rover,
      sols: this.state.sols,
      images: []});

    let camera1 = this.state.camera;
    let rover1 = this.state.rover;
    let solNum = this.state.sols;

    let imageURL = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover1}/photos?sol=${solNum}&camera=${camera1}&api_key=${API_KEY}`;

    fetch(imageURL)
    .then(results=>results.json())
    .then(data => {
      this.setState({camera: this.state.camera, rover: this.state.rover, sols: this.state.sols, images: data.photos});
    }).catch((error)=>{
      console.log('error', error)
    });
  }

  render() {
    return (
      <div className="form_container">
        <div className="form-group">
          <label htmlFor="rover">
            Select Rover:
          </label>
          <select onChange={this.handleRover} id = "roverID" value= {this.state.value}>
            <option value="Curiosity">Curiousity</option>
            <option value="Opportunity">Opportunity</option>
            <option value="Spririt">Spririt</option>
          </select>
          <label htmlFor="camera">Camera Type</label>
          <select onChange={this.handleCamera} id = "roverID" value= {this.state.value}>
            <option value="fhaz">FHAZ (Front Hazard)</option>
            <option value="rhaz">RHAZ (Rear Hazard)</option>
            <option value="navcam">NAVCAM (Navigation Cam)</option>
          </select>
          <label htmlFor="sol">Martian Sol: 1000-2000</label>
          <input type="number" onChange={this.handleSol} max="2000" min="1000" value={this.state.value}/>
          <GetImageButton search={this.fetchRoverImage}/>

          <div>
          <h1 className="roverName">{this.state.rover}</h1>
          <ImageDisplay photos={this.state.images}/>
          </div>

        </div>
      </div>
    );
  }
}

export default GetImageForm;
