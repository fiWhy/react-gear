import * as React from "react";
import { create } from "react-test-renderer";
import "jest";
import Gear from "./gear";

describe("Gear Component", () => {
    const component = create(<Gear />)
    const tree = component.toJSON();
    it("renders", () => {
        expect(tree).toMatchSnapshot();
    })
})