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