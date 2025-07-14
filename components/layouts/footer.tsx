'use client'

import gsap from "gsap"
import { useContext, useEffect, useRef } from "react";
import { LoadingContext } from "@/components/layouts/layout-main";
import { TextReveal } from "../common/text-reveal";
import { FOOTER_LINKS } from "@/constants/footer";
import Link from "next/link";
import ScrollTrigger from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);


const Footer = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const { isLoading, animationComplete } = useContext(LoadingContext);

    useEffect(() => {
        if (!isLoading && animationComplete) {
            initializeGSAP();
        }
    }, [isLoading, animationComplete]);
    const initializeGSAP = () => {
        const ctx = gsap.context(() => {
            ScrollTrigger.getAll().forEach((st) => st.kill());
            ScrollTrigger.refresh();

            setTimeout(() => {
                gsap.to(contentRef.current, {
                    rotateX: "0deg",
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "top center",
                        scrub: true,
                    },
                });

                ScrollTrigger.create({
                    trigger: sectionRef.current,
                    start: "bottom bottom-=300",
                    end: "bottom top-=300",
                    pin: true,
                    pinSpacing: false,
                });

                gsap.to(sectionRef.current, {
                    rotateX: "12deg",
                    scale: 0.92,
                    opacity: 0.8,
                    transformOrigin: "center bottom",
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "bottom bottom-=300",
                        end: "bottom bottom-=500",
                        scrub: true,
                    },
                });
            }, 100);
        }, sectionRef);

        return () => ctx.revert();
    };
    return (
        <footer
            ref={sectionRef}
            className="bg-[#146321] min-h-screen perspective-section relative z-20"
        >
            <div className="w-[90%] max-w-[1440px] mx-auto pt-[4.5rem] pb-12 flex flex-col justify-between h-full">
                <h2 className="font-anton-sc text-[11.37rem] uppercase text-white leading-[100%]">
                    <TextReveal
                        splitType="chars"
                        direction="up"
                        duration={0.7}
                        stagger={0.08}
                    >
                        ZORO
                    </TextReveal>
                </h2>

                <div className="flex justify-between">
                    {FOOTER_LINKS.map((links, index) => (
                        <div key={index} className="space-y-6 flex flex-col">
                            <h4 className="font-gambetta text-2xl text-white">
                                <TextReveal
                                    splitType="words"
                                    direction="up"
                                    duration={0.7}
                                    stagger={0.08}
                                    delay={index * 0.05}
                                >
                                    {`(${links.category})`}
                                </TextReveal>
                            </h4>
                            <div className="flex flex-col gap-4">
                                {links?.links?.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.href}
                                        className="text-white text-xl leading-[130%] font-semibold"
                                    >
                                        <TextReveal
                                            splitType="words"
                                            direction="up"
                                            duration={0.7}
                                            stagger={0.08}
                                            delay={index * 0.05}
                                        >
                                            {link.name}
                                        </TextReveal>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </footer>
    );
}

export default Footer;