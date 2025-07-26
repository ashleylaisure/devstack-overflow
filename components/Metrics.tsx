import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface Props {
    imgUrl: string;
    alt: string;
    value: string | number;
    title: string;
    textStyles?: string;
    href?: string;
    imgStyles?: string;
    isAuthor?: boolean;
}

const Metrics = ({ imgUrl, alt, value, title, textStyles, href, imgStyles, isAuthor }: Props) => {
    const metricContent = (
        <> 
            <Image
                src={imgUrl}
                alt={alt}
                width={20}
                height={20}
                className={`rounded-full object-contain invert-colors ${imgStyles}`}
            />

            <p className={`${textStyles} flex items-center gap-1`}>
                {value}
                <span className={`small-regular line-clamp-1 ${isAuthor? "max-sm:hidden" : ""}`}>{title}</span>
            </p>
        </>
    )
    return href ? (
        <Link href={href} className="flex-center gap-1">
            {metricContent}
        </Link> 
        ): (
        <div className="flex-center gap-1">
            {metricContent}
        </div>
    )
}

export default Metrics
