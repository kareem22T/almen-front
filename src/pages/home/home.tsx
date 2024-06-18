import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import React, { useRef, useEffect, useState } from 'react';

import DefaultLayout from "../../layout/DefaultLayout";
import heroImg from "./../../images/hero.jpeg"
import slider1 from "./../../images/slider-1.jpeg"
import slider2 from "./../../images/slider-2.jpeg"
import slider3 from "./../../images/slider-3.jpeg"
import sponsor1 from "./../../images/sponsor_1.png";
import sponsor2 from "./../../images/sponsor_2.png";
import sponsor3 from "./../../images/sponsor_3.png"; // Assuming sponsor_3.png exists
import sponsor4 from "./../../images/sponsor_4.png"; // Assuming sponsor_4.png exists
import sponsor5 from "./../../images/sponsor_5.png"; // Assuming sponsor_5.png exists
import category1 from "./../../images/food-icon.png"
import category2 from "./../../images/entertainment-icon.png"
import category3 from "./../../images/Adventure-icon.png"
import category4 from "./../../images/music-icon.png"
import category5 from "./../../images/family-icon.png"
import category6 from "./../../images/sports-icon.png"
import catBg from "./../../images/Union(1).png"
import foodU from "./../../images/U.png"
import event1 from './../../images/event-1.png'
import event2 from './../../images/event-2.jpeg'
import event3 from './../../images/event-3.jpeg'
import adventure from "./../../images/adventure.png"
import music from "./../../images/music.png"
import entertainment from "./../../images/entertainment.png"
import restaurant1 from "./../../images/restaurant-1.jpeg"

