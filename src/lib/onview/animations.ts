// Define a set of predefined animations
const animations = {
    "fade-in": {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
    },
    "fade-up": {
        initial: { opacity: 0, transform: "translateY(20px)" },
        animate: { opacity: 1, transform: "translateY(0)" },
    },
    "fade-down": {
        initial: { opacity: 0, transform: "translateY(-20px)" },
        animate: { opacity: 1, transform: "translateY(0)" },
    },
    "fade-left": {
        initial: { opacity: 0, transform: "translateX(20px)" },
        animate: { opacity: 1, transform: "translateX(0)" },
    },
    "fade-right": {
        initial: { opacity: 0, transform: "translateX(-20px)" },
        animate: { opacity: 1, transform: "translateX(0)" },
    },
    "fade-zoom": {
        initial: { opacity: 0, transform: "scale(0.8)" },
        animate: { opacity: 1, transform: "scale(1)" },
    },
};

export default animations;
