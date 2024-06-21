import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import logo from './../../images/logo.png';
import menuIcon from "./../../images/Menu.png"
import { setLanguage } from '../../features/settingSlice';

const Header = () => {
    const lang = useSelector((state: RootState) => state.settings.lang);
    const dispatch = useDispatch<AppDispatch>();

    const handleSetLang = () => {
        dispatch(setLanguage(lang == 'en' ? "ar" : "en"));
    }
    return (
        <header dir={lang == 'en' ? "ltr" : "rtl"}>
            <div className="container">
                <img src={logo} alt="logo" />
                <div className="options">
                    <button className='lang_btn' onClick={handleSetLang}>
                        {lang == 'en' ? "عربي" : "English"}
                    </button>
                    {/* <button>
                        <img src={menuIcon} alt="bars icon" />
                    </button> */}
                </div>
            </div>
        </header>
    )
}

export default Header;