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
      <form onSubmit={onSubmit} className="container">
        <input
          required
          name="email"
          type="text"
          placeholder="Email"
          value={formData.email}
          onChange={onChangeForm}
          className="authInput"
        />
        <input
          required
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={onChangeForm}
          className="authInput"
        />
        <input
          className="authInput authSubmit"
          type="submit"
          value={newAccount ? 'Create Account' : 'Login'}
        />
        {error && <span className="authError">{error}</span>}
      </form>
      <span onClick={toggleAccount} className="authSwitch">
        {newAccount ? 'Login' : 'Create Account'}
      </span>
    </>
  );
};

export default AuthForm;
