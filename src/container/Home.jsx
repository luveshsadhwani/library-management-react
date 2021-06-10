import React from 'react'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import "./Home.css"
import IMAGE from "./assets/girl-work-on-laptop.png"
// import ILL from "./assets/ill.jpg"
import SUPPORT from "./assets/support.png"





export default function Home() {

    return (
        <div className="upper-wrap">
            <Parallax pages={3} className="parallax">
                <ParallaxLayer
                    offset={0}
                    speed={2.5}
                >
                    <div className="text-p">
                        <h1>Welcome to Libstasia</h1>
                        <div className="box">
                            <div className="imgbx">
                                <img src={IMAGE} alt="bigggg"/>
                            </div>
                            <div className="sidetext">
                                <h2>Automate your Library</h2>
                            </div>
                        </div>
                    </div>

                </ParallaxLayer>

                <ParallaxLayer offset={1} speed={2} className="layer1" />

                <ParallaxLayer offset={1} speed={0.5}>
                    <div className="blog-post text-p">
                        <div className="blog-img">
                            <img 
                              // src={ILL} 
                              alt="ill"
                            />
                        </div>
                        <div className="blog-post-info">
                            <h1 className="blog-post-title text-p">Easy To Use</h1>
                            <p className="blog-post-text">
                                All you have to do is sit back relax and press a button
                            </p>

                        </div>
                    </div>
                </ParallaxLayer>

                <ParallaxLayer offset={2} speed={2} className="layer2" />

                <ParallaxLayer offset={2} speed={0.5}>
                    <div className="layer2-container text-p">
                        <h1>Fast and Reliable</h1>
                        <div className="at-your-help">
                            <img src={SUPPORT} alt="support" />
                            <h3 className="at-your-help text-p">Always at your service</h3>
                        </div>
                        <footer className="ftr-cls">Best Way to automate your Library</footer>
                    </div>
                </ParallaxLayer>
            </Parallax>
        </div>
    )
}
