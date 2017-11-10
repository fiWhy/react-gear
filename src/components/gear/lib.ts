const rad = a => Math.PI * a / 180;

const rx = center => (r, a) => center + r * Math.cos(rad(a));

const ry = center => (r, a) => center + r * Math.sin(rad(a));

const toothAngle = base => angle => angle / base;

const toothWidth = (r, angle) => Math.tan(rad(angle)) * r;

var toothX = (angle, width) => Math.sin(rad(angle)) * width;

var toothY = (angle, width) => Math.cos(rad(angle)) * width;

const num = n => (n < 0.0000001) ? 0 : n;

const radii = size => d => d * size / 2;

var drawTeeth = (center, n, angle, offset, { r1, r2 }) => {
    const d = []
    const rxCentered = rx(center),
        ryCentered = ry(center),
        ta = toothAngle(4)(angle),
        tw = toothWidth(r1, ta);
    for (let i = 0; i < n; i++) {
        const a = angle * i - offset,
            a1 = a + ta,
            a2 = a + angle - ta;

        const line = [
            (i === 0) ? 'M' : 'L',
            num(rxCentered(r1, a)) + toothX(a, tw),
            num(ryCentered(r1, a)) - toothY(a, tw),
            'L',
            num(rxCentered(r2, a1) - toothX(a, tw)),
            num(ryCentered(r2, a1) + toothY(a, tw)),
            'A', r2, r2,
            '0 0 1',
            num(rxCentered(r2, a2)),
            num(ryCentered(r2, a2)),
        ].join(' ')
        d.push(line)
    }
    return d.join(' ')
}


export { rad, rx, ry, num, drawTeeth, radii };