
const INITIAL_STATE={
    surat:"",
    dark:"",
    inputsearch:true
}

export default (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'TYPE': 
            return {...state,surat:action.payload}
        case 'MODE':
            return {...state,dark:action.payload}
        case 'SEARCH':
            return {...state,inputsearch:true}
        case 'CLEAR': 
            return {...state,surat:"",inputsearch:false}
        default:
            return state
    }
}