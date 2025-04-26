// import { Component } from 'react'
// import React, { useState, useEffect } from 'react'
import React, { useState } from 'react'

import ParticlesBg from 'particles-bg'
import './App.css'
import Navigation from './components/Navigation/Navigation'
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'
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
  // constructor() {
  //   super();
  //   this.state = {
  //     input: '',
  //     imageUrl: '',
  //     box: {},
  //     route: 'signin',
  //     isSignedIn: 'false'
  //   }
  // };


  // useEffect(()=> {
  //   fetch("http://localhost:3000/")
  //   .then(response => response.json())
  //   .then(console.log)
  // }, []); // Empty dependency array ensures it runs only once, just like componentDidMount in a class.


  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [box, setBox] = useState({});
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false); //
  const [user,setUser] = useState({
                                  id: '',
                                  name: '',
                                  email: '',
                                  entries: 0,
                                  joined: ''
                                  });

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
      })
  }

  const USER_ID = 'r0823712';
  const PAT = '981d191d4235450e89c44735b9d79ea6';
  const APP_ID = 'face-detection';
  const MODEL_ID = 'face-detection';
  const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
  // const IMAGE_URL = 'https://www.lumierebeautyclinic.com.au/wp-content/uploads/2023/05/what-makes-a-face-attractive-Lumiere-Beauty-Clinic-scaled.jpg';

 
  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box; 
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    // console.log(width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  const displayFaceBox = (box) => {
    // console.log(box)
    // this.setState({box: box})
    setBox(box);
  }


  const onInputChange = (event) => {
  // onInputChange = (event) => {
    // this.setState({input: event.target.value})
    setInput(event.target.value);
  };

  const onButtonSubmit = () => {
  // onButtonSubmit = () => {
    // this.setState({imageUrl: this.state.input})
    setImageUrl(input); // not setImageUrl(imageUrl) because imageUrl is not defined yet

    // console.log('click')

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
                  "url": input,
                  // "base64": IMAGE_BYTES_STRING
              }
          }
        }
      ],

      });
  
    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
    };
  
    fetch(`https://api.clarifai.com/v2/users/${USER_ID}/apps/${APP_ID}/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`, requestOptions)
        .then(response => response.json())
        .then((data) => {
          if(data) {
            // console.log('API response',data)
            const fateLocation = calculateFaceLocation(data);
            // console.log('faceLocation', fateLocation);
            displayFaceBox(fateLocation);

            return fetch('http://localhost:3000/image', {
              method:'put',
              headers: {'Content-Type':'application/json'},
              body: JSON.stringify({
                id: user.id
              })
            })
            .then(responseI => responseI.json())
            .then(count => {
              // setUser({user, data:{entries: count}})
                // We will just update the entries, it is not good
                // Cause we need to sure the user still the same


              // setUser(Object.assign(user, {entries:count}))
              // Object.assign => Modifies the target object and returns it
                // React's setUser() thinks the user object is the same because the reference didn’t change.
                // React doesn’t know it needs to re-render immediately.


              setUser(user => ({
                ...user,
                entries: count
              }))
              // ...user copies everything in the old user.
              // Then { entries: count } overwrites the entries field.
              // You create a new object → React sees the change → browser updates immediately
                
            })

          }



        })
        // .catch(error => console.log('error',error))

        // .then(data => displayFaceBox(calculateFaceLocation(data)))
        
        
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

  const onRouteChange = (route) => {
    if (route === 'signout') {
      // this.setState({isSignedIn: false})
      setRoute(setIsSignedIn(false))
    } else if (route === 'home') {
      // this.setState({isSignedIn: true})
      setRoute(setIsSignedIn(true))

    }
    // this.setState({。。route: route});
    setRoute(route)

  }

  // render() {
  // const { isSignedIn, imageUrl, box, route} = this.state;

  return (
    <div className='App'>
      <ParticlesBg num={200} type="circle" bg={true} />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange}/>
      {route === 'home'
      ? <div>
          <Logo />
          <Rank name={user.name} entries={user.entries}/>
          {/* <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/> */}
          <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit}/>
          <FaceRecognition box={box} imageUrl={imageUrl}/>
        </div>
      : (
        route === 'signin'
        ? <Signin loadUser={loadUser} onRouteChange={onRouteChange}/>
        : <Register loadUser={loadUser} onRouteChange={onRouteChange}/>
        // : <Register onRouteChange={onRouteChange}/>



      )
      
      }
    </div>
    
  )


  // };

}

export default App
