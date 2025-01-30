export interface TransitionSettings {
    // Basic transition settings
    duration: number;
    delay: number;
    type: "decay" | "spring" | "keyframes" | "tween" | "inertia";
    repeat: number;
    repeatType: "loop" | "reverse" | "mirror";
    repeatDelay: number;

    // Tween transition types
    ease:
        | "linear"
        | "easeIn"
        | "easeOut"
        | "easeInOut"
        | "circIn"
        | "circOut"
        | "circInOut"
        | "backIn"
        | "backOut"
        | "backInOut"
        | "anticipate";

    // Spring specific settings
    bounce: number;
    damping: number;
    mass: number;
    stiffness: number;
    velocity: number;
    restSpeed: number;
    restDelta: number;

    // Inertia specific settings
    power: number;
    timeConstant: number;
    min?: number;
    max?: number;
    bounceStiffness: number;
    bounceDamping: number;
}

export interface OnviewConfig {
    attribute_prefix: string;
    defaults: TransitionSettings;
}

const config: OnviewConfig = {
    attribute_prefix: "onview",
    defaults: {
        // Basic transition settings
        duration: 0.7,
        delay: 0,
        type: "tween",
        repeat: 0,
        repeatType: "loop",
        repeatDelay: 0,

        // Tween transition type
        ease: "easeInOut",

        // Spring specific settings
        bounce: 0.25,
        damping: 10,
        mass: 1,
        stiffness: 1,
        velocity: 0,
        restSpeed: 0.1,
        restDelta: 0.01,

        // Inertia specific settings
        power: 0.8,
        timeConstant: 700,
        min: undefined,
        max: undefined,
        bounceStiffness: 500,
        bounceDamping: 10,
    },
};

export default config;
