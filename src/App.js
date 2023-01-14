import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineClose } from 'react-icons/ai';
import { AiFillEdit } from 'react-icons/ai';
import {AiTwotoneDelete} from 'react-icons/ai';
import {AiFillFileAdd} from 'react-icons/ai';
import {FaExchangeAlt} from 'react-icons/fa';
import {IoIosSave} from 'react-icons/io';
import './App.css';


function App() {

  const [superHeroes, setSuperHeroes] = useState([])
  const [currentSuperHeroe, setCurrentSuperHeroe] = useState({})
  const [editCurrentSuperHeroe, setEditCurrentSuperHeroe] = useState({})
  const [name, setName] = useState("");
  const [publisher, setPublisher] = useState("");
  const [alter_ego, setAlter_ego] = useState("");
  const [first_appearance, setFirst_appearance] = useState("");
  const [image, setImage] = useState("");
  const [characters, setCharacters] = useState("");


  const [closeSave, setCloseSave] = useState(null)

  const [closeSave2, setCloseSave2] = useState(null)
  const [closeSave3, setCloseSave3] = useState(null)



  const [showMessageDelete, setShowMessageDelete] = useState(false);
  const [showMessageEdit, setShowMessageEdit] = useState(false);
  const [showMessageNewSuperHero, setShowMessagNewSuperHero] = useState(false);

  const [refresh, setRefresh] = useState(false)


  useEffect(() => {
    const getSuperHeroes = async () => {
      const response = await axios.get("http://localhost:3003/super-heroes");
      setSuperHeroes(response.data)
      setRefresh(false);
    }
    getSuperHeroes();
  }, [refresh])


  const showSuperHeroe = async (id) => {   
    const response = await axios.get(`http://localhost:3003/super-heroes/${id}`)
    setCurrentSuperHeroe(response.data[0]);
    setCloseSave2(true)
  }


  const showSuperHeroeEdit = async (id) => {
    const response = await axios.get(`http://localhost:3003/super-heroes/${id}`)
    setEditCurrentSuperHeroe(response.data[0]);
    setCloseSave3(true)
  }


  const saveSuperHeroe = async () => {
    const payload = {
      name: name,
      publisher: publisher,
      alter_ego: alter_ego,
      first_appearance: first_appearance,
      image: image,
      characters: characters
    }
    const response = await axios.post("http://localhost:3003/super-heroes", payload)
    if (response.status === 201) {
      let newSuperHeroes = superHeroes;
      newSuperHeroes.push(response.data);
      setSuperHeroes(newSuperHeroes);
    }
  }


  const deleteSuperHeroe = async (id) => {
    const response = await axios.delete(`http://localhost:3003/super-heroes/${id}`)
    setCurrentSuperHeroe(response.data)
  }


  const editSuperHeroe = async (id) => {
    const data = { name: name, alter_ego: alter_ego, publisher: publisher };
    const response = await axios.patch(`http://localhost:3003/super-heroes/${id}`, data);
    setEditCurrentSuperHeroe((prev => ({ ...prev, name, alter_ego, publisher })))
    setRefresh(true);
  }




  const handleCloseClick = () => {
    setCloseSave(null);
  }

  const handleNewSuperHeroeClick = () => {
    setCloseSave(true);

  }

  const handleCurrentClick = () => {
    setCurrentSuperHeroe(!currentSuperHeroe);
  }


  const handleDeleteClick = () => {
    setCloseSave2(true);
  }

  const handleEditClick = () => {
    setCloseSave3(true);
  }



  const handleButtonCloseClick = () => {
    handleCurrentClick();
    setShowMessageDelete(false);
    setShowMessageEdit(false);
    setShowMessagNewSuperHero(false);
    setCloseSave2(null);
    setCloseSave3(null);
  };



  function toTop() {
    window.scrollTo(0, 0);
  }



  return (

    
    <div className='panel'>
      <>
      <div>
        <div className='newItem' style={{ display: closeSave ? 'block' : 'none' }}>

          {showMessageNewSuperHero && <h1>New element created!</h1>}
          <AiOutlineClose className="saveClose" onClick={handleCloseClick}/>
          <div className = "labelE-container">
          <p><span className = 'labelE'>Name :</span><input value={name} onChange={(e) => setName(e.target.value)} /></p>
          <p><span className = 'labelE'>Publisher:</span> <input value={publisher} onChange={(e) => setPublisher(e.target.value)} /></p>
          <p><span className = 'labelE'>Alter ego:</span> <input value={alter_ego} onChange={(e) => setAlter_ego(e.target.value)} /></p>
          <p><span className = 'labelE'>First appearace:</span> <input value={first_appearance} onChange={(e) => setFirst_appearance(e.target.value)} /></p>
          <p><span className = 'labelE'> Image:</span> <input value={image} onChange={(e) => setImage(e.target.value)} /></p>
          <p><span className = 'labelE'> characters:</span><input value={characters} onChange={(e) => setCharacters(e.target.value)} /></p>
          </div>
          <p> <IoIosSave className='button1' onClick={() => {
            saveSuperHeroe();
            setShowMessagNewSuperHero(true);
            setName("");
            setPublisher("");
            setAlter_ego("");
            setFirst_appearance("");
            setImage("");
            setCharacters("");
          }}/></p>
        </div>
      </div>

      <>
        <div className='newItem2' style={{ display: closeSave2 ? 'block' : 'none' }}>
         
              <div className='closeButton1'>
              <p>
                <AiOutlineClose className='button1' onClick={handleButtonCloseClick}/>  {/*aspa cierre*/}
                {currentSuperHeroe && handleDeleteClick && (
                  <AiTwotoneDelete className='button1' onClick={() => {
                    deleteSuperHeroe(currentSuperHeroe.id);
                    setShowMessageDelete(true);
                    setSuperHeroes(superHeroes.filter(sh => sh.id !== currentSuperHeroe.id));
                  }}
                    Delete Super Heroe
                  />
                )}
              </p>
              </div>
         
          {currentSuperHeroe && (
            <div>
              {showMessageDelete && <h1>Element deleted</h1>}
              <div className='totalGridCurrent'>
                <div className='gridCurrent'>
                  <p><span className = 'label'>Name :</span> <span className='value'>{currentSuperHeroe.name}</span></p>
                  <p><span className = 'label'>Publisher :</span><span className='value'>{currentSuperHeroe.publisher}</span></p>
                  <p><span className = 'label'>Alter ego :</span><span className='value'>{currentSuperHeroe.alter_ego}</span></p>
                  <p><span className = 'label'>first appearance:</span><span className='value'>{currentSuperHeroe.first_appearance}</span></p>
                  <p><span className = 'label'>characters :</span><span className='value'>{currentSuperHeroe.characters}</span></p>
                </div>
                <img className='gridCurrentImg' width='200' src={currentSuperHeroe.image} alt="" />
              </div>
         
            </div>
          )}
        </div>
      </>
      <>
        <div className='newItem3' style={{ display: closeSave3 ? 'block' : 'none' }}>

              <div className='closeButton2Edit'>
              <p>
                <AiOutlineClose className='button1' onClick={handleButtonCloseClick}/>  {/*aspa cierre*/}
                {editCurrentSuperHeroe && handleEditClick && (
                  <AiFillEdit className='button1' onClick={() => {
                    editSuperHeroe(editCurrentSuperHeroe.id);
                    setShowMessageEdit(true);
                    setName("");
                    setPublisher("");
                    setAlter_ego("");
                    setFirst_appearance("");
                    setImage("");
                    setCharacters("");
                  }} />  

                )}
              </p>
              </div>
          {editCurrentSuperHeroe && (
            <div>
              {showMessageEdit && <h1>Element edited</h1>}
              <div className='totalGridCurrent'>
                <div className='gridCurrent'>
                  <p><span className = 'label'>Name :</span> <span className='value'>{editCurrentSuperHeroe.name}</span> <FaExchangeAlt className='change'/><input type='text' value={name} onChange={(e) => setName(e.target.value)} /></p>
                  <p><span className = 'label'>Publisher :</span> <span className='value'>{editCurrentSuperHeroe.publisher}</span><FaExchangeAlt className='change'/><input type='text' value={publisher} onChange={(e) => setPublisher(e.target.value)} /></p>
                  <p><span className = 'label'>Alter Ego :</span> <span className='value'>{editCurrentSuperHeroe.alter_ego}</span><FaExchangeAlt className='change'/><input type='text' value={alter_ego} onChange={(e) => setAlter_ego(e.target.value)} /></p>
                  <p><span className = 'label'>first appearance:</span><span className='value'>{editCurrentSuperHeroe.first_appearance}</span></p>
                  <p><span className = 'label'>characters :</span><span className='value'>{editCurrentSuperHeroe.characters}</span></p>
                </div>
                <img className='gridCurrentImg' width='200' src={editCurrentSuperHeroe.image} alt="" />
              </div>
        
            </div>
          )}
        </div>
      </>
    
      <div className='SHPoll'>
      <h1>SUPERHEROES!</h1>
        <div className='items2'>
        <AiFillFileAdd onClick={() => { toTop (); handleNewSuperHeroeClick()}}/><h3>Add new Superhero</h3>
        </div>
        <div className="grid">
          {superHeroes.map((superHeroe) => (
            <div key={superHeroe.id}>         
              <p>{superHeroe.name}</p>
              <div className='items'>
              <AiTwotoneDelete onClick={() => { toTop(); showSuperHeroe(superHeroe.id) }}
                Delete Super Heroe
              />
                <AiFillEdit onClick={() => { toTop(); showSuperHeroeEdit(superHeroe.id) }}
                  Edit Super Heroe
                />
              </div>
              <img width='200' src={superHeroe.image} alt={superHeroe.name} />          
            </div>
          ))}
        </div>
      </div>
      </>
      </div>
   
  );
}

export default App;
