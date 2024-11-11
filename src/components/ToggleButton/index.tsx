import { useState } from 'react';
import styles from './styles.module.scss';

interface ToggleProps {
  state?: boolean;
  toggleState: (state: boolean) => void;
}

const ToggleButton: React.FC<ToggleProps> = ({
  state = false,
  toggleState,
}) => {
  const [isOn, setIsOn] = useState(state);

  const toggle = () => {
    setIsOn(!isOn);
    toggleState(isOn);
  };

  return (
    <div
      className={`${styles.container} ${isOn ? 'bg-blue-500' : 'bg-gray-300'}`}
      onClick={toggle}
    >
      <div
        className={`${styles.circle} ${isOn ? styles.circleIsOn : 'bg-white'}`}
      ></div>
    </div>
  );
};

export default ToggleButton;
