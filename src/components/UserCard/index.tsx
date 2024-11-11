import { AiOutlineDelete } from 'react-icons/ai';
import { MdOutlineEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../../interfaces';
import styles from './styles.module.scss';
import { toast } from 'sonner';

interface IUserCardProps extends UserData {
  showActionBtn?: boolean;
}

const UserCard: React.FC<IUserCardProps> = ({
  Id,
  Name,
  Email,
  Role,
  Status,
  ProfilePhoto,
  showActionBtn,
}) => {
  const navigate = useNavigate();
  const userData: UserData[] =
    JSON.parse(localStorage.getItem('userData') || '[]') || [];

  const handleOnEdit = () => {
    navigate(`/manage/${Id}`);
  };

  const handleOnDelete = () => {
    const filterUserData = userData.filter((user) => user.Id !== Id);
    localStorage.setItem('userData', JSON.stringify(filterUserData));
    toast.success('User Profile deleted successfully!');
    navigate('/');
  };

  return (
    <div className={styles.container}>
      {showActionBtn && (
        <div className={styles.btnActionContainer}>
          <MdOutlineEdit className={styles.btnEdit} onClick={handleOnEdit} />
          <AiOutlineDelete
            className={styles.btnDelete}
            onClick={handleOnDelete}
          />
        </div>
      )}
      <div className={styles.imgContainer}>
        <img src={ProfilePhoto} alt={`${Name}'s profile`} />
      </div>
      <div className={styles.textContainer}>
        <h2>{Name}</h2>
        <p>{Email}</p>
        <p>Role: {Role}</p>
        <p>
          Status:{' '}
          <span
            className={`text-sm ${
              Status === 'Active' ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {Status}
          </span>
        </p>
      </div>
    </div>
  );
};

export default UserCard;
