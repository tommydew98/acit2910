const initialState = {
    main :[],
    side :[],
    beverage:[]
}
export default function(state=initialState, action) {
    if(action.type === "GET_MENU_ITEMS") {
        switch(action.type) {
            case "POPULATE_ITEM":
                let newState = {...state}
                let main = [];
                let side = [];
                let beverage = [];
                action.payload.forEach(
                    (item) => {
                        item.quantity =1;
                        switch(item.category){
                            case 1 : 
                                main.push(item);
                                break;
                            case 2 :
                                side.push(item);
                                break;
                            case 3 :
                                beverage.push(item);
                                break;

                        }

                    }
                )

                newState.main = main;
                newState.side = side;
                newState.beverage = beverage;                
                return newState;


        }
    }

    return state;

}