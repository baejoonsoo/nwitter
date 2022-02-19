import AuthForm from 'components/AuthForm';
import {
  create_Email_Login,
  githubProvider,
  googleProvider,
  signIn_popup,
  signIn_Whth_Email,
} from 'FB_Instance';

const Auth = () => {
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
      <AuthForm />
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
