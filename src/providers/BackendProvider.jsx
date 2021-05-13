import React from 'react';
import axios from "axios";


export const BackendContext = React.createContext();

export default function BackendProvider (props){

  

    
    const apiCall=async (path, method, data)=>{
        let config;
        if (!method) throw new Error("Error when calling apiCall(path, method, data): parameter method must not be null");
        let url=props.backend+path;
        method=method.toLowerCase();
        if (method==="get") {
            config={method, url, params:data}
        }
        else {
            config={method, url, data:data}
        }
        return axios(config).then(res=>{
          if (res.data) return res.data;
          return res;
        });
    }


      return (
        <BackendContext.Provider value={{apiCall, backend:props.backend}}>
            {props.children}
        </BackendContext.Provider>

      );
    
}

export function useBackend(){
  const context= React.useContext(BackendContext);
  return context;
}