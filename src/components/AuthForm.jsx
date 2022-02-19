import { useState } from 'react';
import { create_Email_Login, signIn_Whth_Email } from 'FB_Instance';

const AuthForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');

  const onChangeForm = (event) => {
    const { value, name } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      let data;
      if (newAccount) {
        data = await create_Email_Login(formData.email, formData.password);
      } else {
        data = await signIn_Whth_Email(formData.email, formData.password);
      }
      console.log(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          required
          name="email"
          type="text"
          placeholder="Email"
          value={formData.email}
          onChange={onChangeForm}
        />
        <input
          required
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={onChangeForm}
        />
        <input type="submit" value={newAccount ? 'Create Account' : 'Login'} />
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? 'Login' : 'Create Account'}
      </span>
    </>
  );
};

export default AuthForm;
