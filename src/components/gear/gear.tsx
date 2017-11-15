import * as React from "react";
import GearContainer from "./styled/gear";
import { drawGear, drawCircle } from "./lib";

const Gear = ({ radius, roll = false,  fill = "transparent", teeth = 8, off = 90, teethDiameter = 1, outerDiameter = .6875, innerDiameter = .375, splay = .375, onMouseEnter, onMouseLeave }) => {
    const { pathData, svgSize, viewBox } = teeth ? drawGear({ radius, teeth, off, teethDiameter, outerDiameter, innerDiameter, splay }) :
        drawCircle(radius, outerDiameter, innerDiameter);
    return <GearContainer>
        <svg onMouseEnter={onMouseEnter} className={roll? "roll": ""} onMouseLeave={onMouseLeave} width={svgSize} height={svgSize} viewBox={viewBox}>
            <path d={pathData} />
        </svg>
    </GearContainer>
};

export default Gear;