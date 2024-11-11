import {
  isValidAll,
  isValidEmail,
  isValidFullName,
} from '../../utils/validate.util';
import React, { ChangeEvent, useState } from 'react';
import styles from './styles.module.scss';
import Dropdown from '@components/Dropdown';
import { roleOpts } from '../../data/formData';
import ToggleButton from '@components/ToggleButton';
import { PiUserBold } from 'react-icons/pi';
import { UserData } from '../../interfaces';

interface IUserFormProps {
  userData?: UserData;
  onSubmit: (userData: Omit<UserData, 'Id' | 'Date'>) => void;
}

const UserForm: React.FC<IUserFormProps> = ({ onSubmit, userData }) => {
  const [value, setValue] = useState<{ [key: string]: string }>({
    Name: userData?.Name || '',
    Email: userData?.Email || '',
    Role: userData?.Role || 'Admin',
    Status: userData?.Status || 'Inactive',
  });
  const { Name, Email, Role, Status } = value;
  const [profilePhoto, setProfilePhoto] = useState<string | null>(
    userData?.ProfilePhoto || null
  );
  const disabled =
    !isValidFullName(Name) || !isValidEmail(Email) || !profilePhoto;
  const [error, setError] = useState('');
  const [isValidInput, setIsValidInput] = useState<{ [key: string]: boolean }>({
    Name: false,
    Email: false,
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePhoto(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(Email)) {
      setError('Please enter a valid email');
      return;
    }
    if (!profilePhoto) {
      setError('No file uploaded!');
      return;
    }
    onSubmit({ Name, Email, Role, Status, ProfilePhoto: profilePhoto });
  };

  const handleOnInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.target;
    setValue((prevState) => ({ ...prevState, [name]: value }));
    setIsValidInput((prevState) => ({
      ...prevState,
      [name]: !isValidAll(value, name),
    }));
  };

  const handleOnToggle = (isOn: boolean) => {
    setValue((prevState) => ({
      ...prevState,
      Status: !isOn ? 'Active' : 'Inactive',
    }));
  };

  const handleOnSelect = (value: string) => {
    setValue((prevState) => ({ ...prevState, Role: value }));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.photoWrapper}>
        <div className={styles.photo}>
          {profilePhoto ? (
            <img src={profilePhoto} alt="photo" />
          ) : (
            <PiUserBold />
          )}
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {['Name', 'Email'].map((data, index) => (
        <div key={index} className={styles.inputWrapper}>
          <label htmlFor={data}>{data}</label>
          <input
            id={data}
            className={`${styles.input} ${
              isValidInput[data] && value[data] !== '' ? styles.inputError : ''
            }`}
            name={data}
            placeholder={data === 'Email' ? data : 'Full Name'}
            type={data === 'Email' ? 'email' : 'text'}
            value={data === 'Email' ? Email : Name}
            onChange={handleOnInputChange}
            required
          />
          {isValidInput[data] && value[data] !== '' && (
            <span className={styles.errorText}>{`Invalid ${data}!`}</span>
          )}
        </div>
      ))}
      <div className={styles.inputWrapper}>
        <label>Role</label>
        <Dropdown
          value={userData?.Role}
          options={roleOpts}
          onSelect={handleOnSelect}
        />
      </div>
      <div className={styles.statusPhotoWrapper}>
        <div className={styles.inputWrapper}>
          <label>Status</label>
          <ToggleButton
            state={userData?.Status === 'Active' ? true : false}
            toggleState={handleOnToggle}
          />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor='photo'>Profile Photo</label>
          <label htmlFor="photo">
            <div
              className={`${styles.btnUpload} ${
                profilePhoto ? styles.btnUploaded : ''
              }`}
            >
              {profilePhoto ? 'Uploaded' : 'Upload Photo'}
            </div>
          </label>
          <input
            id="photo"
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            hidden
          />
        </div>
      </div>

      <div className={styles.btnWrapper}>
        <button disabled={disabled} type="submit" className={styles.btnAdd}>
          {userData ? 'Edit User' : 'Add User'}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
