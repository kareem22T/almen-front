import { Link, useParams } from "react-router-dom";
import DefaultLayout from "../../../layout/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { useEffect, useState } from "react";
import { getEventById } from "../../../features/eventSlice";
import { API_URL } from "../../../_env";
import { translate } from "../../../utils/methods";
import category1 from "./../../../images/food-icon.png"
import "./style.css"

const Event = () => {
    const {id} = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const event = useSelector((state: RootState) => state.events.eventById);  
    const lang = useSelector((state: RootState) => state.settings.lang);

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
                </div>
                <div className="thumbnail">
                    <img src={API_URL + event?.thumbnail} alt={event?.title} />
                </div>
            </section>
        </DefaultLayout>
    )
}

export default Event;