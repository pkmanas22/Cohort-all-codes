import { Link } from "react-router-dom"

export default function BottomWarning ({ text, linkText, path}) {
    return(
        <div className="text-center font-medium">
            {text} 
            <Link className="ml-2 underline cursor-pointer hover:text-green-900" to={path}>
                {linkText}
            </Link> 
        </div>
    )
}