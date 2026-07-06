import React from 'react';
import styles from '../../styles/common/InputField.module.css';

const InputField = ({
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    rightElement,
    id,
    ...props
}) => {
    return (
        <div className={styles.container}>
            <div className={styles.labelRow}>
                <label htmlFor={id} className={styles.label}>
                    {label}
                </label>
                {rightElement && (
                    <span className={styles.rightElement}>{rightElement}</span>
                )}
            </div>
            <input
                id={id}
                type={type}
                className={styles.input}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                {...props}
            />
        </div>
    );
};

export default InputField;