import spo1 from "./../../images/Frame.png"
import spo2 from "./../../images/Frame-1.png"
import spo3 from "./../../images/Frame-2.png"
import spo4 from "./../../images/Frame-3.png"
import spo5 from "./../../images/Frame-4.png"
import spo6 from "./../../images/Frame-5.png"
import spo7 from "./../../images/Frame-6.png"
import spo8 from "./../../images/Frame-7.png"
import spo9 from "./../../images/Frame-8.png"
import spo10 from "./../../images/Frame-9.png"
import spo11 from "./../../images/Frame-10.png"
import spo12 from "./../../images/Frame-11.png"
const Home = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const musicEventsRef = useRef<any>(null);
    const swiperRef = useRef<any>(null);
    const [openedRestaurant, setOpenedRestaurant] = useState([true, false, false, false])

    const handleOpenRestCard = (index: number) => {
        let value = [false, false, false, false]
        value[index] = true
        setOpenedRestaurant(value)

    }
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
                    <a href="">
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
                        slidesPerView={4}
                        centeredSlides={true}
                        spaceBetween={0}
                        grabCursor={true}
                        initialSlide={2}
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
                                slidesPerView: 4,
                            },
                        }}
                        >
                        <SwiperSlide>
                            <img src={slider3} alt="" />
                            <div className="text">
                                <p>Amir Eid</p>
                                <span>North Arena</span>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={slider2} alt="" />
                            <div className="text">
                                <p>Medhat Saleh</p>
                                <span>North Arena</span>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={slider1} alt="" />
                            <div className="text">
                                <p>Omar Khairat</p>
                                <span>North Arena</span>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                    <div className="text_wrapper">
                        <div>
                            <span>Music Events</span>
                            <h1>DISCOVER <br />
                                THIS SUMMER <br />
                                EVENTS
                            </h1>
                            <p>Celebrate the Season with <br />
                            Unique Events</p>
                        </div>
                        <div className="navigation">
                            <button ref={nextRef} >
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-left" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M5 12l14 0" />
                                <path d="M5 12l6 6" />
                                <path d="M5 12l6 -6" />
                                </svg>
                            </button>
                            <button ref={prevRef}>
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
                        <a href="">
                            <img src={sponsor1} alt="sponsor 1" />
                        </a>
                        <a href="">
                            <img src={sponsor2} alt="sponsor 2" />
                        </a>
                        <a href="">
                            <img src={sponsor3} alt="sponsor 3" />
                        </a>
                        <a href="">
                            <img src={sponsor4} alt="sponsor 4" />
                        </a>
                        <a href="">
                            <img src={sponsor5} alt="sponsor 5" />
                        </a>
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
                        <div>
                            <img src={catBg} className="bg" />
                            <div className="card_wrapper">
                                <div className="head">
                                    <img src={category2} alt="" />
                                    <h2>Entertainment</h2>
                                </div>
                                <p>Li Europan lingues es membres del sam familie. Lor separat existentie es un myth.</p>
                            </div>
                        </div>
                        <div>
                            <img src={catBg} className="bg" />
                            <div className="card_wrapper">
                                <div className="head">
                                    <img src={category3} alt="" />
                                    <h2>Adventure</h2>
                                </div>
                                <p>Li Europan lingues es membres del sam familie. Lor separat existentie es un myth.</p>
                            </div>
                        </div>
                        <div>
                            <img src={catBg} className="bg" />
                            <div className="card_wrapper">
                                <div className="head">
                                    <img src={category4} alt="" />
                                    <h2>Music</h2>
                                </div>
                                <p>Li Europan lingues es membres del sam familie. Lor separat existentie es un myth.</p>
                            </div>
                        </div>
                        <div>
                            <img src={catBg} className="bg" />
                            <div className="card_wrapper">
                                <div className="head">
                                    <img src={category5} alt="" />
                                    <h2>Family</h2>
                                </div>
                                <p>Li Europan lingues es membres del sam familie. Lor separat existentie es un myth.</p>
                            </div>
                        </div>
                        <div>
                            <img src={catBg} className="bg" />
                            <div className="card_wrapper">
                                <div className="head">
                                    <img src={category6} alt="" />
                                    <h2>Sports</h2>
                                </div>
                                <p>Li Europan lingues es membres del sam familie. Lor separat existentie es un myth.</p>
                            </div>
                        </div>
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
                            <button>
                                <span>Today</span>
                                <h2>
                                    24
                                    <span className="mobile">Aug, Mon</span>
                                    <span>Aug, Monday</span>
                                </h2>
                            </button>
                            <button>
                                <span>Tomorrow</span>
                                <h2>
                                    25
                                    <span className="mobile">Aug, Tus</span>
                                    <span>Aug, Tuesday</span>
                                </h2>
                            </button>
                            <button>
                                <span>Day After</span>
                                <h2>
                                    26
                                    <span className="mobile">Aug, wed</span>
                                    <span>Aug, Wednesday</span>
                                </h2>
                            </button>
                        </div>
                        <div className="line">
                            <span></span>
                        </div>
                        <div className="body">
                            <div className="card">
                                <img src={event1} alt="" />
                                <div className="text">
                                    <h2>Paramotor</h2>
                                    <p>Fly High Over the Stunning North Coastline
                                    Unleash Your Adventurous Spirit.</p>
                                    <div className="category">
                                        <img src={adventure} alt="" />
                                        <div className="text">
                                            <p>Adventure</p>
                                            <span>Musical Arena</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <img src={event2} alt="" />
                                <div className="text">
                                    <h2>Paramotor</h2>
                                    <p>Fly High Over the Stunning North Coastline
                                    Unleash Your Adventurous Spirit.</p>
                                    <div className="category">
                                        <img src={entertainment} alt="" />
                                        <div className="text">
                                            <p>Entertainment</p>
                                            <span>Musical Arena</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <img src={event3} alt="" />
                                <div className="text">
                                    <h2>Omar Khairat</h2>
                                    <p>Fly High Over the Stunning North Coastline
                                    Unleash Your Adventurous Spirit.</p>
                                    <div className="category">
                                        <img src={music} alt="" />
                                        <div className="text">
                                            <p>Music</p>
                                            <span>Musical Arena</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="restaurants">
                <div className="container">
                    <span>CHECK</span>
                    <h1>DISCOVER RESTAURANT</h1>
                    <div className="restaurants_wrapper">
                        <div className={"card " + (openedRestaurant[0] ? "open" : "")} onClick={() => handleOpenRestCard(0)}>
                            <div>
                                <img src={restaurant1} alt="" />
                                <div className="title">
                                    <h2>The Beach Grill</h2>
                                    <h3>Lebanese</h3>
                                </div>
                            </div>
                            <p>
                                This relaxed, open-air beach grill serves an array of Lebanese cuisine with an emphasis on fresh seafood. The menu includes snacks, salads, seafood and grills, with locally sourced ingredients that are cooked right in front of you.
                            </p>
                            <a href="">Reservation</a>
                        </div>
                        <div className={"card " + (openedRestaurant[1] ? "open" : "")} onClick={() => handleOpenRestCard(1)}>
                            <div>
                                <img src={restaurant1} alt="" />
                                <div className="title">
                                    <h2>The Beach Grill</h2>
                                    <h3>Lebanese</h3>
                                </div>
                            </div>
                            <p>
                                This relaxed, open-air beach grill serves an array of Lebanese cuisine with an emphasis on fresh seafood. The menu includes snacks, salads, seafood and grills, with locally sourced ingredients that are cooked right in front of you.
                            </p>
                            <a href="">Reservation</a>
                        </div>
                        <div className={"card " + (openedRestaurant[2] ? "open" : "")} onClick={() => handleOpenRestCard(2)}>
                            <div>
                                <img src={restaurant1} alt="" />
                                <div className="title">
                                    <h2>The Beach Grill</h2>
                                    <h3>Lebanese</h3>
                                </div>
                            </div>
                            <p>
                                This relaxed, open-air beach grill serves an array of Lebanese cuisine with an emphasis on fresh seafood. The menu includes snacks, salads, seafood and grills, with locally sourced ingredients that are cooked right in front of you.
                            </p>
                            <a href="">Reservation</a>
                        </div>
                        <div className={"card " + (openedRestaurant[3] ? "open" : "")} onClick={() => handleOpenRestCard(3)}>
                            <div>
                                <img src={restaurant1} alt="" />
                                <div className="title">
                                    <h2>The Beach Grill</h2>
                                    <h3>Lebanese</h3>
                                </div>
                            </div>
                            <p>
                                This relaxed, open-air beach grill serves an array of Lebanese cuisine with an emphasis on fresh seafood. The menu includes snacks, salads, seafood and grills, with locally sourced ingredients that are cooked right in front of you.
                            </p>
                            <a href="">Reservation</a>
                        </div>
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
                        <img src={spo1} />
                        <img src={spo2} />
                        <img src={spo3} />
                        <img src={spo4} />
                        <img src={spo5} />
                        <img src={spo6} />
                        <img src={spo7} />
                        <img src={spo8} />
                        <img src={spo9} />
                        <img src={spo10} />
                        <img src={spo11} />
                        <img src={spo12} />
                    </div>
                </div>
            </section>
        </DefaultLayout>
    )
}

export default Home;