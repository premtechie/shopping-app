import * as actionTypes from './actions';
import data from '../Axios/data'
import { bagWishlistClear } from '../ActionCreator/ProductActions';

const initialState={
    open:false,
    productDetails:{
    },
    wishList:[],
    bag:[],
    logged:false

}


const reducer=(state=initialState,action)=>{
    switch(action.type){
        case 'OPEN':
            return{
                ...state,
                open:!state.open
            }
        case actionTypes.CREATE_PRODUCT:
            return createProduct(state,action);
        case actionTypes.INCREMENT_ITEM :
            return increamentProduct(state,action);
        
        case actionTypes.DECREMENT_ITEM:
            return decrementProduct(state,action)
        
        case actionTypes.SELECT_SIZE:
            return selectProductSize(state,action) 
        case actionTypes.ADD_TO_WISHLIST:
            return wishListProduct(state,action)
        case actionTypes.DEL_ITEM:
            return deleteItem(state,action)    
        case actionTypes.ADD_TO_BAG:
            return bagProduct(state,action)
        case actionTypes.REMOVE_ITEM:
            return removeItem(state,action)
        case actionTypes.ADD_WISHLIST_TO_BAG:
            return addWishlistToBag(state,action)
        case actionTypes.SIGN_IN_HANDLER:
            return signUpHandler(state,action)
        case actionTypes.BAG_WISHLIST_CLEAR:
            return bagWishListHandler(state,action)
        default:
            return state
    } 
    
}

const increamentProduct = (state,action) => {
    let productDetails = {
        ...state.productDetails
    };
    const productId = action.payload;
    let product = productDetails[productId];
    product.count += 1;
    return {
        ...state,
        productDetails
    }
}

const selectProductSize = (state,action) => {
    let productDetails = {
        ...state.productDetails
    };
    const productId=action.payload.id;
    let product = productDetails[productId]
    product.size=action.payload.size
    return {
        ...state,
        productDetails
    }
    // console.log(productId,'[reducer size]')

}

const decrementProduct=(state,action)=>{
    let productDetails={
        ...state.productDetails
    }
    const productId=action.payload;
    let product=productDetails[productId];
    product.count -=1;
    return {
        ...state,
        productDetails
    }

}


const createProduct=(state,action)=>{
    let productDetails=state.productDetails
    let payload = action.payload;
    console.log('ACTION PAYLOAD : ',productDetails,payload);
    return {
        ...state,
        productDetails : {
            [payload] : {
                count : 1,
                size : ''
            }
        }
    }
}

function wishListProduct(state,action){
    const newProduct=action.payload.product;
    const existingUser=state.wishList
    const prod=existingUser.some(user=>user.id===newProduct.id)
    const fetchedProduct=action.payload.existingProduct
    const fetched=[]
    // useEffect(()=>{
    //     data.get('/wishlist.json').then(response=>{
    //         fetched.push(response.data)
    //     })
    // })
    // data.get('/wishlist.json').then(response=>{
    //         fetched.push(response.data)
    // })
    // const prod=fetched.some(user=>user.id===newProduct.id)
    if(!newProduct.size){
        alert('Please Select Size')
    }
    else{
        if(!prod){
        //    data.post('/wishlist.json',newProduct).then(response=>{
        //        alert('sent to wishlist')
        //    })
           existingUser.push(newProduct)
           alert('product Sent')
        }
        else{
            alert('alredy WishListed')
        }
    }
    console.log('[wishList Product] : ',prod,fetched)
    return {
        ...state,
        wishlist:existingUser
    }
}
const bagProduct=(state,action)=>{
    let existingUser=state.bag
    const newProduct=action.payload.data;
    
    const prod=existingUser.some(user=>user.id===newProduct.id)

    if(!newProduct.size){
        alert('Please Select Size')
    }
    else{
        if(!prod){
            existingUser.push(newProduct)
        alert('Product Successfully Sent')

        }
        else{
            alert('alredy Bagged')
        }
    }
    console.log('[bag Product] : ',state.wishList)
    return {
        ...state,
        bag:existingUser
    }

}




const deleteItem=(state,action)=>{
    let newItem=action.payload.data
    let existingItem=state.wishList.filter(item=>item.id!==newItem.id);
    console.log('RemoveItem',state.WishList)
    
    return {
        ...state,
        wishList:existingItem
    }
}
const removeItem=(state,action)=>{
    let newItem=action.payload.data
    let existingItem=state.bag.filter(item=>item.id!==newItem.id);
    console.log('RemoveItem',state.bag)
    
    return {
        ...state,
        bag:existingItem
    }
}

const addWishlistToBag=(state,action)=>{
    let newItem=action.payload.data
    let existingItem=state.wishList.filter(item=>item.id!==newItem.id);
    console.log('Item',state.WishList)
    console.log('ItemBagged',state.bag)
    let bagProduct=state.bag
    const newProduct=action.payload.data;
    
    const prod=bagProduct.some(user=>user.id===newProduct.id)
    if(!prod){
        bagProduct.push(newItem)
    }
    else{
        alert('already Bagged !')
    }

    return {
        ...state,
        wishList:existingItem,
        bag:bagProduct
    }
}

const signUpHandler=(state,action)=>{
    console.log('works fine : ', state.logged)
    return{
        ...state,
        logged:true
    }
}

const bagWishListHandler=(state,action)=>{
    return {
        ...state,
        wishlist:[],
        bag:[]
    }
}


export default reducer;