import React, {FC, useEffect, useRef} from 'react';
import styled from "styled-components";
import {IWaveOption} from "../utils/wave";
import randomColor from "../utils/randomColorUtil";
import WaveGroupService from "../services/waveGroupService";

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

const CanvasWaveGroupPage: FC = (() => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    let waveGroupService: WaveGroupService | null;
    const options: IWaveOption[] = [{
        fillStyle: 'rgba(255, 0, 0, 0.3)',
        waveHeights: [150, 120, 140, 160, 180, 150],
        interval: 6,
        speed: 0.1,
        startPoint: 1,
    }, {
        fillStyle: 'rgba(0, 255, 0, 0.3)',
        waveHeights: [150, 160, 180, 160, 140, 150],
        interval: 6,
        speed: 0.1,
        startPoint: 2,
    }, {
        fillStyle: 'rgba(0, 0, 255, 0.3)',
        waveHeights: [150, 180, 160, 140, 120, 150],
        interval: 6,
        speed: 0.1,
        startPoint: 3,
    }];

    useEffect(() => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d') || new CanvasRenderingContext2D();
        waveGroupService = new WaveGroupService(ctx, 3, options);

        window.addEventListener('resize', resize);
        resize();

        waveGroupService.animate();

        return () => window.removeEventListener('resize', resize);
    }, [canvasRef.current]);

    const resize = () => {
        if (!canvasRef.current) return;

        const { clientWidth, clientHeight }= document.body;
        waveGroupService?.resize(clientWidth, clientHeight);

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

export default CanvasWaveGroupPage;
