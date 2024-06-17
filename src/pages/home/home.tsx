import DefaultLayout from "../../layout/DefaultLayout";
import heroImg from "./../../images/hero.jpeg"

const Home = () => {
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
                    <a href="" className="discover_more">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mouse" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M6 3m0 4a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-4a4 4 0 0 1 -4 -4z" />
                        <path d="M12 7l0 4" />
                        </svg>
                        Discover more
                    </a>
                </div>
            </section>
        </DefaultLayout>
    )
}

export default Home;