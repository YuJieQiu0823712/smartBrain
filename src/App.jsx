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


const App = () => {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [box, setBox] = useState({});
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false); 
  const [user,setUser] = useState({
                                  id: '',
                                  name: '',
                                  email: '',
                                  entries: 0,
                                  joined: ''
                                  });

  const initialState = () => {
    setInput(''),
    setImageUrl(''),
    setBox({}),
    setRoute('signin'),
    setIsSignedIn(false),
    setUser({
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    })
  }

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
      })
  }

  
   const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box; 
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  const displayFaceBox = (box) => {
    setBox(box);
  }


  const onInputChange = (event) => {
    setInput(event.target.value);
  };


  const onButtonSubmit = () => {
    setImageUrl(input); // not setImageUrl(imageUrl) because imageUrl is not defined yet

    fetch('http://localhost:3000/imageurl', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: input // Send the image URL to the backend
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data) {
        const faceLocation = calculateFaceLocation(data);
        displayFaceBox(faceLocation);

        return fetch('http://localhost:3000/image', {
          method:'put',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
            id: user.id
          })
        })
        .then(responseI => responseI.json())
        .then(count => {
          setUser( user => ({
            ...user,
            entries: count
          }))
        })
        .catch(console.log)
        
      }
    })
    .catch(err => console.log('error', err))

  };




  const onRouteChange = (route) => {
    if (route === 'signout') {
      initialState()
    } else if (route === 'home') {
      setRoute(setIsSignedIn(true))
    }
    setRoute(route)
  }

  return (
    <div className='App'>
      <ParticlesBg num={200} type="circle" bg={true} />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange}/>
      {route === 'home'
      ? <div>
          <Logo />
          <Rank name={user.name} entries={user.entries}/>
          <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit}/>
          <FaceRecognition box={box} imageUrl={imageUrl}/>
        </div>
      : (
        route === 'signin'
        ? <Signin loadUser={loadUser} onRouteChange={onRouteChange}/>
        : <Register loadUser={loadUser} onRouteChange={onRouteChange}/>
      )
      }
    </div>
  )
}

export default App
