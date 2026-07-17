import React from 'react';
import AuthLayout from '../../components/layout/AuthLayout';
import SignUpForm from '../../components/auth/SignUpForm';

const SignUp = () => {
    return (
        <AuthLayout>
            <SignUpForm />
        </AuthLayout>
    );
};

export default SignUp;