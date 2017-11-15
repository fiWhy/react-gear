import * as React from 'react';
import { AppService } from "./services/app.service";
import Gear from "../../components/gear/gear";

interface ITeethState {
    [x: string]: any;
    teeth: number;
    teethDiameter: number;
    teethDiameterMax: number;
    teethDiameterMin: number;
    outerDiameter: number;
    innerDiameter: number;
    innerDiameterMax: number;
    innerDiameterMin: number;
    roll: boolean;
}

interface IIntervalObject {
    [x: string]: any;
}

export default class App extends React.Component<any, ITeethState>{
    private potentialTeeth: number = 8;
    private drawInterval: IIntervalObject = {};
    private eraseInterval: IIntervalObject = {};
    constructor(props: any) {
        super(props);
        this.state = {
            teeth: 0,
            teethDiameter: .85,
            teethDiameterMax: 1,
            teethDiameterMin: .85,
            outerDiameter: .85,
            innerDiameter: 0,
            innerDiameterMax: .6,
            innerDiameterMin: 0,
            roll: false
        };
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
            this.rollForward();
        })
    }

    eraseGear = () => {
        this.rollBack();
        this.erase("teethDiameter").then(() => {
            this.setState({
                teeth: 0
            })
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
        const { teeth, innerDiameter, outerDiameter, teethDiameter, roll } = this.state;
        return <div><Gear radius={50}
            onMouseEnter={this.drawGear}
            onMouseLeave={this.eraseGear}
            teeth={teeth}
            roll={roll}
            outerDiameter={outerDiameter}
            teethDiameter={teethDiameter}
            innerDiameter={innerDiameter}
            fill={"red"} /></div>;
    }
}