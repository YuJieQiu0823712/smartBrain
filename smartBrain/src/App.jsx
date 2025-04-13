import { Component } from 'react'
import ParticlesBg from 'particles-bg'
import './App.css'
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Rank from './components/Rank/Rank'
// import Clarifai from 'clarifai-nodejs-grpc'


// const app = new Clarifai.App({
//   apiKey: '2aa2b975753a40d49f06ef6accd55238'
// })




const App = () => {
// class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {}
    }
  };


  const USER_ID = 'r0823712';
  // Your PAT (Personal Access Token) can be found in the Account's Security section
  const PAT = '981d191d4235450e89c44735b9d79ea6';
  const APP_ID = 'face-detection';
  const MODEL_ID = 'face-detection';
  // const MODEL_TYPE_ID = 'Visual Detector';
  const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
  // const modelUrl =  "https://clarifai.com/clarifai/main/models/face-detection";
  const IMAGE_URL = 'https://www.lumierebeautyclinic.com.au/wp-content/uploads/2023/05/what-makes-a-face-attractive-Lumiere-Beauty-Clinic-scaled.jpg';

  const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "model": {
        "id": MODEL_ID,
        // "model_type_id": MODEL_TYPE_ID         
    },
    "inputs": [
      {
        "data": {
            "image": {
                "url": IMAGE_URL,
                // "base64": IMAGE_BYTES_STRING
            }
        }
      }
    ]
    });

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
  };

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box; 
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  const displayFaceBox = (box) => {
    console.log(box)
    this.setState({box: box})
  }


  const onInputChange = (event) => {
  // onInputChange = (event) => {
    this.setState({input: event.target.value})
  };

  const onButtonSubmit = () => {
  // onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})

    console.log('click')
    fetch(`https://api.clarifai.com/v2/users/${USER_ID}/apps/${APP_ID}/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`, requestOptions)
        // .then(response => response.json())
        .then(response => this.displayFaceBox(calculateFaceLocation(response)))
        .then(result => { console.log(result)})

        
          // const regions = result.outputs[0].data.regions;

          // regions.forEach(region => {
          //     // Accessing and rounding the bounding box values
          //     const boundingBox = region.region_info.bounding_box;
          //     const topRow = boundingBox.top_row.toFixed(3);
          //     const leftCol = boundingBox.left_col.toFixed(3);
          //     const bottomRow = boundingBox.bottom_row.toFixed(3);
          //     const rightCol = boundingBox.right_col.toFixed(3);

          //     region.data.concepts.forEach(concept => {
          //         // Accessing and rounding the concept value
          //         const name = concept.name;
          //         const value = concept.value.toFixed(4);

          //         console.log(`${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`);
                  
          //     });
          // });
        // })


        .catch(error => console.log('error', error));

  };



  // render() {
  return (
    <div className='App'>
      <ParticlesBg num={200} type="circle" bg={true} />
      <Navigation />
      <Logo />
      <Rank />
      {/* <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/> */}
      <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit}/>

      <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>

    </div>
  )



  // };

}

export default App
