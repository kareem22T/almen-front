import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination } from 'swiper/modules';

import React, { useRef, useEffect, useState } from 'react';

import DefaultLayout from "../../layout/DefaultLayout";
import heroImg from "./../../images/hero.jpeg"
import servicesImg from "./../../images/services.png"
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { getHomeData } from '../../features/homeSlice';
import { API_URL } from '../../_env';
import { getCategories } from '../../features/categorySlice';
import { getTopEvents } from '../../features/eventSlice';
import { translate } from '../../utils/methods';
import { Link } from 'react-router-dom';

const Home = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const musicEventsRef = useRef<any>(null);
    const swiperRef = useRef<any>(null);
    const [openedRestaurant, setOpenedRestaurant] = useState([true, false, false, false])
    const [selectedDay, setSelectedDay] = useState(0)
    const [selectedRestaurant, setselectedRestaurant] = useState(0)
    const lang = useSelector((state: RootState) => state.settings.lang);

    const handleOpenRestCard = (index: number) => {
        let value = [false, false, false, false]
        value[index] = true
        setOpenedRestaurant(value)

    }
    const dispatch = useDispatch<AppDispatch>();
    const homeData = useSelector((state: RootState) => state.home.homeData);  
    const topEvents = useSelector((state: RootState) => state.events.topEvents);  
    const categories = useSelector((state: RootState) => state.categories.categories);  
    
    useEffect(() => {
        dispatch(getHomeData());
        dispatch(getCategories());
        dispatch(getTopEvents());
        
      }, [dispatch]);
  
    useEffect(() => {
        const handleSlideChange = () => {
            const swiper = swiperRef.current.swiper;
            swiper.slides.forEach((slide: any, index: number) => {
                const slideIndex = swiper.slides.indexOf(swiper.slides[swiper.activeIndex]);
                const distance = Math.abs(slideIndex - index);
                let opacity = 1 - (distance * 0.4);
                if (opacity < 0) opacity = 0;
                slide.style.opacity = opacity;
            });
        };

        const swiperInstance = swiperRef.current.swiper;
        swiperInstance.on('slideChange', handleSlideChange);
        handleSlideChange(); // Initialize opacity on first render

        return () => {
            swiperInstance.off('slideChange', handleSlideChange);
        };
    }, []);

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (musicEventsRef.current) {
            const offset = musicEventsRef.current.offsetTop - 105; // Calculate offset (section top - desired offset)
            window.scrollTo({ top: offset, behavior: 'smooth' }); // Scroll to calculated position
            event.preventDefault(); // Prevent default link behavior (required)
        }
      };
    return (
        <DefaultLayout>
            <section className="hero">
                <img src={heroImg} alt="Festeval" />
                <div className="container">
                    <span>
                        {translate(lang, "يونيو, سبتمبر 2024", "June, Sept. 2024")}
                    </span>
                    <h1>
                        {translate(lang, "العالمين", "Alamein")}
                        <br />
                        {translate(lang, "مهرجان الموسم", "Festival Season")}
                        
                    </h1>
                    <a href={homeData ? (homeData.teaser_url) : ""} target='_blanck'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-player-play" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M7 4v16l13 -8z" />
                        </svg>
                        {translate(lang, "شاهد الاعلان التشويقي", "Watch The Teaser")}
                    </a>
                    <a href="#" onClick={handleClick} className="discover_more">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mouse" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M6 3m0 4a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-4a4 4 0 0 1 -4 -4z" />
                        <path d="M12 7l0 4" />
                        </svg>
                        {translate(lang, "اكتشف المزيد", "Discover more")}
                    </a>
                </div>
            </section>
            <section className="music_events" ref={musicEventsRef}>
                <div className="container events_wrapper">
                    <Swiper
                        ref={swiperRef}
                        dir={translate(lang, "ltr", "rtl")}
                        slidesPerView={3}
                        // loop={true}
                        className="mySwiper"
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        modules={[Navigation]}
                        onBeforeInit={(swiper: any) => {
                            swiper.params.navigation.prevEl = prevRef.current;
                            swiper.params.navigation.nextEl = nextRef.current;
                        }}
                        breakpoints={{
                            0: {
                                slidesPerView: 1, // you can adjust this if needed for smaller screens
                            },
                            992: {
                                slidesPerView: 3,
                                loop: true
                            },
                        }}
                        >
                        {
                            topEvents &&  topEvents?.map((item) => (
                                <SwiperSlide key={item.item.id} className='hide'>
                                    {item.item.type === 'Event' ? (
                                        <>
                                            <Link to={"/event/" + item.item.id }>
                                                <img src={API_URL + item.item.thumbnail } alt={translate(lang, item.item.title_ar, item.item.title)} />
                                            </Link>
                                            <div className="text">
                                                <Link to={"/event/" + item.item.id }>
                                                    <p>{translate(lang, item.item.title_ar, item.item.title)}</p>
                                                </Link>
                                                <Link to={"/location/" + item.item.location?.id }>
                                                    <span>{translate(lang, item.item.location?.title_ar, item.item.location?.title)}</span>
                                                </Link>
                                            </div>
                                        </>
                                    ) : item.item.type === 'Ad' ? (
                                        <>
                                        <a href={item.item.link} target='_blank'>
                                            <img src={API_URL + item.item.photo_path} alt={translate(lang, item.item.title_ar, item.item.title)} />
                                            <div className="text">
                                                <p>{translate(lang, item.item.title_ar, item.item.title)}</p>
                                            </div>
                                        </a>
                                        </>
                                    ) : null}
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                    <div className="text_wrapper">
                        <div>
                            <span>
                                {translate(lang, "اهم الفاعليات", "Top Events")}
                            </span>
                            <h1>
                                {translate(lang, "تصفح", "DISCOVER")}
                                <br />
                                {translate(lang, " اهم فعاليات ", "THIS SUMMER")}
                                 <br />
                                {translate(lang, "الصيف", "EVENTS")}
                                
                            </h1>
                            <p> 
                                {translate(lang, "احتفل بالموسم مع", "Celebrate the Season with")}
                                <br />
                                {translate(lang, "أحداث فريدة من نوعها", "Unique Events")}
                            </p>
                        </div>
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
                </div>
                <div className="container top_sposor_wrapper">
                    <h1>
                        {translate(lang, "رعاة مذهلين", "Amazing Sponsors")}
                    </h1>
                    <div className="sponsors">
                    {
                            (homeData && homeData.amazing_sponsors) && (
                                homeData.amazing_sponsors?.map(item => (
                                    <a href={item.link} target="_blank">
                                        <img src={API_URL + item.image_path} alt="sponsor 1" />
                                    </a>
                                ))
                            )
                        }
                    </div>
                </div>
            </section>
            <section className="categories">
                <div className="container">
                    <h1>
                    {translate(lang, "اكتشف حسب الفئة", "Discover by Category")}
                    </h1>
                    <p>
                        {translate(lang, "اللغات الأوروبية هي أعضاء في نفس العائلة. إن الوجود المنفصل هو أسطورة. من خلال العلم والموسيقى والرياضة وما إلى ذلك، لا يوجد في أوروبا سوى مفردات واحدة.", "Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular.")}
                    </p>
                    <div className="categories_wrapper">
                        {
                            categories && (
                                categories.map(item => (
                                    <div key={item.id}>
                                        <Link to={'/categories/' + item.id}>
                                            <div className="card_wrapper">
                                                <div className="head">
                                                    <img src={API_URL + item.thumbnail_path} alt="" />
                                                    <h2>
                                                        {translate(lang, item.title_ar, item.title)}
                                                    </h2>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            )
                        }
                        <div>
                            <Link to={'/categories/' + 99}>
                                <div className="card_wrapper">
                                    <div className="head">
                                        <img src={servicesImg} alt="" />
                                        <h2>
                                            {translate(lang, "الخدمات", "Services")}
                                        </h2>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <section className="events_schedual">
                <div className="container">
                    <div className="text">
                        <span>
                            {translate(lang, "اكتشف", "Discover")}
                        </span>
                        <h1>
                            {translate(lang, "الفاعليات", "EVENTS")} <br />
                            {translate(lang, "القادمة", "Schedule")}
                            
                        </h1>
                        <p>
                            {translate(lang, "انغمس في الإثارة! استكشف جدول الأحداث الحالي لدينا وابحث عن مغامرتك القادمة.", "Dive into excitement! Explore our current event schedule and find your next adventure.")}
                        </p>
                        <Link to="/categories">
                            {translate(lang, "عرض المزيد", "VIEW MORE")}
                        </Link>
                    </div>
                    <div className="content">
                        <div className="head">
                            <button onClick={() => setSelectedDay(0)}>
                                <span>
                                    {translate(lang, "اليوم", "Today")}
                                </span>
                                <h2>
                                    {new Date().toLocaleDateString(translate(lang, "ar-EG-u-nu-latn", "en-US"), { day: 'numeric'})}                                    <span className="mobile">{new Date().toLocaleDateString(translate(lang, "ar-EG-u-nu-latn", "en-US"), { month: 'short', weekday: 'short' })}</span>
                                    <span>{new Date().toLocaleDateString(translate(lang, "ar-EG-u-nu-latn", "en-US"), { month: 'short'})}
                                    , {new Date().toLocaleDateString(translate(lang, "ar-EG-u-nu-latn", "en-US"), { weekday: 'long' })}</span>
                                </h2>
                            </button>
                            <button onClick={() => setSelectedDay(1)}>
                                <span>
                                    {translate(lang, "غدا", "Tomorrow")}
                                </span>
                                <h2>
                                    {
                                        (() => {
                                            const today = new Date();
                                            const tomorrow = new Date(today);
                                            tomorrow.setDate(today.getDate() + 1);
                                            return tomorrow.toLocaleDateString(translate(lang, "ar-EG-u-nu-latn", "en-US"), { day: 'numeric' });
                                        })()
                                    }
                                    <span className="mobile">
                                        {
                                            (() => {
                                                const today = new Date();
                                                const tomorrow = new Date(today);
                                                tomorrow.setDate(today.getDate() + 1);
                                                return tomorrow.toLocaleDateString(translate(lang, "ar-EG-u-nu-latn", "en-US"), { month: 'short', weekday: 'short' });
                                            })()
                                        }
                                    </span>
                                    <span>
                                        {
                                            (() => {
                                                const today = new Date();
                                                const tomorrow = new Date(today);
                                                tomorrow.setDate(today.getDate() + 1);
                                                const month = tomorrow.toLocaleDateString(translate(lang, "ar-EG-u-nu-latn", "en-US"), { month: 'short' });
                                                const weekday = tomorrow.toLocaleDateString(translate(lang, "ar-EG-u-nu-latn", "en-US"), { weekday: 'long' });
                                                return `${month}, ${weekday}`;
                                            })()
                                        }
                                    </span>
                                </h2>
                            </button>
                            <button onClick={() => setSelectedDay(2)}>
                                <span>
                                    {translate(lang, "التالي", "Day After")}
                                </span>
                                <h2>
                                    {
                                        (() => {
                                            const today = new Date();
                                            const tomorrow = new Date(today);
                                            tomorrow.setDate(today.getDate() + 2);
                                            return tomorrow.toLocaleDateString(translate(lang, "ar-EG-u-nu-latn", "en-US"), { day: 'numeric' });
                                        })()
                                    }
                                    <span className="mobile">
                                        {
                                            (() => {
                                                const today = new Date();
                                                const tomorrow = new Date(today);
                                                tomorrow.setDate(today.getDate() + 2);
                                                return tomorrow.toLocaleDateString(translate(lang, "ar-EG-u-nu-latn", "en-US"), { month: 'short', weekday: 'short' });
                                            })()
                                        }
                                    </span>
                                    <span>
                                        {
                                            (() => {
                                                const today = new Date();
                                                const tomorrow = new Date(today);
                                                tomorrow.setDate(today.getDate() + 2);
                                                const month = tomorrow.toLocaleDateString(translate(lang, "ar-EG-u-nu-latn", "en-US"), { month: 'short' });
                                                const weekday = tomorrow.toLocaleDateString(translate(lang, "ar-EG-u-nu-latn", "en-US"), { weekday: 'long' });
                                                return `${month}, ${weekday}`;
                                            })()
                                        }
                                    </span>
                                </h2>
                            </button>
                        </div>
                        <div className="line">
                            <span style={{left: lang == "ar" ? "auto" : (selectedDay * 33) + "%", right: lang == "en" ? "auto" : (selectedDay * 33) + "%"}}></span>
                        </div>
                        <div className="body">
                        {
                            selectedDay == 0 && (
                                homeData?.today_events.map(item => (
                                    <div className="card">
                                        <Link to={"/event/" + item.id }>
                                            <img src={API_URL + item.thumbnail} alt="" />
                                        </Link>
                                        <div className="text">
                                            <Link to={"/event/" + item.id } style={{display: 'block', textDecoration: 'none'}}>
                                                <h2>{translate(lang, item.title_ar, item.title)}</h2>
                                            </Link>
                                            <Link to={"/event/" + item.id } style={{display: 'block', textDecoration: 'none'}}>
                                                <p>{translate(lang, item.sub_title_ar, item.sub_title)}</p>
                                            </Link>
                                            <div className="category">
                                                <Link to={"/categories/" + item.event_categories[0].id } style={{display: 'block', textDecoration: 'none'}}>
                                                <img src={API_URL + item.event_categories[0].svg_icon} alt="" />
                                                </Link>
                                                <div className="text">
                                                    <Link to={"/categories/" + item.event_categories[0].id } style={{display: 'block', textDecoration: 'none'}}>
                                                        <p>{translate(lang, item.event_categories[0].title_ar, item.event_categories[0].title)}</p>
                                                    </Link>
                                                    <Link to={"/location/" + item.location.id } style={{display: 'block', textDecoration: 'none'}}>
                                                        <span>{translate(lang, item.location.title_ar, item.location.title)}</span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )
                        }
                        {
                            selectedDay == 1 && (
                                homeData?.tomorrow_events.map(item => (
                                    <div className="card">
                                        <Link to={"/event/" + item.id }>
                                            <img src={API_URL + item.thumbnail} alt="" />
                                        </Link>
                                        <div className="text">
                                            <Link to={"/event/" + item.id } style={{display: 'block', textDecoration: 'none'}}>
                                                <h2>{translate(lang, item.title_ar, item.title)}</h2>
                                            </Link>
                                            <Link to={"/event/" + item.id } style={{display: 'block', textDecoration: 'none'}}>
                                                <p>{translate(lang, item.sub_title_ar, item.sub_title)}</p>
                                            </Link>
                                            <div className="category">
                                                <Link to={"/categories/" + item.event_categories[0].id } style={{display: 'block', textDecoration: 'none'}}>
                                                <img src={API_URL + item.event_categories[0].svg_icon} alt="" />
                                                </Link>
                                                <div className="text">
                                                    <Link to={"/categories/" + item.event_categories[0].id } style={{display: 'block', textDecoration: 'none'}}>
                                                        <p>{translate(lang, item.event_categories[0].title_ar, item.event_categories[0].title)}</p>
                                                    </Link>
                                                    <Link to={"/location/" + item.location.id } style={{display: 'block', textDecoration: 'none'}}>
                                                        <span>{translate(lang, item.location.title_ar, item.location.title)}</span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )
                        }
                        {
                            selectedDay == 2 && (
                                homeData?.upcoming_events.map(item => (
                                    <div className="card">
                                        <Link to={"/event/" + item.id }>
                                            <img src={API_URL + item.thumbnail} alt="" />
                                        </Link>
                                        <div className="text">
                                            <Link to={"/event/" + item.id } style={{display: 'block', textDecoration: 'none'}}>
                                                <h2>{translate(lang, item.title_ar, item.title)}</h2>
                                            </Link>
                                            <Link to={"/event/" + item.id } style={{display: 'block', textDecoration: 'none'}}>
                                                <p>{translate(lang, item.sub_title_ar, item.sub_title)}</p>
                                            </Link>
                                            <div className="category">
                                                <Link to={"/categories/" + item.event_categories[0].id } style={{display: 'block', textDecoration: 'none'}}>
                                                <img src={API_URL + item.event_categories[0].svg_icon} alt="" />
                                                </Link>
                                                <div className="text">
                                                    <Link to={"/categories/" + item.event_categories[0].id } style={{display: 'block', textDecoration: 'none'}}>
                                                        <p>{translate(lang, item.event_categories[0].title_ar, item.event_categories[0].title)}</p>
                                                    </Link>
                                                    <Link to={"/location/" + item.location.id } style={{display: 'block', textDecoration: 'none'}}>
                                                        <span>{translate(lang, item.location.title_ar, item.location.title)}</span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )
                        }
                        </div>
                    </div>
                </div>
            </section>
            <section className="restaurants">
                <div className="container">
                    <span>
                    {translate(lang, "اكتشف", "CHECK")}
                    </span>
                    <h1>
                    {translate(lang, "تصفح الخدمات", "DISCOVER SERVICES")}
                    </h1>
                    <div className="restaurants_wrapper">
                        {
                            (homeData && homeData.main_restaurants) && (
                                homeData.main_restaurants?.map((item, index) => (

                                    <div className={"card " + (selectedRestaurant ==  index? "open" : "")} onClick={() => setselectedRestaurant(index)}>
                                        <div>

                                        <Link to={"/service/" + item.id}>
                                            <img src={API_URL + item.photo_path} alt="" />
                                            <div className="title">
                                                <h2>{translate(lang, item.title_ar, item.title)}</h2>
                                                <h3>{translate(lang, item.sub_title_ar, item.sub_title)}</h3>
                                            </div>
                                        </Link>
                                        </div>
                                        <p>
                                            {translate(lang, item.description_ar, item.description)}
                                        </p>
                                        <Link to="/categories/99">
                                            {translate(lang, "اكتشف المزيد", "Check More Services")}
                                        </Link>
                                    </div>
                                ))
                            )
                        }
                    </div>
                </div>
            </section>
            <section className="sponsors_section">
                <div className="container">
                    <span style={{marginBottom: 12}}>
                        {translate(lang, "الرعاة", "SPONSORS")}
                    </span>
                    <h1>
                        {translate(lang, "شركائنا", "Our Partners")}
                    </h1>
                    <p>
                        {translate(lang, "اكتشف الشركات المذهلة التي تدعم تجربة المهرجان الخاصة بك. انظر الرعاة أدناه!", "Discover the amazing companies supporting your festival experience. See our Sponsors below!")}
                    </p>
                    <div className="sponsors_wrapper">
                        {
                            (homeData && homeData.all_sponsors) && (
                                homeData.all_sponsors?.map(item => (
                                    <a href={item.link} target="_blank">
                                        <img src={API_URL + item.image_path} alt="sponsor 1" />
                                    </a>
                                ))
                            )
                        }
                    </div>
                </div>
            </section>
        </DefaultLayout>
    )
}

export default Home;