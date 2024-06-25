import { Link, useParams } from "react-router-dom";
import DefaultLayout from "../../layout/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useEffect, useState } from "react";
import { getLocation } from "../../features/locationSlice";
import { API_URL } from "../../_env";
import { translate } from "../../utils/methods";
import category1 from "./../../../images/food-icon.png"
import cover_path from "./../../images/745836b2fac0a1798d83fa90759320b5.jpeg"
import serviceIcon from "./../../images/services_icon.png"
import "./style.css"
import { getCategories } from "../../features/categorySlice";
import { getServices } from "../../features/serviceSlice";

const Category = () => {
    const {id} = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const categories = useSelector((state: RootState) => state.categories.categories);  
    const services = useSelector((state: RootState) => state.services.services);  
    const lang = useSelector((state: RootState) => state.settings.lang);

    const [selectedCategory, setSelectedCategory] = useState(-1)

    useEffect(() => {
        dispatch(getCategories());        
        dispatch(getServices());        
      }, [dispatch]);
    useEffect(() => {
        if (id)
            setSelectedCategory(parseInt(id))
        document.body.classList.add("location-view");

        return () => {
            document.body.classList.remove("location-view");
        };
    }, []);
    return (
        <DefaultLayout>
            <section className="cover">
                <img src={cover_path} alt="" />
                <div className="container">
                    <p>
                        <span>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.293 4.70697L14.586 12L7.293 19.293L8.707 20.707L17.414 12L8.707 3.29297L7.293 4.70697Z" fill="white"/>
                            </svg>
                            {translate(lang, "الرئيسية", "Home")}
                        </span>
                        <a href="">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.293 4.70697L14.586 12L7.293 19.293L8.707 20.707L17.414 12L8.707 3.29297L7.293 4.70697Z" fill="white"/>
                            </svg>
                            {translate(lang, "الفاعليات", "Events")}
                        </a>
                    </p>
                    <h1>
                        {translate(lang, "اكتشف الفاعليات" as string, "Discover events")}
                    </h1>
                    <div className="location_categories">
                        <button className={selectedCategory == -1 ? "active" : ""} onClick={() => setSelectedCategory(-1)}>
                            {translate(lang, "الكل", "All")}
                        </button>
                        {
                            categories && (
                                    categories.map((cat, index) => (
                                    <button className={selectedCategory == cat.id ? "active" : ""} onClick={() => setSelectedCategory(cat.id)}>
                                        <img src={API_URL + cat.svg_icon} alt="" />
                                        {translate(lang, cat.title_ar as string, cat.title as string)}
                                    </button>
                                    )
                                )
                            )
                        }
                        <button className={selectedCategory == 99 ? "active" : ""} onClick={() => setSelectedCategory(99)}>
                            <img src={serviceIcon} alt="" />
                            {translate(lang, "الخدمات" as string, "Services")}
                        </button>
                    </div>
                </div>
            </section>
            <section className="location_events_wrapper">
                <div className="container">
                    {
                        categories && (
                            categories.map((cat, index) => (
                                (selectedCategory == -1 || selectedCategory == cat.id) && (
                                    cat.events.map(eve => (
                                        <div className="card">
                                            <div className="hover">
                                                <Link to={"/event/" + eve.id} className="text">
                                                    <h2>
                                                        {translate(lang, eve.title_ar, eve.title)}
                                                    </h2>
                                                    <p>
                                                        {translate(lang, eve.sub_title_ar as string, eve.sub_title)}
                                                    </p>
                                                    <br />
                                                    <div className="starts">
                                                        <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M18.2824 1.29419H16.4294V3.23537C16.4294 3.6236 16.1206 3.88242 15.8118 3.88242C15.5029 3.88242 15.1941 3.6236 15.1941 3.23537V1.29419H5.31176V3.23537C5.31176 3.6236 5.00294 3.88242 4.69412 3.88242C4.38529 3.88242 4.07647 3.6236 4.07647 3.23537V1.29419H2.22353C1.29706 1.29419 0.617645 2.13537 0.617645 3.23537V5.56478H20.3824V3.23537C20.3824 2.13537 19.2706 1.29419 18.2824 1.29419ZM0.617645 6.9236V18.7648C0.617645 19.9295 1.29706 20.706 2.28529 20.706H18.3441C19.3324 20.706 20.4441 19.8648 20.4441 18.7648V6.9236H0.617645ZM6.1147 17.7942H4.63235C4.38529 17.7942 4.13823 17.6001 4.13823 17.2765V15.6589C4.13823 15.4001 4.32353 15.1412 4.63235 15.1412H6.17647C6.42353 15.1412 6.67059 15.3354 6.67059 15.6589V17.2765C6.60882 17.6001 6.42353 17.7942 6.1147 17.7942ZM6.1147 11.9707H4.63235C4.38529 11.9707 4.13823 11.7765 4.13823 11.453V9.83537C4.13823 9.57654 4.32353 9.31772 4.63235 9.31772H6.17647C6.42353 9.31772 6.67059 9.51184 6.67059 9.83537V11.453C6.60882 11.7765 6.42353 11.9707 6.1147 11.9707ZM11.0559 17.7942H9.51176C9.2647 17.7942 9.01765 17.6001 9.01765 17.2765V15.6589C9.01765 15.4001 9.20294 15.1412 9.51176 15.1412H11.0559C11.3029 15.1412 11.55 15.3354 11.55 15.6589V17.2765C11.55 17.6001 11.3647 17.7942 11.0559 17.7942ZM11.0559 11.9707H9.51176C9.2647 11.9707 9.01765 11.7765 9.01765 11.453V9.83537C9.01765 9.57654 9.20294 9.31772 9.51176 9.31772H11.0559C11.3029 9.31772 11.55 9.51184 11.55 9.83537V11.453C11.55 11.7765 11.3647 11.9707 11.0559 11.9707ZM15.9971 17.7942H14.4529C14.2059 17.7942 13.9588 17.6001 13.9588 17.2765V15.6589C13.9588 15.4001 14.1441 15.1412 14.4529 15.1412H15.9971C16.2441 15.1412 16.4912 15.3354 16.4912 15.6589V17.2765C16.4912 17.6001 16.3059 17.7942 15.9971 17.7942ZM15.9971 11.9707H14.4529C14.2059 11.9707 13.9588 11.7765 13.9588 11.453V9.83537C13.9588 9.57654 14.1441 9.31772 14.4529 9.31772H15.9971C16.2441 9.31772 16.4912 9.51184 16.4912 9.83537V11.453C16.4912 11.7765 16.3059 11.9707 15.9971 11.9707Z" fill="white"/>
                                                        </svg>
        
                                                        {
                                                            new Date(eve.date_from).toLocaleDateString(translate(lang, "ar-EG-u-nu-latn", "en-US"), { month: 'long'}) + " " + 
                                                            new Date(eve.date_from).toLocaleDateString(translate(lang, "ar-EG-u-nu-latn", "en-US"), { day: 'numeric'}) + ", " +
                                                            new Date(eve.date_from).toLocaleDateString(translate(lang, "ar-EG-u-nu-latn", "en-US"), { year: "numeric"})
                                                        }
                                                    </div>
                                                    <div className="starts">
                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g clip-path="url(#clip0_1_1341)">
                                                        <path d="M10 0.625C4.83063 0.625 0.625 4.83063 0.625 10C0.625 15.1694 4.83063 19.375 10 19.375C15.1694 19.375 19.375 15.1694 19.375 10C19.375 4.83063 15.1694 0.625 10 0.625ZM14.1919 14.1919C14.07 14.3138 13.91 14.375 13.75 14.375C13.59 14.375 13.43 14.3138 13.3081 14.1919L9.55813 10.4419C9.44063 10.3244 9.375 10.1656 9.375 10V5C9.375 4.655 9.655 4.375 10 4.375C10.345 4.375 10.625 4.655 10.625 5V9.74125L14.1919 13.3081C14.4363 13.5525 14.4363 13.9475 14.1919 14.1919Z" fill="white"/>
                                                        </g>
                                                        <defs>
                                                        <clipPath id="clip0_1_1341">
                                                        <rect width="20" height="20" fill="white"/>
                                                        </clipPath>
                                                        </defs>
                                                        </svg>
        
                                                        {
                                                            new Date(eve.date_from).toLocaleDateString(translate(lang, "ar-EG-u-nu-latn", "en-US"), { hour: 'numeric', minute: 'numeric', hour12: true})
                                                        }
                                                    </div>
                                                </Link>
                                                    {
                                                    eve.url && (
                                                        <a href={eve.url} target="_blank">
                                                            BUY TICKET
                                                        </a>
                                                    )}
                                            </div>
                                            <img src={API_URL + eve.thumbnail} alt="" />
                                            <div className="date">
                                            {new Date().toLocaleDateString(translate(lang, "ar-EG-u-nu-latn", "en-US"), { day: 'numeric'}) == new Date(eve.date_from).toLocaleDateString(translate(lang, "ar-EG-u-nu-latn", "en-US"), { day: 'numeric'}) ? (
                                                <span>{translate(lang, "اليوم", "Today")}</span>
                                            ) : (
                                                <>
                                                <span className="num">{new Date(eve.date_from).toLocaleDateString(translate(lang, "ar-EG-u-nu-latn", "en-US"), { day: 'numeric'})}</span>
                                                <span>{new Date(eve.date_from).toLocaleDateString(translate(lang, "ar-EG-u-nu-latn", "en-US"), { month: "short"})}</span>
                                                </>
                                            )}
                                            </div>
                                            <div className="text">
                                                <h2>
                                                    {translate(lang, eve.title_ar, eve.title)}
                                                </h2>
                                                <p>
                                                    {translate(lang, eve.sub_title_ar as string, eve.sub_title)}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                )
                            ))
                        )
                    }
                    {
                        services && (
                            services.map((serv, index) => (
                                (selectedCategory == -1 || selectedCategory == 99) && (
                                    <div className="card">
                                        <div className="hover">
                                            <Link to={"/service/" + serv.id} className="text">
                                                <h2>
                                                    {translate(lang, serv.title_ar, serv.title)}
                                                </h2>
                                                <p>
                                                    {translate(lang, serv.sub_title_ar as string, serv.sub_title)}
                                                </p>
                                                <br />
                                                <div className="starts">
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clip-path="url(#clip0_1_1341)">
                                                    <path d="M10 0.625C4.83063 0.625 0.625 4.83063 0.625 10C0.625 15.1694 4.83063 19.375 10 19.375C15.1694 19.375 19.375 15.1694 19.375 10C19.375 4.83063 15.1694 0.625 10 0.625ZM14.1919 14.1919C14.07 14.3138 13.91 14.375 13.75 14.375C13.59 14.375 13.43 14.3138 13.3081 14.1919L9.55813 10.4419C9.44063 10.3244 9.375 10.1656 9.375 10V5C9.375 4.655 9.655 4.375 10 4.375C10.345 4.375 10.625 4.655 10.625 5V9.74125L14.1919 13.3081C14.4363 13.5525 14.4363 13.9475 14.1919 14.1919Z" fill="white"/>
                                                    </g>
                                                    <defs>
                                                    <clipPath id="clip0_1_1341">
                                                    <rect width="20" height="20" fill="white"/>
                                                    </clipPath>
                                                    </defs>
                                                    </svg>
    
                                                    {
                                                        (serv.working_from) + " - " + serv.working_to
                                                    }
                                                </div>
                                            </Link>
                                            <a href={serv.phone ? "tel:" + serv.phone : serv.website} target="_blank">
                                                Contact
                                            </a>
                                        </div>
                                        <img src={API_URL + serv.photo_path} alt="" />
                                        <div className="text">
                                            <h2>
                                                {translate(lang, serv.title_ar, serv.title)}
                                            </h2>
                                            <p>
                                                {translate(lang, serv.sub_title_ar as string, serv.sub_title)}
                                            </p>
                                        </div>
                                    </div>
                                )
                            ))
                        )
                    }
                </div>
            </section>
        </DefaultLayout>
    )
}

export default Category;