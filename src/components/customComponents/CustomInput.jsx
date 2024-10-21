const CustomInput = ({ label, placeholder, className = '', value, id, name, onChange, ...rest }) => {
    return (
        <div className={`flex flex-col mb-4 ${className}`}>
            {label && <label className="mb-2 font-semibold text-gray-700">{label}</label>}
            <input
                value={value}
                id={id}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                {...rest}
            />
        </div>
    )
}

export default CustomInput