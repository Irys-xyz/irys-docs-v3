import cn from 'clsx'
import type { ComponentProps, FC } from 'react'

export const Code: FC<
    ComponentProps<'code'> & {
        'data-language'?: string
    }
> = ({ children, className, 'data-language': _language, ...props }) => {

    return (
        <code
            // className={cn(
            //     'nextra-code',
            //     'data-line-numbers' in props && '[counter-reset:line]',
            //     className
            // )}
            // // always show code blocks in ltr
            // dir="ltr"
            className={cn(
                !_language && 'bg-grey2/80 p-1 rounded-md text-grey5 before:!content-none after:!content-none normal-case',
                className
            )}
            {...props}
        >
            {children}
        </code>
    )
}