import React from 'react';
import AuthLayout from '../components/layout/AuthLayout';
import SignInForm from '../components/auth/SignInForm';

const SignIn = () => {
    return (
        <AuthLayout>
            <SignInForm />
        </AuthLayout>
    );
};

export default SignIn;