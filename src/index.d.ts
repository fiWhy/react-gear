import { Component } from "react";

interface IGearProps {
    radius: number;
    roll?: boolean;
    rollingAnimationDuration?: string;
    infinite?: boolean;
    fill?: string;
    teeth?: number;
    off?: number;
    teethDiameter?: number;
    outerDiameter?: number;
    innerDiameter?: number;
    splay?: number;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

interface IAnimatedGearProps extends IGearProps {
    teethDiameterMax?: number;
    teethDiameterMin?: number;
    innerDiameterMax?: number;
    innerDiameterMin?: number;
    onDrawFinished?: () => void;
    onEraseFinished?: () => void;
}

declare class Gear extends Component<IGearProps> { }
declare class AnimatedGear extends Component<IAnimatedGearProps> { }