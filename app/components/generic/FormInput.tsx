import React, {ChangeEvent, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import {useStopEventPropagation} from "~/components/hooks/eventPropagation";

interface InputProps {
    label?: string;
    value: boolean | string | number | undefined | null;
    onChange?: (value: any | string | number) => void;

    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onEnter?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    className?: string;
    inputClassName?: string;
    actionButton?: JSX.Element;
    pattern?: string;
    required?: boolean;
    readOnly?: boolean;
    min?: number;
    max?: number;
    autoFocus?: boolean;
}

export default function FormInput(props: InputProps) {
    const [name]          = useState('name-' + uuidv4());

    const stopPropagation = useStopEventPropagation();

    const getLabel = () => {
        if (props.label) {
            return <label htmlFor={name}
                          className="block text-xs text-gray-600 pb-1">
                {props.label}
            </label>
        }
    }

    const onValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.onChange?.(event.target.value);
    }

    const getSelection = () => {
        if (window.getSelection) {
            return window.getSelection()!.toString();
        } else if (document.getSelection) {
            return document.getSelection()!.toString();
        }

        return null;
    }

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onValueChange?.(event as any);
            props.onEnter?.(event);
            stopPropagation(event);
            return;
        }

        if (event.key === 'Backspace' || event.key === 'Delete') {
            const textLength  = event.currentTarget.value.length;
            const allSelected = event.currentTarget.value === getSelection();

            if (allSelected || textLength === 1) {
                event.currentTarget.value = '';
                stopPropagation(event);
            }
        }
    }

    const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        props.onBlur?.(event);
    }

    return <div className={`${props.className ?? ''} flex flex-col`}>
        {getLabel()}
        <div className="relative">
            <input type='text'
                   autoFocus={props.autoFocus}
                   name={name}
                   min={props.min}
                   max={props.max}
                   readOnly={props.readOnly}
                   onBlur={onBlur}
                   onChange={onValueChange}
                   onMouseDown={(event) => stopPropagation(event, false)}
                   required={props.required}
                   pattern={props.pattern}
                   onKeyDown={onKeyDown}
                   autoComplete='off'
                   className={`block w-full rounded-md p-1 border-gray-300 shadow-sm 
                   inset-0 ring-1 ring-inset ring-gray-300
                   focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-400
                   sm:text-sm ${props.inputClassName ?? ''}`}
            />
            <div
                className="absolute right-3 top-0 flex flex-col text-gray-500 items-center justify-center cursor-pointer h-full hover:text-black transition-all">
                {props.actionButton}
            </div>
        </div>
    </div>
}
