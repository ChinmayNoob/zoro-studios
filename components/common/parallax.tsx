import React, { useRef } from "react";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame,
} from "motion/react";
import { wrap } from "@motionone/utils";

import Image from "next/image";

export const CART_ONE = ["/images/awards/award1.png", "/images/awards/award2.png", "/images/awards/award3.png"];
export const CART_TWO = ["/images/awards/award4.png", "/images/awards/award5.png", "/images/awards/award6.png"];
export const CART_THREE = ["/images/awards/award7.png", "/images/awards/award8.png", "/images/awards/award9.png"];

interface ParallaxProps {
    children: React.ReactNode;
    baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
    const baseY = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400,
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false,
    });

    const y = useTransform(baseY, (v) => `${wrap(-25, -50, v)}%`);
    const directionFactor = useRef<number>(1);

    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();
        baseY.set(baseY.get() + moveBy);
    });

    return (
        <div className="parallax-vertical">
            <motion.div className="scroller-vertical" style={{ y }}>
                <span>{children}</span>
                <span>{children}</span>
                <span>{children}</span>
                <span>{children}</span>
            </motion.div>
        </div>
    );
}

export default function ParallaxMarquee() {
    return (
        <section className="flex w-full h-screen">
            <ParallaxText baseVelocity={2}>
                {CART_ONE.map((item, index) => (
                    <img key={index} src={item} alt="" />
                ))}
            </ParallaxText>
            <ParallaxText baseVelocity={-2}>
                {CART_TWO.map((item, index) => (
                    <img key={index} src={item} alt=""/>
                ))}
            </ParallaxText>
            <ParallaxText baseVelocity={2}>
                {CART_THREE.map((item, index) => (
                    <img key={index} src={item} alt="" />
                ))}
            </ParallaxText>
        </section>
    );
}
