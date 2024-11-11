import { RiArrowDownWideFill, RiArrowUpWideFill } from 'react-icons/ri';
import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';

interface Option {
  label: string;
  value: string;
}

interface IDropdownProps {
  options: Option[];
  value?: string;
  onSelect: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const Dropdown: React.FC<IDropdownProps> = ({
  options,
  value,
  onSelect,
  placeholder,
  disabled,
}) => {
  const dropDownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>(
    placeholder || (options.length > 0 ? options[0].label : 'Select Option')
  );

  const handleOptionClick = (option: Option) => {
    setSelectedValue(option.label);
    setIsOpen(false);
    setIsSelected(true);
    onSelect(option.value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (value) setSelectedValue(value);
  }, [value]);

  return (
    <div ref={dropDownRef} className={styles.container}>
      <div
        className={`${styles.input} ${
          disabled ? styles.inputDisabled : 'cursor-pointer'
        } ${isOpen && !disabled ? styles.inputIsOpen : ''} ${
          placeholder && !isSelected ? 'text-blue-200' : 'text-blue-400'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedValue}
        {isOpen && !disabled ? (
          <RiArrowUpWideFill size={20} />
        ) : (
          <RiArrowDownWideFill size={20} />
        )}
      </div>

      {isOpen && !disabled && (
        <div className={styles.dropdown}>
          {options.map((option, idx) => (
            <div
              key={option.value}
              className={`${styles.options} ${
                idx === options.length - 1 ? 'border-none' : ''
              } ${option.label === selectedValue ? styles.selectedOpt : ''}`}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
