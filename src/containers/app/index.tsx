import * as React from 'react';
import { AppService } from "./services/app.service";
import Gear from "../../components/gear/gear";

export default class App extends React.Component<any, { teeth: number }>{
    constructor(props: any) {
        super(props);
        this.state = {
            teeth: 8
        };
    }

    componentDidMount() {
        // setInterval(() => {
        //     const { teeth } = this.state;
        //     this.setState({
        //         teeth: teeth + 2
        //     });
        // }, 1000);
    }

    render() {
        const { teeth } = this.state;
        return <div><Gear radius={50} teeth={teeth} fill={"red"} /></div>;
    }
}