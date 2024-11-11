import styles from './styles.module.scss';

interface props {
  text: string;
}

const ToolTip: React.FC<props> = ({ text }) => {
  return <span className={styles.toolTip}>{text}</span>;
};

export default ToolTip;
