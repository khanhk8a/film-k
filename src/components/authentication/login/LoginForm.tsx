import * as Yup from 'yup';
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import {
    Link as MuiLink,
    Stack,
    Checkbox,
    TextField,
    IconButton,
    InputAdornment,
    FormControlLabel
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { login } from '@/service/auth/auth.service';

// ----------------------------------------------------------------------

const LoginForm = (): JSX.Element => {
    const navigate = useNavigate();
    const [message, setMessage] = useState<string>(''); // Thông báo lỗi
    const [showPassword, setShowPassword] = useState(false); // Ẩn/hiện mật khẩu

    // Định nghĩa schema kiểm tra cho form
    const LoginSchema = Yup.object().shape({
        username: Yup.string().required('Vui lòng nhập tên đăng nhập'),
        password: Yup.string().required('Vui lòng nhập mật khẩu')
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            remember: true
        },
        validationSchema: LoginSchema,
        onSubmit: (values) => {
            const { username, password } = values;
            setMessage(''); 
            login(username, password)
                .then(() => {
                    navigate('/dashboard');
                })
                .catch((error) => {
                    const resMessage =
                        (error.response && error.response.data && error.response.data.message) ||
                        error.message ||
                        error.toString();
                    setMessage(resMessage);
                });
        }
    });

    const { errors, touched, values, isSubmitting, getFieldProps } = formik;

    const handleShowPassword = () => {
        setShowPassword((show) => !show);
    };

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
                <Stack spacing={3}>
                    <TextField
                        fullWidth
                        autoComplete="username"
                        type="text"
                        label="Tên đăng nhập"
                        {...getFieldProps('username')}
                        error={Boolean(touched.username && errors.username)}
                        helperText={touched.username && errors.username}
                    />

                    <TextField
                        fullWidth
                        autoComplete="current-password"
                        type={showPassword ? 'text' : 'password'}
                        label="Mật khẩu"
                        {...getFieldProps('password')}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleShowPassword} edge="end">
                                        <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                    />
                </Stack>

                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ my: 2 }}
                >
                    <FormControlLabel
                        control={
                            <Checkbox {...getFieldProps('remember')} checked={values.remember} />
                        }
                        label="Ghi nhớ"
                    />

                    <MuiLink component={RouterLink} variant="subtitle2" to="#">
                        Quên mật khẩu?
                    </MuiLink>
                </Stack>

                <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                >
                    Đăng nhập
                </LoadingButton>
                {message && (
                    <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    </div>
                )}
            </Form>
        </FormikProvider>
    );
};

export default LoginForm;
