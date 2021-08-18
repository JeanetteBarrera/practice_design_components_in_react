
import { useState, useEffect } from "react";

//un objeto con tres propiedades que representan nuestro estados
export const REQUEST_STATUS = { //carga, exito, falla
    LOADING: "loading", 
    SUCCESS: "success",
    FAILURE: "failure"
}

//agregamos initialData
function useRequestDelay(delayTime = 1000, initialData=[] ) {

    /*REEMPLAZADOS POR EL OBJETO REQUEST_STATUS, QUE SE ENCARGARA
    const [ isLoading, setIsLoading ] = useState(true); //se encarga de mostrar loading de tiempo definido hasta que devuelvan los datos del servidor
    const [ hasErrored, setHasErrored ] = useState(false); //en una instancia inicial no hay errores
    */
    const [ data, setData] = useState(initialData);
    const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
    const [ error, setError ] = useState(""); //es lo que hara en el caso de haber uno
    
    const delay = (ms) => new Promise((resolve)=> setTimeout(resolve, ms));

    useEffect(() => {
        async function delayFunc() {
          try{ 
            await delay(delayTime);
            setRequestStatus(REQUEST_STATUS_SUCCESS);// ---> setIsLoading(false);
            setData(data);
          } catch(e){  //en el caso de haber un error cambian los siguientes estados
              /*setIsLoading(false);
              setHasErrored(true);*/
              setRequestStatus(REQUEST_STATUS_SUCCESS);
              setError(e);
          }
            
        }
        delayFunc();

    }, []);
    
    function updateRecord(record, doneCallback) {
        const originRecords = [...data]; //guardamos una copia de los datos antes de ser actuaizados

        const newRecords = data.map(function (rec) {
            return rec.id === recordUpdated.id ? recordUpdated : rec;
        });

        async function delayFunction(){
            try{
                setData(newRecords);
                await delay(delayTime);
                if(doneCallback){
                    doneCallback();
                }
                
            } catch (error) {
                console.log("error throw inside delayFunction", error);
                if(doneCallback) {
                    doneCallback()
                }
                setData(originRecords)
            }
            
        }
        delayFunction();
    }
    function insertRecord(record, doneCallback) {
        const originRecords = [...data]; //guardamos una copia de los datos antes de ser actuaizados

        const newRecords = [record, ...data];

        async function delayFunction(){
            try{
                setData(newRecords);
                await delay(delayTime);
                if(doneCallback){
                    doneCallback();
                }
                
            } catch (error) {
                console.log("error throw inside delayFunction", error);
                if(doneCallback) {
                    doneCallback()
                }
                setData(originRecords)
            }
            
        }
        delayFunction();
    }
    function deleteRecord(record, doneCallback) {
        const originRecords = [...data]; //guardamos una copia de los datos antes de ser actuaizados

        const newRecords = data.filter( function (rec) {
            return rec.id != record.id;
        })

        async function delayFunction(){
            try{
                setData(newRecords);
                await delay(delayTime);
                if(doneCallback){
                    doneCallback();
                }
                
            } catch (error) {
                console.log("error throw inside delayFunction", error);
                if(doneCallback) {
                    doneCallback()
                }
                setData(originRecords)
            }
            
        }
        delayFunction();
    }

    return {
        data,
        //speakersData, 
        requestStatus,
        /*isLoading, 
        hasErrored,*/
        error,
        updateRecord,
        insertRecord,
        deleteRecord
        //onFavoriteToggle
    }
}
export default useRequestDelay;