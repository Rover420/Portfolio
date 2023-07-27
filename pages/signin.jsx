import dynamic from "next/dynamic";

const SignInPage = dynamic(() => import("@/components/main/signinpage"));

const SignIn = ({ t, initialProviders }) => {

  return <SignInPage t={t} initialProviders={initialProviders} />
}

export default SignIn

export async function getStaticProps({ locale }) {

    const rawt = await require(`@/locale/${locale ?? 'en'}`);

    const t = rawt.signin

    const initialProviders = [
      {id: 'discord', name: 'Discord', type: 'oauth', signinUrl: 'http://localhost:3000/api/auth/signin/discord', callbackUrl: 'http://localhost:3000/api/auth/callback/discord'},
      {id: 'github', name: 'GitHub', type: 'oauth', signinUrl: 'http://localhost:3000/api/auth/signin/github', callbackUrl: 'http://localhost:3000/api/auth/callback/github'},
      {id: 'facebook', name: 'Facebook', type: 'oauth', signinUrl: 'http://localhost:3000/api/auth/signin/facebook', callbackUrl: 'http://localhost:3000/api/auth/callback/facebook'},
      {id: 'google', name: 'Google', type: 'oauth', signinUrl: 'http://localhost:3000/api/auth/signin/google', callbackUrl: 'http://localhost:3000/api/auth/callback/google'}
    ]
  
    return {
      props: { t, initialProviders },
      revalidate: 60,
    };
}
  