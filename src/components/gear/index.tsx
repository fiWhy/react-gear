import * as React from 'react';
import GearPresentation from "./components/gear";

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


export default class Gear extends React.Component<IGearProps, any>{
    constructor(props: any) {
        super(props);
    }

    render() {
        return <GearPresentation {...this.props} />;
    }
}