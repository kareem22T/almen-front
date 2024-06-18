import subscripImg from "./../../images/subscribe.jpeg"
import appleStore from "./../../images/Store download button-1.png"
import googleStore from "./../../images/Store download button.png"
import faceBook from "./../../images/ic_baseline-facebook.png"
import instagram from "./../../images/ph_instagram-logo-fill.png"
import linkedin from "./../../images/entypo-social_linkedin-with-circle.png"
import logo from "./../../images/logo.png"

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="subscribe_wrapper">
                    <img src={subscripImg} className="bg" />
                    <h1>Don't miss any event</h1>
                    <div>
                        <form action="">
                            <p>Don’t miss our future updates</p>
                            <div>
                                <input type="email" name="" id="" placeholder="Enter your email"/>
                                <button type="submit">Subscribe Now</button>
                            </div>
                        </form>
                        <div>
                            <p>Discover your perfect summer <br /> event today!</p>
                            <a href="">View Events</a>
                        </div>
                    </div>
                </div>
                <div className="links">
                    <div>
                        <div>
                            <img src={googleStore} alt="" />
                            <img src={appleStore} alt="" />
                        </div>
                        <div className="social">
                            <img src={faceBook} alt="" />
                            <img src={instagram} alt="" />
                            <img src={linkedin} alt="" />
                        </div>
                    </div>
                    <div className="all_links">
                        <ul>
                            <li><h1>Quick Links</h1></li>
                            <li><a href="">All Events</a></li>
                            <li><a href="">Booking</a></li>
                            <li><a href="">Zones</a></li>
                        </ul>
                        <ul>
                            <li><h1>Categories</h1></li>
                            <li><a href="">Food</a></li>
                            <li><a href="">Entertainment</a></li>
                            <li><a href="">Adventure</a></li>
                        </ul>
                        <ul>
                            <li><h1></h1></li>
                            <li><a href="">Music</a></li>
                            <li><a href="">Family</a></li>
                            <li><a href="">Sports</a></li>
                        </ul>
                    </div>
                </div>
                <div className="copy">
                    <p>Alamein Festival 2024. All rights reserved. Powered by Clicks Egypt</p>
                    <img src={logo} alt="" />
                </div>
            </div>
        </footer>
    )
}

export default Footer;