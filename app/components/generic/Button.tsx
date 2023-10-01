import {forwardRef, PropsWithChildren} from 'react'
import clsx from 'clsx'
import {Link} from "@remix-run/react";

const baseStyles = {
    solid: 'inline-flex justify-center rounded-lg py-2 px-3 text-sm font-semibold outline-2 outline-offset-2 transition-colors',
    outline: 'inline-flex justify-center rounded-lg border py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-sm outline-2 outline-offset-2 transition-colors',
}

const variantStyles = {
    solid: {
        red: 'relative overflow-hidden bg-red-400 text-white before:absolute before:inset-0 active:before:bg-transparent hover:before:bg-white/10 active:bg-red-600 active:text-white/80 before:transition-colors',
        white: 'bg-white text-cyan-900 hover:bg-white/90 active:bg-white/90 active:text-cyan-900/70 inset-0 ring-1 ring-inset ring-gray-300',
        gray: 'bg-gray-800 text-white hover:bg-gray-900 active:bg-gray-800 active:text-white/80',
    },
    outline: {
        gray: 'border-gray-300 text-gray-700 hover:border-gray-400 active:bg-gray-100 active:text-gray-700/80',
    },
}


interface ButtonInnerProps {
    variant?: 'solid' | 'outline';
    color?: 'red' | 'white' | 'gray' | 'cyan';
    className?: string;
    href?: string;
    onClick?: (event) => void;
    onMouseDown?: (event) => void;
}

function ButtonInner(props: PropsWithChildren<ButtonInnerProps>, ref) {
    const {
        variant = 'solid',
        color   = 'red',
        className,
        href
    } = props;

    const classes = clsx(
        baseStyles[variant],
        variantStyles[variant][color],
        className
    );

    return href ?
        <Link ref={ref} to={href}
              onClick={props.onClick}
              onMouseDown={props.onMouseDown}
              className={classes}>
            {props.children}
        </Link> :
        <button ref={ref} className={classes}
                onClick={props.onClick}
                onMouseDown={props.onMouseDown}>
            {props.children}
        </button>;
}

export const Button = forwardRef(ButtonInner);
