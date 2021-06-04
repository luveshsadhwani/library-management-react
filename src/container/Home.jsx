import React from 'react'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import "./Home.css"
import IMAGE from "./assets/girl-work-on-laptop.png"

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
                                <img src={IMAGE} />
                            </div>
                            <div className="sidetext">
                                <h2>Automate your Library</h2>
                            </div>
                        </div>
                    </div>

                </ParallaxLayer>

                <ParallaxLayer offset={1} speed={2} className="layer1" />

                <ParallaxLayer offset={1} speed={0.5}>
                    <p className="text-p">This is my Second Layer</p>
                </ParallaxLayer>

                <ParallaxLayer offset={2} speed={2} className="layer2" />

                <ParallaxLayer offset={2} speed={0.5}>
                    <p className="text-p">This is my Third Layer</p>
                </ParallaxLayer>
            </Parallax>
        </div>
    )
}
