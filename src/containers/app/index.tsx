import * as React from 'react';
import Gear from "../../components/gear";

import { IGearProps } from "../../components/gear";

interface IAnimatedGearState extends IGearProps {
    [x: string]: any;
    teethDiameterMax?: number;
    teethDiameterMin?: number;
    innerDiameterMax?: number;
    innerDiameterMin?: number;
    onDrawFinished?: () => void;
    onEraseFinished?: () => void;
}

interface IanimatedGearProps extends IAnimatedGearState {
    fill: string;
}

interface IIntervalObject {
    [x: string]: any;
}

export default class AnimatedGear extends React.Component<IanimatedGearProps, IAnimatedGearState>{
    private potentialTeeth: number = this.props.teeth || 8;
    private drawInterval: IIntervalObject = {};
    private eraseInterval: IIntervalObject = {};
    constructor(props: any) {
        super(props);
        this.state = Object.assign({
            teeth: 0,
            teethDiameter: .85,
            teethDiameterMax: 1,
            teethDiameterMin: .85,
            outerDiameter: .85,
            innerDiameter: 0,
            innerDiameterMax: .6,
            innerDiameterMin: 0,
            roll: false
        }, this.props);
    }

    stopDraw(element) {
        clearInterval(this.drawInterval[element]);
    }

    stopErase(element) {
        clearInterval(this.eraseInterval[element]);
    }

    draw(element: string, speed: number = 50) {
        this.stopErase(element);
        this.setState({
            teeth: this.potentialTeeth
        });
        let maxDiameter = this.state[`${element}Max`];
        return new Promise((resolve, reject) => {
            this.drawInterval[element] = setInterval(() => {
                this.setState({
                    [element]: this.state[element] + .01
                })
                if (this.state[element] >= maxDiameter) {
                    this.stopDraw(element);
                    resolve();
                }
            }, speed);
        });
    }

    erase(element: string, speed: number = 50) {
        this.stopDraw(element);
        let minDiameter = this.state[`${element}Min`];
        return new Promise((resolve, reject) => {
            this.eraseInterval[element] = setInterval(() => {
                this.setState({
                    [element]: this.state[element] - .01
                })
                if (this.state[element] <= minDiameter) {
                    this.stopErase(element);
                    resolve()
                }
            }, speed);
        })

    }

    drawGear = () => {
        Promise.all([
            this.draw("teethDiameter"),
            this.draw("innerDiameter", 10)
        ]).then(() => {
            const { onDrawFinished } = this.props;

            this.rollForward();

            onDrawFinished && onDrawFinished()
        })
    }

    eraseGear = () => {
        this.rollBack();
        this.erase("teethDiameter").then(() => {
            const { onEraseFinished } = this.props;

            this.setState({
                teeth: 0
            })
            
            onEraseFinished && onEraseFinished();
        });
        this.erase("innerDiameter", 10);
    }

    rollForward() {
        this.setState({
            roll: true
        })
    }

    rollBack() {
        this.setState({
            roll: false
        })
    }

    render() {
        const { teeth, infinite, radius, innerDiameter, outerDiameter, teethDiameter, roll, fill } = this.state;
        return <Gear radius={radius}
            onMouseEnter={this.drawGear}
            onMouseLeave={this.eraseGear}
            infinite={infinite}
            teeth={teeth}
            roll={roll}
            outerDiameter={outerDiameter}
            teethDiameter={teethDiameter}
            innerDiameter={innerDiameter}
            fill={fill} />;
    }
}