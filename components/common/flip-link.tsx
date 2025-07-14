// };
"use client";

import { motion } from "motion/react";


const DURATION = 0.25;
const STAGGER = 0.025;

export const FlipLink = ({
    children,
    href,
    onClick,
}: {
    children: string;
    href: string;
    onClick?: (e: { preventDefault: () => void }) => void;
}) => {
    return (
        <a href={href} onClick={onClick}>
            <motion.span
                initial="initial"
                whileHover="hovered"
                className="relative block overflow-hidden whitespace-nowrap"
                style={{
                    lineHeight: 0.75,
                }}
            >
                <div>
                    {children.split("").map((l, i) => (
                        <motion.span
                            variants={{
                                initial: {
                                    y: 0,
                                },
                                hovered: {
                                    y: "-100%",
                                },
                            }}
                            transition={{
                                duration: DURATION,
                                ease: "easeInOut",
                                delay: STAGGER * i,
                            }}
                            className="inline-block"
                            key={i}
                        >
                            {l}
                        </motion.span>
                    ))}
                </div>
                <div className="absolute inset-0">
                    {children.split("").map((l, i) => (
                        <motion.span
                            variants={{
                                initial: {
                                    y: "100%",
                                },
                                hovered: {
                                    y: 0,
                                },
                            }}
                            transition={{
                                duration: DURATION,
                                ease: "easeInOut",
                                delay: STAGGER * i,
                            }}
                            className="inline-block"
                            key={i}
                        >
                            {l}
                        </motion.span>
                    ))}
                </div>
            </motion.span>
        </a>
    );
};
