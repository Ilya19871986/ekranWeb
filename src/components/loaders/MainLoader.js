import React from 'react'

import { BallScaleRippleMultiple } from 'react-pure-loaders';

export function MainLoader() {
    return (
        <div style={{display: 'flex', justifyContent: 'center', margin: '.5rem', width: '100vw', height: '100vh', alignItems: "center", alignContent: 'center'}}> 
            <BallScaleRippleMultiple
            color={'#123abc'}
            loading={true} />
        </div> 
    )
}

export function PanelLoader() {
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: "center",  margin: '.5rem', width: '85%', height: '100%', top: '50%'}}> 
            <BallScaleRippleMultiple
            color={'#123abc'}
            loading={true} />
        </div> 
    )
}

export function ContentLoader() {
    return (
        <div  style={{display: 'flex', justifyContent: 'center', margin: '.5rem', width: '100%', height: '100%', alignItems: "center", alignContent: 'center'}}> 
        <br/><br/> <br/><br/>
            <BallScaleRippleMultiple
            color={'#123abc'}
            loading={true} />
        <br/><br/> <br/><br/>
        </div> 
    )
}