import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBlog} from "@fortawesome/free-solid-svg-icons";

export const Logo = () => {
    return (
        <div className="text-3xl text-center py-4 font-heading">
            BlogApp
            <FontAwesomeIcon icon={faBlog} className="text-2xl text-slate-400 ml-1"/>
        </div>
    )
}
