import { Navigate, useNavigate, useParams } from 'react-router-dom';
import UserForm from '@components/UserForm';
import { UserData } from '../../interfaces';
import styles from './styles.module.scss';
import { useLayoutEffect } from 'react';
import { toast } from 'sonner';

const EditUserPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userData: UserData[] =
    JSON.parse(localStorage.getItem('userData') || '[]') || [];
  const index = userData.findIndex((data) => data.Id === id);

  // Redirect to HomePage if user data is not found
  if (index === -1) return Navigate({ to: '/' });

  useLayoutEffect(() => {
    document.title = `UserProfile | Edit User`;
  }, []);

  const onSubmit = (data: Omit<UserData, 'Id' | 'Date'>) => {
    userData[index] = {
      ...userData[index],
      ...data,
    };
    localStorage.setItem('userData', JSON.stringify(userData));
    toast.success('User edited successfully!');
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>Edit User</h2>
        <UserForm onSubmit={onSubmit} userData={userData[index]} />
      </div>
    </div>
  );
};

export default EditUserPage;
