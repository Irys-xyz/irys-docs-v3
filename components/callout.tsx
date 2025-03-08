const Callout = ({ emoji, children }: { emoji: string, children: React.ReactNode }) => {
    return (
        <div className="flex items-center gap-3 bg-secondary-blue p-6 rounded-xl text-white shadow-lg border border-white/10">
            {emoji && <span className="text-2xl flex-shrink-0">{emoji}</span>}
            <div className="text-left">{children}</div>
        </div>
    )
}

export default Callout;