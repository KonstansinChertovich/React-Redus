import { Link } from "react-router-dom"
import ErrorMessage from "../errorMessage/ErrorMessage"

const Http404 = () => {
    return(
        <>
            <ErrorMessage/>
            <div style={{"marginTop":"30px","textAlign":"center"}}>
                <p style={{"fontSize":"150px","fontWeight":"bold"}}>404</p>
                <p>this page does not exist</p>
                <Link to="/" style={{"marginTop":"20px","fontSize":"20px","fontWeight":"bold"}}>
                    To home
                </Link>
            </div>
        </>
    )
}

export default Http404