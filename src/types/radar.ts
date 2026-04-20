export type RadarContact = {
    id: string;
    angleDeg: number;
    distance: number;
    strength: number;
    kind: "footstep" | "gunshot" | "ambient" | "unknnown";
    timestamp: number;
};

export type DetectionEvent = {
    id: string;
    label: string;
    confidence: number;
    angleDeg: number;
    createdAt: number;
}