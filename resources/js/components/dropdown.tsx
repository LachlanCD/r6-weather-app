type DropdownProps = {
    label: string;
    options: string[];
    selected: string;
    onChange: (value: string) => void;
};

export default function Dropdown({ label, options, selected, onChange }: DropdownProps) {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">{label}</label>
            <select
                value={selected}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-sky-100 border text-gray-800 border-sky-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
                <option value="">-- Choose an option --</option>
                {options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    );
}

