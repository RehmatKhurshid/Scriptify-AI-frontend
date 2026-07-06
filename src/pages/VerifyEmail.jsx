import React from 'react';
import AuthLayout from '../components/layout/AuthLayout';
import VerifyEmailForm from '../components/auth/VerifyEmailForm';

const VerifyEmail = () => {
    return (
        <AuthLayout>
            <VerifyEmailForm />
        </AuthLayout>
    );
};

export default VerifyEmail;