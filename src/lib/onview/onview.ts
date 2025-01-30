// src/scripts/motion-utils.lib
import { animate, type AnimationOptions, inView } from "motion";
import config, { type TransitionSettings } from "@/lib/onview/config";
import animations from "@/lib/onview/animations";
import getAttribute from "@/lib/onview/helpers/getAttribute";

function removeDataAttributes(element: Element) {
    const attributes = element.getAttributeNames();
    attributes.forEach((attribute) => {
        if (attribute.startsWith(`data-${config.attribute_prefix}`)) {
            element.removeAttribute(attribute);
        }
    });
}

// Initialize animations
function enable() {
    const elements = document.querySelectorAll(`[data-${config.attribute_prefix}]`);

    elements.forEach((element: Element) => {
        const animationName = getAttribute(element);
        if (!animationName) return;

        const animationConfig = animations[animationName as keyof typeof animations];

        if (animationConfig) {
            const { initial, animate: animateProps } = animationConfig;

            const options: TransitionSettings = {
                bounce: parseFloat(getAttribute(element, "bounce", config.defaults.bounce)),
                bounceDamping: parseFloat(
                    getAttribute(element, "bounce-damping", config.defaults.bounceDamping),
                ),
                bounceStiffness: parseFloat(
                    getAttribute(element, "bounce-stiffness", config.defaults.bounceStiffness),
                ),
                damping: parseFloat(getAttribute(element, "damping", config.defaults.damping)),
                delay: parseFloat(getAttribute(element, "delay", config.defaults.delay)),
                duration: parseFloat(getAttribute(element, "duration", config.defaults.duration)),
                ease: getAttribute(
                    element,
                    "ease",
                    config.defaults.ease,
                ) as TransitionSettings["ease"],
                mass: parseFloat(getAttribute(element, "mass", config.defaults.mass)),
                power: parseFloat(getAttribute(element, "power", config.defaults.power)),
                repeat: parseFloat(getAttribute(element, "repeat", config.defaults.repeat)),
                repeatDelay: parseFloat(
                    getAttribute(element, "repeat-delay", config.defaults.repeatDelay),
                ),
                repeatType: getAttribute(
                    element,
                    "repeat-type",
                    config.defaults.repeatType,
                ) as TransitionSettings["repeatType"],
                restDelta: parseFloat(
                    getAttribute(element, "rest-delta", config.defaults.restDelta),
                ),
                restSpeed: parseFloat(
                    getAttribute(element, "rest-speed", config.defaults.restSpeed),
                ),
                stiffness: parseFloat(
                    getAttribute(element, "stiffness", config.defaults.stiffness),
                ),
                timeConstant: parseFloat(
                    getAttribute(element, "time-constant", config.defaults.timeConstant),
                ),
                type: getAttribute(
                    element,
                    "type",
                    config.defaults.type,
                ) as TransitionSettings["type"],
                velocity: parseFloat(getAttribute(element, "velocity", config.defaults.velocity)),
            };

            // Set initial styles
            Object.assign((element as HTMLElement).style, initial);

            // Trigger animation when in view
            inView(element, (element) => {
                animate(
                    element,
                    animateProps as Record<string, string | number>,
                    options as AnimationOptions,
                );
            });

            // Remove data attributes from element
            removeDataAttributes(element);
        } else {
            console.warn(`No predefined animation found for "${animationName}"`);
        }
    });
}

export default {
    enable,
};
