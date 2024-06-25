import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import logo from './../../images/logo.png';
import menuIcon from "./../../images/Menu.png"
import { setLanguage } from '../../features/settingSlice';
import { Link } from 'react-router-dom';
import { getCategories } from '../../features/categorySlice';
import { useEffect, useState } from 'react';
import { translate } from '../../utils/methods';

const Header = () => {
    const lang = useSelector((state: RootState) => state.settings.lang);
    const dispatch = useDispatch<AppDispatch>();
    const categories = useSelector((state: RootState) => state.categories.categories);  
    const [openMore, setOpentMore] = useState<boolean>(false)
    const handleSetLang = () => {
        dispatch(setLanguage(lang == 'en' ? "ar" : "en"));
    }
    useEffect(() => {
        dispatch(getCategories());        
      }, [dispatch]);

    return (
        <header dir={lang == 'en' ? "ltr" : "rtl"}>
            <div className="container">
                <a href={"/"}>
                    <img src={logo} alt="logo" />
                </a>
                <div className="options">
                    <button className='lang_btn' onClick={handleSetLang}>
                        {lang == 'en' ? "عربي" : "English"}
                    </button>
                    <button onClick={() => setOpentMore(!openMore)} style={{cursor: "pointer"}}>
                        <img src={menuIcon} alt="bars icon" />
                        <ul className={"more " + (openMore ? "open" : "")}>
                            {
                                categories && (
                                        categories.map((cat, index) => (
                                            <li>
                                                <a href={"/categories/" + cat.id}>
                                                    {translate(lang, cat.title_ar as string, cat.title as string)}
                                                </a>
                                            </li>
                                        )
                                    )
                                )
                            }
                        </ul>
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header;