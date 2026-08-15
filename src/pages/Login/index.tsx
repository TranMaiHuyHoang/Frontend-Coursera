import Button from '@/components/common/Button/Index';
import InputText from '@/components/common/InputText/Indenx';
import { useAuth } from '@/contexts/authContext';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (key: string, value: any) => {
        setFormData({ ...formData, [key]: value });
    };

    const validate = () => {
        if (!formData.email || !formData.password) {
            toast.warning('Vui lòng nhập đầy đủ thông tin');
            return false;
        }

        if (!formData.email.includes('@')) {
            toast.warning('Enail không hợp lệ');
            return false;
        }

        if (formData.password.length < 5) {
            toast.warning('Mặt khẩu phải có ít nhất 5 ký tự');
            return false;
        }
        return true;
    };

    const handleLogin = async () => {
        if (!validate()) return;

        try {
            const response = await axios.post(
                'https://nestjs-api-coursera.onrender.com/auth/login',
                formData,
            );

            console.log('LOGIN RESPONSE:', response.data.data);

            const { user, token } = response.data.data;

            setAuth({
                user,
                token,
            });

            toast.success('Đăng nhập thành công');

            navigate('/');
        } catch (error) {
            console.error(error);
            toast.error('Đăng nhập thất bại');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Welcome Back
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Sign in to continue
                    </p>
                </div>

                <div className="space-y-5">
                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>

                        <InputText
                            value={formData.email}
                            onChange={(value) => handleChange('email', value)}
                            placeholder="Enter your email"
                            className="flex-1 w-full"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>

                        <InputText
                            type="password"
                            value={formData.password}
                            onChange={(value) =>
                                handleChange('password', value)
                            }
                            placeholder="Enter your password"
                            className="w-full"
                        />
                    </div>

                    {/* Remember & Forgot */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" />
                            <span className="text-gray-600">Remember me</span>
                        </label>

                        <a
                            href="#"
                            className="text-blue-600 hover:text-blue-700 hover:underline"
                        >
                            Forgot password?
                        </a>
                    </div>

                    {/* Button */}
                    <Button onClick={handleLogin} className="w-full">
                        Login
                    </Button>
                </div>

                {/* Register */}
                <p className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <a
                        href="#"
                        className="font-medium text-blue-600 hover:underline"
                    >
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
