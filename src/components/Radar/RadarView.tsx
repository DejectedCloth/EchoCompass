import type { RadarContact } from "../../types/radar";

type RadarViewProps = {
    contacts: RadarContact[];
    size?: number;
}

function polartoCartesian(angleDeg: number, distance: number, radius: number, center: number) {
    const radians = (angleDeg - 90) * (Math.PI / 180);
    const r = distance * radius;

    return {
        x: center + r * Math.cos(radians),
        y: center + r * Math.sin(radians),
    };
}


export default function RadarView({contacts, size = 420} : RadarViewProps) {
    const center  = size / 2;
    const radius = size * 0.42

    return (
        <div className="radar-shell" style={{width: size, height: size, display: "flex", alignItems:"center", justifyContent: "center", overflow: "visible"}}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{display: "block"}}>
                <circle cx={center} cy={center} r={radius} fill="none" stroke="lime"/>
                <circle cx={center} cy={center} r={radius * 0.75} fill="none" stroke="lime"/>
                <circle cx={center} cy={center} r={radius * 0.5} fill="none" stroke="lime"/>
                <circle cx={center} cy={center} r={radius * 0.25} fill="none" stroke="lime"/>

                <line x1={center} y1={center - radius} x2={center} y2={center + radius} stroke="lime" />
                <line x1={center - radius} y1={center} x2={center + radius} y2={center} stroke="lime" />
                <line x1={center} y1={center} x2={center} y2={center - radius} stroke="lime" strokeWidth="2"/>

                {contacts.map((contact) => {
                    const {x, y} = polartoCartesian(contact.angleDeg, contact.distance, radius, center);
                    return (
                        <circle key={contact.id} cx={x} cy={y} r={6 + contact.strength * 6} fill="lime"/>
                    )
                })}
            </svg>
        </div>
    )
}
