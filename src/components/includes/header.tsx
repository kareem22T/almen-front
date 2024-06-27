import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import logo from './../../images/logo.png';
import menuIcon from "./../../images/Menu.png"
import searchIcon from "./../../images/Menu(3).png"
import { setLanguage } from '../../features/settingSlice';
import { Link } from 'react-router-dom';
import { getCategories } from '../../features/categorySlice';
import { FormEvent, useEffect, useState } from 'react';
import { translate } from '../../utils/methods';
import { searchEvents } from '../../features/eventSlice';

const Header = () => {
    const lang = useSelector((state: RootState) => state.settings.lang);
    const dispatch = useDispatch<AppDispatch>();
    const categories = useSelector((state: RootState) => state.categories.categories);  
    const [openMore, setOpentMore] = useState<boolean>(false)
    const [showSearch, setShowSearch] = useState<boolean>(false)
    const [search, setSearch] = useState<string>("")
    const handleSearchChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target?.value)
    }
    const handleSetLang = () => {
        dispatch(setLanguage(lang == 'en' ? "ar" : "en"));
    }

    const results = useSelector((state: RootState) => state.events.searchResults);  

    useEffect(() => {
        dispatch(getCategories());        
        dispatch(searchEvents(search));        
    }, [dispatch]);
    
    useEffect(() => {
        dispatch(searchEvents(search));        
    }, [search])

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
                    <button onClick={() => setShowSearch(!showSearch)} style={{cursor: "pointer"}}>
                        <img src={searchIcon} alt="bars icon" />
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
            {
                showSearch && (                    
                <div className="search_wrapper">
                    <form action='/search'>
                        <input type="text" name="search" id="" autoComplete='off' placeholder={translate(lang, "ابحث عن الفاعاليات ...", 'Search events...')} value={search} onChange={handleSearchChange}/>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path opacity="0.4" d="M21.0004 20.9999L16.6504 16.6499" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <button type='submit' className='search'>
                            {translate(lang, 'بحث', 'Search')}
                        </button>
                        <button onClick={() => setShowSearch(false)}>
                            {translate(lang, 'ألغاء', 'Cancel')}
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 5.61714L18.3829 4L12 10.3829L5.61714 4L4 5.61714L10.3829 12L4 18.3829L5.61714 20L12 13.6171L18.3829 20L20 18.3829L13.6171 12L20 5.61714Z" fill="white"/>
                            </svg>
                        </button>
                    </form>
                    <div className="suggestion">
                        {
                            (results && search) && (
                                results.map(eve => (
                                    <a href={"/event/" + eve.id}>
                                        {translate(lang, eve.title_ar, eve.title)}
                                    </a>
                                ))
                            )
                        }
                    </div>
                </div>
                )
            }
        </header>
    )
}

export default Header;