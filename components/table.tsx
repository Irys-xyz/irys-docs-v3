import cn from 'clsx'
import type { ComponentProps, FC } from 'react'

const Table_: FC<ComponentProps<'table'>> = props => (
    <table
        {...props}
        className={cn('block overflow-x-auto', props.className)}
    />
)
const Th: FC<ComponentProps<'th'>> = props => {
    return (
        <th
            {...props}
            className={cn(
                'm-0 border !border-grey4 px-4 py-2 font-semibold dark:border-gray-600 !font-gtPressura !normal-case',
                props.className
            )}
        />
    )
}
const Tr: FC<ComponentProps<'tr'>> = props => {
    return (
        <tr
            {...props}
            className={cn(
                'm-0 border-t !border-grey4 p-0 dark:!border-grey4',
                'even:bg-grey4/40 even:dark:bg-gray-600/20',
                props.className
            )}
        />
    )
}
const Td: FC<ComponentProps<'td'>> = props => {
    return (
        <td
            {...props}
            className={cn(
                'm-0 border !border-grey4 px-4 py-2 text-grey2 text-base',
                props.className
            )}
        />
    )
}

export const Table = Object.assign(Table_, {
    Th,
    Tr,
    Td
})