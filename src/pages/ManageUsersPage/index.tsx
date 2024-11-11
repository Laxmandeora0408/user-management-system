import React, { useLayoutEffect, useState } from 'react';
import { FaThList } from 'react-icons/fa';
import { MdGridOn } from 'react-icons/md';
import UserCard from '@components/UserCard';
import UserTable from '@components/UserTable';
import { UserData } from '../../interfaces';
import styles from './styles.module.scss';

const ManageUsersPage: React.FC = () => {
  let usersData: UserData[] =
    JSON.parse(localStorage.getItem('userData') || '[]') || [];
  usersData = [...usersData].sort(
    (a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime()
  );
  const [isGridView, setIsGridView] = useState(true);

  useLayoutEffect(() => {
    document.title = `UserProfile | Manage User`;
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1>Manage Users Profiles</h1>
        <div
          onClick={() => setIsGridView(!isGridView)}
          className={styles.gridIconContainer}
        >
          {usersData.length !== 0 ? (
            isGridView ? (
              <MdGridOn />
            ) : (
              <FaThList />
            )
          ) : null}
        </div>
      </div>

      {!usersData || usersData.length === 0 ? (
        <h2 className={styles.emptyText}>No user found yet!</h2>
      ) : isGridView ? (
        <div className={styles.gridContainer}>
          {usersData.map((user) => (
            <UserCard key={user.Id} {...user} showActionBtn />
          ))}
        </div>
      ) : (
        <UserTable users={usersData} showActionBtn />
      )}
    </div>
  );
};

export default ManageUsersPage;
