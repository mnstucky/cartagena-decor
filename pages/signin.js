import React from 'react';
import {
  providers, signIn, csrfToken, useSession,
} from 'next-auth/client';
import { useRouter } from 'next/router';

function SignIn({ providers, csrfToken }) {
  const [session, loading] = useSession();
  const router = useRouter();
  if (session) {
    router.push('/profile');
    return null;
  }
  console.log(providers);
  return (
    <div className="container pr-3 pl-3">
      <h1 className="title is-4 mt-2">Sign In</h1>
      <form method="post" action="/api/auth/signin/email">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <div className="field">
          <label className="label" htmlFor="email">
            Email address
          </label>
          <div className="control">
            <input className="input" type="email" id="email" name="email" />
          </div>
        </div>
        <div className="control">
          <button className="button is-primary" type="submit">Sign in with Email</button>
        </div>
      </form>
      <button type="button" className="button is-white p-0 mt-2">
        <img src="/images/btn_google_signin_dark_normal_web.png" alt="Sign in with Google" onClick={() => signIn('google')} />
      </button>
    </div>
  );
}

export default SignIn;

SignIn.getInitialProps = async (context) => ({
  providers: await providers(),
  csrfToken: await csrfToken(context),
});
