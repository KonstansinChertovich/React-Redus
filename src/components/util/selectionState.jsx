import Spinner from "../Spinner/Spinner"
import ErrorMessage from "../errorMessage/ErrorMessage"
import Skeleton from "../skeleton/Skeleton"

const selectionState = (state, Component, data, firstLoading = true) => {
    switch (state) {
        case 'inaction':
            return <Spinner/>
        case 'waiting':
            return <Skeleton/>
        case 'loaded': 
            return firstLoading ? <Spinner/> : <Component data={data}/>
        case 'success':
            return <Component data={data}/>
        case 'error':
            return <ErrorMessage/>
        default:
            return <ErrorMessage/>
    }
}

export default selectionState