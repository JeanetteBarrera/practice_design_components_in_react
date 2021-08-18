import {useContext} from "./react";
import Speaker from "./Speaker";
import useRequestDelay,{REQUEST_STATUS} from '../hooks/useRequestDelay'
import ReactPlaceHolder from "react-placeholder";
import data from "../../SpeakerData"
import {SpeakerFilterContext} from "../contexts/SpeakerFilterContext";
import SpeakerAdd from "./SpeakerAdd";

function SpeakersList(){
 
    const {
        data: speakersData,
        requestStatus,
        /*isLoading, 
        hasErrored, */
        error, 
        updateRecord,
        insertRecord,
        deleteRecord
    } = useRequestDelay(2000, data);

    const {searchQuery, eventYear} = useContext(SpeakerFilterContext);
    
    //if(hasErrored === true){ // esto se mostrara en casos de un error en la carga 
    if(requestStatus === REQUEST_STATUS.FAILURE){ 
        return(
            <div className="text-danger">
                ERROR: <b>loading Speaker Data Failed {error}</b>
            </div>
        )
    }

    //if(isLoading === true) return <div>Loading...</div>
    return(
        <div className="container speakers-list">
            <ReactPlaceHolder
                type="media"
                rows={15}
                className="speakerslist-placeholder"
                ready={requestStatus === REQUEST_STATUS.SUCCESS}
                //ready={isLoading === false}
            >
                <SpeakerAdd eventYear={eventYear} insertRecord={insertRecord} />

                <div className="row">
                    {speakersData
                    .filter( function (speaker) {
                        return(
                            speaker.first.toLowerCase().includes(searchQuery) ||
                            speaker.last.toLowerCase().includes(searchQuery)
                        )
                    })
                    .filter(function (speaker) {
                        return speaker.sessions.find((session) => {
                            return session.eventYear === eventYear;
                        })
                    })
                    .map(function(speaker){    
                        return(
                            <Speaker 
                                key={speaker.id} 
                                speaker={speaker} 
                                updateRecord={updateRecord}
                                insertRecord={insertRecord}
                                deleteRecord={deleteRecord}
                            />
                        );
                    })}
                </div>
            </ReactPlaceHolder>
        </div>
    );
}
export default SpeakersList;