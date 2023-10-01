import {Fragment} from 'react'
import {Listbox, Transition} from '@headlessui/react'
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/react/20/solid'
import {useStopEventPropagation} from "~/components/hooks/eventPropagation";

interface FormSelectProps<T> {
    label?: string;
    data: T[];
    value: T | T[];
    className?: string;
    displayMember: string;
    multiple?: boolean;
    placeholder?: string;
    onChange: (value: T | T[]) => void;
    beautify?: boolean;
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function FormSelect<T = any>(props: FormSelectProps<T>) {
    const {data, displayMember, value, multiple, onChange, placeholder, label} = props;

    const stopPropagation = useStopEventPropagation();

    const getButtonLabel = () => {
        const helper = placeholder ? placeholder : 'Select an option';

        if (multiple && Array.isArray(value)) {
            if (value.length === 0) {
                return helper;
            }

            return value.map((item) => item[displayMember]).join(', ');
        }


        return value ? value[displayMember] : helper;
    }

    const getLabel = () => {
        if (label) {
            return <Listbox.Label
                className="block text-xs text-gray-600 pb-1">{label}</Listbox.Label>
        }
    }

    const getOptionContent = (selected, active, entry: T) => {
        const label = <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                        {entry[displayMember]}
                     </span>

        if (selected) {
            return <>
                <span
                    className={classNames(active ? 'text-white' : 'text-red-400', 'absolute inset-y-0 left-0 flex items-center pl-1.5')}>
                      <CheckIcon className="h-4 w-4" aria-hidden="true"/>
                </span>
                {label}
            </>
        }

        return label;
    }

    const getOption = (entry: T, index: number) => {
        return <Listbox.Option key={`option-${index}`}
                               className={({active}) => classNames(active ? 'text-white bg-red-400' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-8 pr-4')}
                               value={entry}>
            {({selected, active}) => getOptionContent(selected, active, entry)}
        </Listbox.Option>
    }

    const getOptions = ({open}) => {
        return <div>
            {getLabel()}
            <div className="relative">
                <Listbox.Button
                    className="relative rounded-md p-1 w-full cursor-default border border-gray-300 bg-white pr-6 text-left shadow-sm focus:border-red-400 focus:outline-none focus:ring-1 focus:ring-red-300 sm:text-sm"
                    onMouseDown={(event) => stopPropagation(event, false)}>

                    <span className="block truncate">{getButtonLabel()}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                    </span>
                </Listbox.Button>

                <Transition show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0">
                    <Listbox.Options
                        onMouseDown={(event) => stopPropagation(event, false)}
                        className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm min-w-[12rem]">
                        {data.map(getOption)}
                    </Listbox.Options>
                </Transition>
            </div>
        </div>
    }

    return <Listbox value={value}
                    multiple={multiple}
                    onChange={onChange}>
        {getOptions}
    </Listbox>
}
