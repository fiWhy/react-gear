const rad = a => Math.PI * a / 180;

const rx = center => (r, a) => center + r * Math.cos(rad(a));

const ry = center => (r, a) => center + r * Math.sin(rad(a));

const toothAngle = base => angle => angle / base;

const toothWidth = (r, angle, splay?) => Math.tan(rad(splay ? angle - splay : angle)) * r;

var toothX = (angle, width) => Math.sin(rad(angle)) * width;

var toothY = (angle, width) => Math.cos(rad(angle)) * width;

const num = n => (n < 0.0000001) ? 0 : n;

const radii = size => d => d * size / 2;

var drawTeeth = (center, n, angle, offset, splay, { r1, r2 }) => {
    const d = []
    const rxCentered = rx(center),
        ryCentered = ry(center),
        ta = toothAngle(4)(angle),
        calculatedSplay = splay * ta,
        tw = toothWidth(r1, ta, calculatedSplay);
    for (let i = 0; i < n; i++) {
        const a = angle * i - offset;
        const a1 = a + ta + calculatedSplay;
        const a2 = a + angle - ta - calculatedSplay;
        const tY = toothY(a, tw);
        const tX = toothX(a, tw);
        const line = [
            (i === 0) ? 'M' : 'L',
            num(rxCentered(r1, a)) + tX,
            num(ryCentered(r1, a)) - tY,
            'L',
            num(rxCentered(r1, a)) - tX,
            num(ryCentered(r1, a)) + tY,
            'L',
            num(rxCentered(r2, a1)),
            num(ryCentered(r2, a1)),
            'A', r2, r2,
            '0 0 1',
            num(rxCentered(r2, a2)),
            num(ryCentered(r2, a2)),
        ].join(' ');
        d.push(line)
    }
    return d.join(' ')
}


const hole = (center, r) => {
    return [
        'M', center, center - r,
        'A', r, r,
        '0 0 0',
        center, center + r,
        'A', r, r,
        '0 0 0',
        center, center - r,
    ].join(' ');
}

const drawGear = ({ radius, teeth = 8, off = 90, teethDiameter = 1, outerDiameter = .6875, innerDiameter = .375, splay = .375 }) => {
    const svgSize = (radius + 10) * 2;
    const xyCenter = svgSize / 2;
    const angle = 360 / teeth;
    const viewBox = [0, 0, svgSize, svgSize].join(" ");
    const memoizeRaddiiSize = radii(svgSize);
    const radiis = {
        r1: memoizeRaddiiSize(teethDiameter),
        r2: memoizeRaddiiSize(outerDiameter),
        r3: memoizeRaddiiSize(innerDiameter)
    }
    const pathData = [
        drawTeeth(xyCenter, teeth, angle, off, splay, { r1: radiis.r1, r2: radiis.r2 }),
        hole(xyCenter, radiis.r3)
    ].join(' ');

    return { pathData, svgSize, angle, viewBox, radiis, xyCenter };
}

const drawCircle = (radius, outerDiameter, innerDiameter = 0) => {
    const svgSize = (radius + 10) * 2;
    const xyCenter = svgSize / 2;
    const viewBox = [0, 0, svgSize, svgSize].join(" ");
    const memoizeRaddiiSize = radii(svgSize);
    const r = memoizeRaddiiSize(outerDiameter);
    const r2 = memoizeRaddiiSize(innerDiameter);
    const pathData = [
        hole(xyCenter, r),
    ].join(' ');

    return { pathData, svgSize, viewBox };
}

export { rad, rx, ry, num, drawTeeth, radii, hole, drawGear, drawCircle };