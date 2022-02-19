import {
  create_Email_Login,
  githubProvider,
  googleProvider,
  signIn_popup,
  signIn_Whth_Email,
} from 'FB_Instance';
import { useState } from 'react';

const Auth = () => {
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

  const onSocialClick = async ({ target: { name } }) => {
    let provider;

    if (name === 'google') {
      provider = googleProvider();
    } else if (name === 'github') {
      provider = githubProvider();
    }

    const data = await signIn_popup(provider);
    console.log(data);
  };

  return (
    <div>
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
      <div>
        <button name="google" onClick={onSocialClick}>
          Continue with Google
        </button>
        <button name="github" onClick={onSocialClick}>
          Continue with Github
        </button>
      </div>
    </div>
  );
};

export default Auth;
