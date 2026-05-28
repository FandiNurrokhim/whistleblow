export default function Checkbox({ className = '', onCheckedChange, ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            onChange={(e) => {
                props.onChange?.(e); // tetap panggil onChange jika ada
                onCheckedChange?.(e.target.checked); // tambahan event custom
            }}
            className={
                'rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 ' +
                className
            }
        />
    );
}
