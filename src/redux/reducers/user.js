
import { REGISTER_SUCCESS,LOGIN_SUCCESS,INIT_SUCCESS, LOGOUT, BUYER_SUCCESS, SUPPLIER_SUCCESS } from "../types";

const initialState = {
	register_success: '',
	login_success: '',
	user_id: '',
	buyer_id: '',
	supplier_id: ''
}

const user = (state = initialState, action) => {
	switch (action.type) {
		case REGISTER_SUCCESS:
			return {
				...state,
				user_id: action.payload,
				register_success: "success"
			}
		case INIT_SUCCESS:
			return {
				...state,
				register_success: '',
				login_success: '',

			}
		case LOGIN_SUCCESS:
			return {
				...state,
				user_id: action.payload,
				login_success: "success",
			}

		case BUYER_SUCCESS: 
			return	{
				...state,
				buyer_id: action.payload
			}

		case SUPPLIER_SUCCESS: 
			return	{
				...state,
				supplier_id: action.payload
			}

		case LOGOUT:
			return initialState;
		default: {
			return state;
		}
	}
}

export default user;



