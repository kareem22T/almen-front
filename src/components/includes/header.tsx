import logo from './../../images/logo.png';
import menuIcon from "./../../images/Menu.png"

const Header = () => {
    return (
        <header>
            <div className="container">
                <img src={logo} alt="logo" />
                <div className="options">
                    <button className='lang_btn'>عربي</button>
                    <button>
                        <img src={menuIcon} alt="bars icon" />
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header;