import "./style.css";
import lupa from "../../assets/images/icons/filtro.png"


export function NavbarBagagem(){
    return(
        <div className="navbarBagagem">
            <div className="navMala"></div>
            <div className="navMenu">
                <img src={lupa} alt="" />
                <input type="text" />
            </div>
        </div>
    )
}