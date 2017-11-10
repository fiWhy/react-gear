import * as React from "react";
import GearContainer from "./styled/gear";
import { rad, rx, ry, num, drawTeeth, radii } from "./lib";

const Gear = ({ radius, fill = "transparent", teeth = 8, off = 90, d1 = 1, d2 = .6875, d3 = .375, splay = .375 }) => {
    const svgSize = (radius + 10) * 2;
    const xyCenter = svgSize / 2;
    const angle = 360 / teeth;
    const viewBox = [0, 0, svgSize, svgSize].join(" ");
    const memoizeRaddiiSize = radii(svgSize);
    const radiis = {
        r1: memoizeRaddiiSize(d1),
        r2: memoizeRaddiiSize(d2),
        r3: memoizeRaddiiSize(d3)
    }
    const pathData = [
        drawTeeth(xyCenter, teeth, angle, off, radiis)
    ].join(' ');

    return <GearContainer>
        <svg width={svgSize} height={svgSize} viewBox={viewBox}>
            {/* <circle r={radius} cx={xyCenter} cy={xyCenter} fill={fill}></circle> */}
            <path d={pathData} />
        </svg>
    </GearContainer>
};

export default Gear;