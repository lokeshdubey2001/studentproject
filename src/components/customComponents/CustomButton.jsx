const CustomButton = ({ type = 'button', label, className, ...rest }) => {
    return (
        <button
            type={type}
            className={`
                rounded-md shadow-md font-semibold 
                transition-all duration-500 ease-in-out transform 
                hover:translate-y-[-2px] 
                ${className}
            `}
            {...rest}
        >
            {label}
        </button>
    );
};

export default CustomButton;
