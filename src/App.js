import logo from './logo.svg';
import './App.css';
import {useState} from "react";
import config from "./config.js";

// JavaScript XML (JSX)
function App() {

  const [imageUrl, setImageUrl] = useState(null)

  const generateImage = async (inputPrompt) => {
    const response = await fetch ('https://api.openai.com/v1/images/generations', {
      method: 'Post',
      headers: {
        "Authorization": `Bearer ${config.API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "prompt": `${inputPrompt}`,
        "n": 1,
        "size": "1024x1024"
      })
    })

    const data = await response.json();

    return data.data[0].url
  }

  const handleBlurChange = async (evt) => {
    setImageUrl('https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif')

    const inputPrompt = evt.target.value;

    // 2a. on the blur event, call the image generate API
    const imageUrlFromApi = await generateImage(inputPrompt);

    // 2b. show the image in the browser
    setImageUrl(imageUrlFromApi);
  }

  return (
      <div className="App">
        <input type="text" placeholder="Enter prompt... e.g African civil leader"
               className="mb-3 p-3 w-full border-2 border-gray"
               id="prompt"
               onBlur={handleBlurChange}
        />

        <div className="p-8 bg-red-300 border-2 rounded-lg"
             id="show-image">
          {
            imageUrl
                ? <img src={imageUrl} alt=""/>
                : "Type something to get started..."
          }

        </div>
      </div>
  );
}

export default App;
