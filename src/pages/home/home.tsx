import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination } from 'swiper/modules';

import React, { useRef, useEffect, useState } from 'react';

import DefaultLayout from "../../layout/DefaultLayout";
import heroImg from "./../../images/hero.jpeg"
import category1 from "./../../images/food-icon.png"
import catBg from "./../../images/Union(1).png"
import foodU from "./../../images/U.png"
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { getHomeData } from '../../features/homeSlice';
import { API_URL } from '../../_env';
import { getCategories } from '../../features/categorySlice';
const Home = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const musicEventsRef = useRef<any>(null);
    const swiperRef = useRef<any>(null);
    const [openedRestaurant, setOpenedRestaurant] = useState([true, false, false, false])
    const [selectedDay, setSelectedDay] = useState(0)
    const [selectedRestaurant, setselectedRestaurant] = useState(0)

    const handleOpenRestCard = (index: number) => {
        let value = [false, false, false, false]
        value[index] = true
        setOpenedRestaurant(value)

    }
    const dispatch = useDispatch<AppDispatch>();
    const homeData = useSelector((state: RootState) => state.home.homeData);  
    const categories = useSelector((state: RootState) => state.categories.categories);  
    
    useEffect(() => {
        dispatch(getHomeData());
        dispatch(getCategories());
        
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
                    <span>June, Sept. 2024</span>
                    <h1>
                        Alamein <br />
                        Festival Season
                    </h1>
                    <a href={homeData ? homeData.teaser_url : ""} target='_blanck'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-player-play" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M7 4v16l13 -8z" />
                        </svg>
                        Watch The Teaser
                    </a>
                    <a href="#" onClick={handleClick} className="discover_more">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mouse" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M6 3m0 4a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-4a4 4 0 0 1 -4 -4z" />
                        <path d="M12 7l0 4" />
                        </svg>
                        Discover more
                    </a>
                </div>
            </section>
            <section className="music_events" ref={musicEventsRef}>
                <div className="container events_wrapper">
                    <Swiper
                        ref={swiperRef}
                        dir='rtl'
                        slidesPerView={3}
                        loop={true}
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
                            },
                        }}
                        >
                        {
                            (homeData && homeData.main_cat) && (
                                homeData.main_cat.events?.map(item => (
                                    <SwiperSlide>
                                        <img src={API_URL + item.thumbnail} alt="" />
                                        <div className="text">
                                            <p>{item.title}</p>
                                            <span>{item.location.title}</span>
                                        </div>
                                    </SwiperSlide>
                                ))
                            )
                        }
                        {
                            (homeData && homeData.main_cat) && (
                                homeData.main_cat.events?.map(item => (
                                    <SwiperSlide className='hide'>
                                        <img src={API_URL + item.thumbnail} alt="" />
                                        <div className="text">
                                            <p>{item.title}</p>
                                            <span>{item.location.title}</span>
                                        </div>
                                    </SwiperSlide>
                                ))
                            )
                        }
                                                
                    </Swiper>
                    <div className="text_wrapper">
                        <div>
                            <span>{homeData && homeData.main_cat ? homeData.main_cat.title : ''} Events</span>
                            <h1>DISCOVER <br />
                                THIS SUMMER <br />
                                EVENTS
                            </h1>
                            <p>Celebrate the Season with <br />
                            Unique Events</p>
                        </div>
                        <div className="navigation">
                            <button ref={prevRef}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-left" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M5 12l14 0" />
                                <path d="M5 12l6 6" />
                                <path d="M5 12l6 -6" />
                                </svg>
                            </button>
                            <button ref={nextRef} >
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-right" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M5 12l14 0" />
                                <path d="M13 18l6 -6" />
                                <path d="M13 6l6 6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="container top_sposor_wrapper">
                    <h1>Amazing Sponsors</h1>
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
                    <h1>Discover by Category</h1>
                    <p>Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. </p>
                    <div className="categories_wrapper">
                        <div>
                            <div className="card_wrapper">
                                <div className="head">
                                    <img src={foodU} className="food_bg" />
                                    <img src={category1} alt="" />
                                    <h2>Food</h2>
                                </div>
                                <p>Li Europan lingues es membres del sam familie. Lor separat existentie es un myth.</p>
                            </div>
                        </div>
                        {
                            categories && (
                                categories.map(item => (
                                    <div key={item.id}>
                                        <a href="">

                                        <img src={catBg} className="bg" />
                                        <div className="card_wrapper">
                                            <div className="head">
                                                <div className='d-flex' dangerouslySetInnerHTML={{ __html: item.svg_icon }} />
                                                <h2>{item.title}</h2>
                                            </div>
                                            <p>{item.description}</p>
                                        </div>
                                        </a>
                                    </div>
                                ))
                            )
                        }
                    </div>
                </div>
            </section>
            <section className="events_schedual">
                <div className="container">
                    <div className="text">
                        <span>Discover</span>
                        <h1>
                            EVENTS <br />
                            Schedule
                        </h1>
                        <p>
                            Dive into excitement! Explore our current event schedule and find your next adventure.
                        </p>
                        <a href="">
                            VIEW MORE
                        </a>
                    </div>
                    <div className="content">
                        <div className="head">
                            <button onClick={() => setSelectedDay(0)}>
                                <span>Today</span>
                                <h2>
                                    {new Date().toLocaleDateString('en-US', { day: 'numeric'})
}                                    <span className="mobile">{new Date().toLocaleDateString('en-US', { month: 'short', weekday: 'short' })}</span>
                                    <span>{new Date().toLocaleDateString('en-US', { month: 'short'})}
                                    , {new Date().toLocaleDateString('en-US', { weekday: 'long' })}</span>
                                </h2>
                            </button>
                            <button onClick={() => setSelectedDay(1)}>
                                <span>Tomorrow</span>
                                <h2>
                                    {
                                        (() => {
                                            const today = new Date();
                                            const tomorrow = new Date(today);
                                            tomorrow.setDate(today.getDate() + 1);
                                            return tomorrow.toLocaleDateString('en-US', { day: 'numeric' });
                                        })()
                                    }
                                    <span className="mobile">
                                        {
                                            (() => {
                                                const today = new Date();
                                                const tomorrow = new Date(today);
                                                tomorrow.setDate(today.getDate() + 1);
                                                return tomorrow.toLocaleDateString('en-US', { month: 'short', weekday: 'short' });
                                            })()
                                        }
                                    </span>
                                    <span>
                                        {
                                            (() => {
                                                const today = new Date();
                                                const tomorrow = new Date(today);
                                                tomorrow.setDate(today.getDate() + 1);
                                                const month = tomorrow.toLocaleDateString('en-US', { month: 'short' });
                                                const weekday = tomorrow.toLocaleDateString('en-US', { weekday: 'long' });
                                                return `${month}, ${weekday}`;
                                            })()
                                        }
                                    </span>
                                </h2>
                            </button>
                            <button onClick={() => setSelectedDay(2)}>
                                <span>Day After</span>
                                <h2>
                                    {
                                        (() => {
                                            const today = new Date();
                                            const tomorrow = new Date(today);
                                            tomorrow.setDate(today.getDate() + 2);
                                            return tomorrow.toLocaleDateString('en-US', { day: 'numeric' });
                                        })()
                                    }
                                    <span className="mobile">
                                        {
                                            (() => {
                                                const today = new Date();
                                                const tomorrow = new Date(today);
                                                tomorrow.setDate(today.getDate() + 2);
                                                return tomorrow.toLocaleDateString('en-US', { month: 'short', weekday: 'short' });
                                            })()
                                        }
                                    </span>
                                    <span>
                                        {
                                            (() => {
                                                const today = new Date();
                                                const tomorrow = new Date(today);
                                                tomorrow.setDate(today.getDate() + 2);
                                                const month = tomorrow.toLocaleDateString('en-US', { month: 'short' });
                                                const weekday = tomorrow.toLocaleDateString('en-US', { weekday: 'long' });
                                                return `${month}, ${weekday}`;
                                            })()
                                        }
                                    </span>
                                </h2>
                            </button>
                        </div>
                        <div className="line">
                            <span style={{left: (selectedDay * 33) + "%"}}></span>
                        </div>
                        <div className="body">
                        {
                            selectedDay == 0 && (
                                homeData?.today_events.map(item => (
                                    <a href='' className="card">
                                        <img src={API_URL + item.thumbnail} alt="" />
                                        <div className="text">
                                            <h2>{item.title}</h2>
                                            <p>{item.sub_title}</p>
                                            <div className="category">
                                                <div className='d-flex' dangerouslySetInnerHTML={{ __html: item.event_categories[0].svg_icon }} />
                                                <div className="text">
                                                    <p>{item.event_categories[0].title}</p>
                                                    <span>{item.location.title}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                ))
                            )
                        }
                        {
                            selectedDay == 1 && (
                                homeData?.tomorrow_events.map(item => (
                                    <a href='' className="card">
                                        <img src={API_URL + item.thumbnail} alt="" />
                                        <div className="text">
                                            <h2>{item.title}</h2>
                                            <p>{item.sub_title}</p>
                                            <div className="category">
                                                <div className='d-flex' dangerouslySetInnerHTML={{ __html: item.event_categories[0].svg_icon }} />
                                                <div className="text">
                                                    <p>{item.event_categories[0].title}</p>
                                                    <span>{item.location.title}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                ))
                            )
                        }
                        {
                            selectedDay == 2 && (
                                homeData?.upcoming_events.map(item => (
                                    <a href='' className="card">
                                        <img src={API_URL + item.thumbnail} alt="" />
                                        <div className="text">
                                            <h2>{item.title}</h2>
                                            <p>{item.sub_title}</p>
                                            <div className="category">
                                                <div className='d-flex' dangerouslySetInnerHTML={{ __html: item.event_categories[0].svg_icon }} />
                                                <div className="text">
                                                    <p>{item.event_categories[0].title}</p>
                                                    <span>{item.location.title}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                ))
                            )
                        }
                        </div>
                    </div>
                </div>
            </section>
            <section className="restaurants">
                <div className="container">
                    <span>CHECK</span>
                    <h1>DISCOVER RESTAURANT</h1>
                    <div className="restaurants_wrapper">
                        {
                            (homeData && homeData.main_restaurants) && (
                                homeData.main_restaurants?.map((item, index) => (

                                    <div className={"card " + (selectedRestaurant ==  index? "open" : "")} onClick={() => setselectedRestaurant(index)}>
                                        <div>
                                            <img src={API_URL + item.photo_path} alt="" />
                                            <div className="title">
                                                <h2>{item.title }</h2>
                                                <h3>{item.sub_title}</h3>
                                            </div>
                                        </div>
                                        <p>
                                            {item.description}
                                        </p>
                                        <a href="">Reservation</a>
                                    </div>
                                ))
                            )
                        }
                    </div>
                </div>
            </section>
            <section className="sponsors_section">
                <div className="container">
                    <span>SPONSORS</span>
                    <h1>Our Partners</h1>
                    <p>Discover the amazing companies supporting your festival experience. 
                    See our Sponsors below!</p>
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