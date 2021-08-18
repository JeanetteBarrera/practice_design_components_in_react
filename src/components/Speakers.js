import SpeakersList from "./SpeakersList";
import SpeakersToolbar from "./SpeakersToolbar";
import {SpeakerFilterProvider} from "../contexts/SpeakerFilterContext"


function Speakers() {
    
    return(
        <SpeakerFilterProvider startingShowSessions={false}>
            <SpeakersToolbar />
            <SpeakersList /> 
        </SpeakerFilterProvider>
    )
}
export default Speakers;