import React, {FC, useEffect, useRef} from 'react';
import WaveService from '../services/waveService';
import styled from "styled-components";
import {IWaveOption} from "../utils/wave";
import randomColor from "../utils/randomColorUtil";

const Frame = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
   
    button {
        position: absolute;
        width: 100px;
        height: 50px;
    } 
    canvas {
        width: 100%;
        height: 100%;
    }
`;

const CanvasWavePage: FC = (() => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    let waveService: WaveService | null;
    const option: IWaveOption = {
        fillStyle: randomColor(),
        waveHeights: [150, 120, 200, 60, 120, 150],
        interval: 6,
        speed: 0.1,
        startPoint: 1
    };

    useEffect(() => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d') || new CanvasRenderingContext2D();
        waveService = new WaveService(ctx, option);

        window.addEventListener('resize', resize);
        resize();

        waveService.animate();

        return () => window.removeEventListener('resize', resize);
    }, [canvasRef.current]);

    const resize = () => {
        if (!canvasRef.current) return;

        const { clientWidth, clientHeight }= document.body;
        waveService?.resize(clientWidth, clientHeight);

        canvasRef.current.width = clientWidth * 2;
        canvasRef.current.height = clientHeight * 2;

        const ctx = canvasRef.current.getContext('2d') || new CanvasRenderingContext2D();
        ctx.scale(2, 2);
    };


    return (
        <Frame>
            <canvas ref={canvasRef}/>
        </Frame>
    )
});

export default CanvasWavePage;
