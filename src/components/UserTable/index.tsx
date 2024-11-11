import { AiOutlineDelete } from 'react-icons/ai';
import { MdOutlineEdit } from 'react-icons/md';
import { UserData } from '../../interfaces';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface UserTableProps {
  users: UserData[];
  showActionBtn?: boolean;
}

const UserTable: React.FC<UserTableProps> = ({ users, showActionBtn }) => {
  const columns = ['S/N', 'Name', 'Email', 'Role', 'Status', 'Actions'];
  const navigate = useNavigate();
  const userData: UserData[] =
    JSON.parse(localStorage.getItem('userData') || '[]') || [];

  const handleOnEdit = (Id: string) => {
    navigate(`/manage/${Id}`);
  };

  const handleOnDelete = (Id: string) => {
    const filterUserData = userData.filter((user) => user.Id !== Id);
    localStorage.setItem('userData', JSON.stringify(filterUserData));
    toast.success('User Profile deleted successfully!');
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns
              .filter((col) => (!showActionBtn ? col !== 'Actions' : col))
              .map((col, index) => (
                <th key={index} className={styles.thead}>
                  {col}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.Id} className={styles.row}>
              <td>{index + 1}</td>
              <td className={styles.profilePhoto}>
                <div>
                  <img src={user.ProfilePhoto} alt="avatar" />
                </div>
                <span>{user.Name}</span>
              </td>
              <td>{user.Email}</td>
              <td>{user.Role}</td>
              <td>
                <span
                  className={
                    user.Status === 'Active' ? 'text-green-500' : 'text-red-500'
                  }
                >
                  {user.Status}
                </span>
              </td>
              {showActionBtn && (
                <td className={styles.action}>
                  <div>
                    <MdOutlineEdit
                      className={styles.btn_edit}
                      onClick={() => handleOnEdit(user.Id)}
                    />
                    <AiOutlineDelete
                      className={styles.btn_delete}
                      onClick={() => handleOnDelete(user.Id)}
                    />
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
