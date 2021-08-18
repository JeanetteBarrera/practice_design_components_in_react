import React, {useState, useContext} from "react";
import { SpeakerFilterContext } from "../contexts/SpeakerFilterContext";
import {SpeakerProvider ,SpeakerContext} from "../contexts/SpeakerContext";
import SpeakerDelete from "SpeakerDelete";

// 1er componente de sesion
function Session({title, room}) {
  return(
    <span className="session w-100">
      {title} <strong>Room: {room.name}</strong>
    </span>
  )
}

//2do componente encargado de las sesiones y dentro consume el componente sesion
function Sessions() {

  const {eventYear} = useContext(SpeakerFilterContext);
  const {speaker} = useContext(SpeakerContext);
  const sessions = speaker.sessions;

  return(
    <div className="sessionBox card h-250">
      {sessions
        .filter(function (session) {
          return session.eventYear === eventYear;
        })
        .map(function (session){
          return(
            <div className="session w-100" key={session.id}>
              <Session {...session}/> 
            </div>
          )
        })
      }

    </div>
  )
}

//3er componente, imagen del speaker
function SpeakerImage() {
  const {speaker: {id, first, last,}} = useContext(SpeakerContext)

  return(
    <div className="speaker-img d-flex flex-row justify-content-center align-items-center h-300">
        <img 
          className="contain-fit"
          scr={`/images/speaker-${id}.jpg`}
          width="300"
          alt={`${first} ${last}`}
        />
    </div>
  )
}
//agregando componente de favoritos
function SpeakerFavorite() {
  
  const {speaker, updateRecord} = useContext(SpeakerContext)
  //Agregado despues
  const [isTransmition, setTransmition] = useState(false);
  //intentamos arreglar el retardo de actualizacion de  este vcomponenente

  function doneCallback() {
    setTransmition(false)
    console.log(`In SperakerFavorite: doneCallback ${new Date().getMilliseconds()}`)
  }

  return(
    <div className="action padB1">
      <span
        onClick={function() {
          setTransmition(true)
          updateRecord(
            {
              ...speaker, favorite: !speaker.favorite
            }, doneCallback
          )
        }}
      >
        <i className={
          speaker.favorite === true ? 
            "fa fa-star orange" : "fa fa-star-o orange"
        }
        />{" "}
        Favorite{" "}
        {isTransmition === true ? (
          <span className="fas fa-circle-notch fa-spin"></span>
        ) :null }
      </span>
    </div>
  );
}

//4to componente, informacion del speaker

function SpeakerDemographics() {
  
  const {speaker} = useContext(SpeakerContext);
  const {first, last, bio, company, twitterHandle, favorite} = speaker;
  return(
    <div className="speaker-info">
      <div className="d-flex justify-content-between mb-3">
        <h3 className="text-truncate w-200">
          {first} {last}
        </h3>
      </div>
      <SpeakerFavorite />
      <div>
        <p className="card-description">{bio} </p>
        <div className="social d-flex flex-row mt-4">
          <div className="company">
            <h5>Company</h5>
            <h6>{company}</h6>
          </div>
          <div className="twitter">
            <h5>Twitter</h5>
            <h6>{twitterHandle}</h6>
          </div>

        </div>
      </div>
    </div>
  )
}

//5to componente, un speaker completo
function Speaker({speaker, updateRecord, insertRecord, deleteRecord}) {
  
  const {showSessions} = useContext(SpeakerFilterContext);
  
  return(
    <SpeakerProvider 
      speaker={speaker} 
      updateRecord={updateRecord}
      insertRecord={insertRecord}
      deleteRecord={deleteRecord}
    >
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-sm-12 col-xs-12">
        <div className="card card-height p-4 mt-4">
          <SpeakerImage />
          <SpeakerDemographics />
        </div>
        {showSessions === true ? <Sessions /> : null}
        <SpeakerDelete />
      </div>

    </SpeakerProvider>
  )
}

export default Speaker;