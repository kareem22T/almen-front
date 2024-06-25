import subscripImg from "./../../images/subscribe.jpeg"
import appleStore from "./../../images/Store download button-1.png"
import googleStore from "./../../images/Store download button.png"
import faceBook from "./../../images/ic_baseline-facebook.png"
import instagram from "./../../images/ph_instagram-logo-fill.png"
import linkedin from "./../../images/entypo-social_linkedin-with-circle.png"
import logo from "./../../images/logo.png"
import { getHomeData } from "../../features/homeSlice"
import { AppDispatch, RootState } from "../../store"
import { useDispatch, useSelector } from "react-redux"
import { FormEvent, useEffect, useState } from "react"
import { subscribe, translate } from "../../utils/methods"
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCategories } from "../../features/categorySlice"
import { Link } from "react-router-dom"

const showSuccessMsg = (msg:string) => {
    toast.success(msg);
  };
  

const Footer = () => {
    const categories = useSelector((state: RootState) => state.categories.categories);  

    const dispatch = useDispatch<AppDispatch>();
    const lang = useSelector((state: RootState) => state.settings.lang);

    const homeData = useSelector((state: RootState) => state.home.homeData);  
    const [email, setEmail] = useState<string>("")

    const handleChangeEmail = (e:  React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target?.value)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!email) 
            toast.error("Please Enter Your Email");
        else
        subscribe(email).then(res => {
            if (res.data.status == true) {
                showSuccessMsg(res.data.message)
                setEmail('')
            }
        })
    }
    useEffect(() => {
        dispatch(getHomeData());
        dispatch(getCategories());        
      }, [dispatch]);

    return (
        <footer>
            <ToastContainer />
            <div className="container">
                <div className="subscribe_wrapper">
                    <img src={subscripImg} className="bg" />
                    <h1>
                        {translate(lang, "لا تفوت أي حدث", "Don't miss any event")}
                    </h1>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <p>
                                {translate(lang, "لا تفوت تحديثاتنا المستقبلية", "Don’t miss our future updates")}
                            </p>
                            <div>
                                <input type="email" value={email} onChange={handleChangeEmail} name="" id="" placeholder={translate(lang, "ادخل بريدك الالكتروني", "Enter your email")}/>
                                <button type="submit">
                                    {translate(lang, "اشترك الان", "Subscribe Now")}
                                </button>
                            </div>
                        </form>
                        <div>
                            <p>
                                {translate(lang, "اكتشف امتع فاعليات ", "Discover your perfect summer")}
                                 <br /> 
                                {translate(lang, "صيفك المثالي!", "event today!")}
                                
                            </p>
                            <Link to="/categories">
                                {translate(lang, "عرض الاحداث", "View Events")}
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="links">
                    <div>
                        <div>
                            <a href={homeData && homeData.google_play_url? (homeData.google_play_url) : ""} target="_blanck">
                                <img src={googleStore} alt="" />
                            </a>
                            <a href={homeData && homeData.play_store_url ? (homeData.play_store_url) : ""} target="_blanck">
                                <img src={appleStore} alt="" />
                            </a>
                        </div>
                        <div className="social">
                            <a href={homeData && homeData.facebook_url ? (homeData.facebook_url) : ""} target="_blanck">
                                <img src={faceBook} alt="" />
                            </a>
                            <a href={homeData && homeData.instagram_url ? (homeData.instagram_url) : ""} target="_blanck">
                                <img src={instagram} alt="" />
                            </a>
                            <a href={homeData && homeData.linkedin_url ? (homeData.linkedin_url) : ""} target="_blanck">
                                <img src={linkedin} alt="" />
                            </a>
                        </div>
                    </div>
                    <div className="all_links">
                        <ul>
                            <li><h1>{translate(lang, "اختصارات", "Quik Links")}</h1></li>
                            <li><Link to="/categories">{translate(lang, "جميع الفاعليات", "All Events")}</Link></li>
                            <li><Link to="/categories/99">{translate(lang, "جميع الخدمات", "All Service")}</Link></li>
                        </ul>
                        <ul style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 32px"}}>
                            <li style={{gridColumn: "span 2"}}><h1>{translate(lang, "الاقسام", "Categories")}</h1></li>
                            {
                            categories && (
                                    categories.map((cat, index) => (
                                        <li>
                                            <a href={"/categories/" + cat.id} style={{textTransform: 'capitalize'}}>
                                                {translate(lang, cat.title_ar as string, cat.title as string)}
                                            </a>
                                        </li>
                                    )
                                )
                            )
                        }
                        </ul>
                    </div>
                </div>
                <div className="copy" dir="lrt">
                    <p>Alamein Festival 2024. All rights reserved. Powered by Clicks Egypt</p>
                    <img src={logo} alt="" />
                </div>
            </div>
        </footer>
    )
}

export default Footer;