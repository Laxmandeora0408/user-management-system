import { genRandNum } from '../../utils/genRandNum.util';
import { useNavigate } from 'react-router-dom';
import UserForm from '@components/UserForm';
import styles from './styles.module.scss';
import { UserData } from 'src/interfaces';
import { useLayoutEffect } from 'react';
import { toast } from 'sonner';

const AddUserPage: React.FC = () => {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    document.title = `UserProfile | Add User`;
  }, []);

  const onSubmit = (data: Omit<UserData, 'Id' | 'Date'>) => {
    const userData = JSON.parse(localStorage.getItem('userData') || '[]') || [];
    const newData = { ...data, Id: `${genRandNum()}`, Date: new Date() };
    localStorage.setItem('userData', JSON.stringify([...userData, newData]));
    toast.success('User added successfully!');
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>Add New User</h2>
        <UserForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default AddUserPage;
