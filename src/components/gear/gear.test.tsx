import * as React from "react";
import { create } from "react-test-renderer";
import "jest";
import Gear from "./gear";

describe("Gear Component", () => {
    const component = create(<Gear radius={10} onMouseEnter={() => { }} onMouseLeave={() => { }} />)
    const tree = component.toJSON();
    it("renders", () => {
        expect(tree).toMatchSnapshot();
    })
})