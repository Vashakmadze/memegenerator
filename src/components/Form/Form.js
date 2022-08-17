import React from 'react';
import PropTypes from 'prop-types';
import './Form.css';
import downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';

const Form = function() {
  
  // react state for meme
  const [meme, setMeme] = React.useState({
    top: "",
    bottom: "",
    randomImage: "http://i.imgflip.com/1bij.jpg" 
  })

  // react state for collection of memes fetched from api
  const [allMemes, setAllMemes] = React.useState([])
  
  // hook for fetching memes from api loading only once
  React.useEffect(() => {
    async function getMemes() {
        const res = await fetch("https://api.imgflip.com/get_memes")
        const data = await res.json()
        setAllMemes(data.data.memes)
    }
    getMemes()
  }, [])
  

  // function to handle the state using onChange and state
  function handleChange(event) {
    const {name, value} = event.target
    setMeme(prevMeme => ({
        ...prevMeme,
        [name]: value
    }))
  }


  // function to get random meme image from meme collection
  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length)
    const url = allMemes[randomNumber].url
    setMeme(prevMeme => ({
        ...prevMeme,
        randomImage: url
    }))
  }

  //handling downloading images
  const printRef = React.useRef();

  const handleDownloadImage = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element,  { logging: true, letterRendering: 1, allowTaint: false, useCORS: true })

    const data = canvas.toDataURL('image/jpg');
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
      link.href = data;
      link.download = 'image.jpg';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };
  
  return (
    <div className="Form">
      <div className='formElement'> 
        <div className='topDiv'>
          <input classname="topInput" type="text" id="top" name="top" placeholder='Top Text' value={meme.topText} onChange={handleChange}/>
          <input className='bottomInput' type="text" id="bottom" name="bottom" placeholder='Bottom Text' value={meme.bottomText} onChange={handleChange}/>
        </div>
        <div className="bottomDiv">
          <button onClick={getMemeImage}> Get a meme image 🖼</button>
        </div>
        <div ref={printRef} className="meme">
          <img src={meme.randomImage} className="meme--image" />
          <h2 className="meme--text top">{meme.top}</h2>
          <h2 className="meme--text bottom">{meme.bottom}</h2>
        </div>
        <button className="meme--download" type="button" onClick={handleDownloadImage}> Download Meme Image</button>
      </div>
    </div>
  );
} 

Form.propTypes = {};

Form.defaultProps = {};

export default Form;
