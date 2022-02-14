const canvas = new fabric.Canvas("incenter-canvas", { selection: false });

const bisectionOnAB = makeLine();
const bisectionOnAC = makeLine();
const bisectionOnBC = makeLine();

// vertexes
const aLabel = makeLabel("A");
const bLabel = makeLabel("B");
const cLabel = makeLabel("C");

const iLabel = makeLabel("I");

const incircle = makeCircle();

const triangle = makeMovablePolygon([{
    x: 125, y: 50
}, {
    x: 50, y: 250
}, {
    x: 250, y: 250
}], function (coords) {
    aLabel.set({ left: coords[0].x, top: coords[0].y - 30 });
    bLabel.set({ left: coords[1].x - 15, top: coords[1].y });
    cLabel.set({ left: coords[2].x + 5, top: coords[2].y });

    const incenter = calculateIncenter(coords[0], coords[1], coords[2]);
    iLabel.set({ left: incenter.x + 5, top: incenter.y + 5 });
    const onBC = calculateIntersect(makeLine(coords[0], incenter), makeLine(coords[1], coords[2]), true);
    const onAC = calculateIntersect(makeLine(coords[1], incenter), makeLine(coords[0], coords[2]), true);
    const onAB = calculateIntersect(makeLine(coords[2], incenter), makeLine(coords[0], coords[1]), true);

    bisectionOnAB.set({
        x1: coords[2].x, y1: coords[2].y,
        x2: onAB.x, y2: onAB.y
    });
    bisectionOnAC.set({
        x1: coords[1].x, y1: coords[1].y,
        x2: onAC.x, y2: onAC.y
    });
    bisectionOnBC.set({
        x1: coords[0].x, y1: coords[0].y,
        x2: onBC.x, y2: onBC.y
    });

    const radius = calculateDistanceFromPointToLine(incenter, makeLine(coords[1], coords[2]));
    centerOfCircle = incircle.translateToCenterPoint({ x: incenter.x, y: incenter.y }, "right", "bottom");
    incircle.set({ radius, left: centerOfCircle.x, top: centerOfCircle.y });
});

canvas.add(triangle);

canvas.add(iLabel);

canvas.add(aLabel);
canvas.add(bLabel);
canvas.add(cLabel);

canvas.add(bisectionOnAB);
canvas.add(bisectionOnAC);
canvas.add(bisectionOnBC);

canvas.add(incircle)
