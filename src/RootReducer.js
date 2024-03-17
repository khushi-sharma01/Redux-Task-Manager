const initialSatet={
    data:{},

}

export default function RootReducer(state=initialSatet,action){
    switch(action.type){
        case 'ADD_TASK':
            state.data[action.payload[0]]=action.payload[1]
            console.log(state.data);
            return {data:state.data}

            case 'EDIT_TASK':
                state.data[action.payload[0]]=action.payload[1]
                console.log(state.data);
                return {data:state.data}
                case 'DELETE_TASK':
                   delete state.data[action.payload[0]]
                    console.log(state.data);
                    return {data:state.data}
            default: 
            return {data:state.data}
    }
}