import { Link, useParams } from "react-router-dom";
import DefaultLayout from "../../layout/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useEffect, useRef, useState } from "react";
import { getEventById } from "../../features/eventSlice";
import { API_URL } from "../../_env";
import { translate } from "../../utils/methods";
import category1 from "./../../../images/food-icon.png"
import "./style.css"
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { FreeMode, Navigation } from "swiper/modules";

const Event = () => {
    const {id} = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const event = useSelector((state: RootState) => state.events.eventById);  
    const lang = useSelector((state: RootState) => state.settings.lang);
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const musicEventsRef = useRef<any>(null);
    const swiperRef = useRef<any>(null);

    useEffect(() => {
        dispatch(getEventById(parseInt(id || "0")));        
      }, [dispatch]);
      useEffect(() => {
        document.body.classList.add("event-view");

        return () => {
            document.body.classList.remove("event-view");
        };
    }, []);
    return (
        <DefaultLayout>
            <section className="event_cover">
                <div className="container">
                    <div className="info">
                        <p>
                            <span>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.293 4.70697L14.586 12L7.293 19.293L8.707 20.707L17.414 12L8.707 3.29297L7.293 4.70697Z" fill="white"/>
                                </svg>
                                {translate(lang, "الاحداث", "Events")}
                            </span>
                            <a href="">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.293 4.70697L14.586 12L7.293 19.293L8.707 20.707L17.414 12L8.707 3.29297L7.293 4.70697Z" fill="white"/>
                                </svg>
                                {translate(lang, event?.title_ar as string, event?.title as string)}
                            </a>
                        </p>

                        <div className="text">
                            <p>
                                {translate(lang, "لا تغفل هذا الإحساس الصيفي!", "Don't overlook this summer sensation!")}
                            </p>
                            <h2>
                                {translate(lang, event?.title_ar as string, event?.title as string)}
                            </h2>
                            <p>
                                {translate(lang, event?.sub_title_ar as string, event?.sub_title as string)}
                            </p>
                            {
                                event?.url && (
                                    
                                    <a href="">
                                        {translate(lang, "احجز الان!", "Book Now!")}
                                    </a>
                                )
                            }
                        </div>
                    </div>
                    <div className="details">
                    <div className="starts">
                        <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.2824 1.29419H16.4294V3.23537C16.4294 3.6236 16.1206 3.88242 15.8118 3.88242C15.5029 3.88242 15.1941 3.6236 15.1941 3.23537V1.29419H5.31176V3.23537C5.31176 3.6236 5.00294 3.88242 4.69412 3.88242C4.38529 3.88242 4.07647 3.6236 4.07647 3.23537V1.29419H2.22353C1.29706 1.29419 0.617645 2.13537 0.617645 3.23537V5.56478H20.3824V3.23537C20.3824 2.13537 19.2706 1.29419 18.2824 1.29419ZM0.617645 6.9236V18.7648C0.617645 19.9295 1.29706 20.706 2.28529 20.706H18.3441C19.3324 20.706 20.4441 19.8648 20.4441 18.7648V6.9236H0.617645ZM6.1147 17.7942H4.63235C4.38529 17.7942 4.13823 17.6001 4.13823 17.2765V15.6589C4.13823 15.4001 4.32353 15.1412 4.63235 15.1412H6.17647C6.42353 15.1412 6.67059 15.3354 6.67059 15.6589V17.2765C6.60882 17.6001 6.42353 17.7942 6.1147 17.7942ZM6.1147 11.9707H4.63235C4.38529 11.9707 4.13823 11.7765 4.13823 11.453V9.83537C4.13823 9.57654 4.32353 9.31772 4.63235 9.31772H6.17647C6.42353 9.31772 6.67059 9.51184 6.67059 9.83537V11.453C6.60882 11.7765 6.42353 11.9707 6.1147 11.9707ZM11.0559 17.7942H9.51176C9.2647 17.7942 9.01765 17.6001 9.01765 17.2765V15.6589C9.01765 15.4001 9.20294 15.1412 9.51176 15.1412H11.0559C11.3029 15.1412 11.55 15.3354 11.55 15.6589V17.2765C11.55 17.6001 11.3647 17.7942 11.0559 17.7942ZM11.0559 11.9707H9.51176C9.2647 11.9707 9.01765 11.7765 9.01765 11.453V9.83537C9.01765 9.57654 9.20294 9.31772 9.51176 9.31772H11.0559C11.3029 9.31772 11.55 9.51184 11.55 9.83537V11.453C11.55 11.7765 11.3647 11.9707 11.0559 11.9707ZM15.9971 17.7942H14.4529C14.2059 17.7942 13.9588 17.6001 13.9588 17.2765V15.6589C13.9588 15.4001 14.1441 15.1412 14.4529 15.1412H15.9971C16.2441 15.1412 16.4912 15.3354 16.4912 15.6589V17.2765C16.4912 17.6001 16.3059 17.7942 15.9971 17.7942ZM15.9971 11.9707H14.4529C14.2059 11.9707 13.9588 11.7765 13.9588 11.453V9.83537C13.9588 9.57654 14.1441 9.31772 14.4529 9.31772H15.9971C16.2441 9.31772 16.4912 9.51184 16.4912 9.83537V11.453C16.4912 11.7765 16.3059 11.9707 15.9971 11.9707Z" fill="white"/>
                        </svg>

                        {
                            new Date(event?.date_from as string).toLocaleDateString(translate(lang, "ar-EG-u-nu-latn", "en-US"), { month: 'long'}) + " " + 
                            new Date(event?.date_from as string).toLocaleDateString(translate(lang, "ar-EG-u-nu-latn", "en-US"), { day: 'numeric'}) + ", " +
                            new Date(event?.date_from as string).toLocaleDateString(translate(lang, "ar-EG-u-nu-latn", "en-US"), { year: "numeric"})
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
                            new Date(event?.date_from as string).toLocaleDateString(translate(lang, "ar-EG-u-nu-latn", "en-US"), { hour: 'numeric', minute: 'numeric', hour12: true})
                        }
                    </div>
                    <Link to={"/location/" +  event?.location.id} className="starts">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_1_988)">
                            <path d="M10.8771 0C7.05459 0 3.86646 3.11395 3.86646 7.08984C3.86646 8.60243 4.3159 9.95122 5.17846 11.2151L10.3406 19.3611C10.591 19.7571 11.1637 19.7563 11.4136 19.3611L16.5981 11.1874C17.4421 9.98078 17.8877 8.56397 17.8877 7.08984C17.8877 3.1805 14.7427 0 10.8771 0ZM10.8771 10.3125C9.12005 10.3125 7.69043 8.86673 7.69043 7.08984C7.69043 5.31296 9.12005 3.86719 10.8771 3.86719C12.6341 3.86719 14.0637 5.31296 14.0637 7.08984C14.0637 8.86673 12.6341 10.3125 10.8771 10.3125Z" fill="white"/>
                            <path d="M15.8595 14.811L12.6503 19.8851C11.8196 21.1949 9.92997 21.1906 9.10327 19.8863L5.88883 14.8124C3.06062 15.4737 1.31714 16.6851 1.31714 18.1327C1.31714 20.6448 6.24276 21.9999 10.8771 21.9999C15.5114 21.9999 20.437 20.6448 20.437 18.1327C20.437 16.684 18.6911 15.472 15.8595 14.811Z" fill="white"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_1_988">
                            <rect width="21.7542" height="22" fill="white"/>
                            </clipPath>
                            </defs>
                            </svg>


                            {translate(lang, event?.location.title_ar as string, event?.location.title as string)}
                            
                    </Link>

                    </div>
                </div>
                <div className="thumbnail">
                    <img src={API_URL + event?.thumbnail} alt={event?.title} />
                </div>
            </section>
            <section className="event_location">
                <div className="container">
                    <a href={event?.location.url}>
                        <img src={API_URL + event?.location.thumbnail_path} alt="" />
                    </a>
                    <div className="location_card_wrapper">

                    <div className="location_card">
                        <span>
                            {translate(lang, "الموقع", "LOCATION")}
                        </span>
                        <h1>
                            <Link to={"/location/" +  event?.location.id} style={{color: "#fff", textDecoration: "none"}}>
                                {translate(lang, event?.location.title_ar as string, event?.location.title as string)}
                            </Link>
                        </h1>
                        <h3>
                            {translate(lang, event?.location.sub_title_ar as string, event?.location.sub_title as string)}
                        </h3>
                    </div>
                    </div>
                </div>
            </section>
            <section className="related_events">
                <div className="container">
                    <div className="text">
                        <h1>
                            {translate(lang, "اكتشف", "Discover")} <br />
                            {translate(lang, "المزيد", "More")}
                        </h1>
                        <a href="">
                            {translate(lang, "عرض كل الفعاليات", "View All Events")}
                        </a>
                        <div className="navigation">
                            <button ref={prevRef}>
                                {
                                    lang == "en" && (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-left" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                        <path d="M5 12l14 0" />
                                        <path d="M5 12l6 6" />
                                        <path d="M5 12l6 -6" />
                                        </svg>
                                    )
                                }
                                {
                                    lang == "ar" && (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-right" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                        <path d="M5 12l14 0" />
                                        <path d="M13 18l6 -6" />
                                        <path d="M13 6l6 6" />
                                        </svg>
                                    )
                                }
                            </button>
                            <button ref={nextRef} >
                                {
                                    lang == "ar" && (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-left" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                        <path d="M5 12l14 0" />
                                        <path d="M5 12l6 6" />
                                        <path d="M5 12l6 -6" />
                                        </svg>
                                    )
                                }
                                {
                                    lang == "en" && (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-right" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                        <path d="M5 12l14 0" />
                                        <path d="M13 18l6 -6" />
                                        <path d="M13 6l6 6" />
                                        </svg>
                                    )
                                }
                            </button>
                        </div>

                    </div>
                    <Swiper
                        ref={swiperRef}
                        slidesPerView={"auto"}
                        spaceBetween={20}
                        freeMode={true}
                        className="mySwiper"
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        modules={[Navigation, FreeMode]}
                        onBeforeInit={(swiper: any) => {
                            swiper.params.navigation.prevEl = prevRef.current;
                            swiper.params.navigation.nextEl = nextRef.current;
                        }}
                        >
                        {
                            event?.related_events.map((eve) => (
                            <SwiperSlide className="card">
                                <div className="hover">
                                    <a href={"/event/" + eve.id} className="text">
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
                                    </a>
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
                            </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            </section>
        </DefaultLayout>
    )
}

export default Event;