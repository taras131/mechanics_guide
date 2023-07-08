import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import LoadingButton from '@mui/lab/LoadingButton';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {routes} from "../utils/routes";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {fetchLogin, fetchRegister} from "../services/actions/authActionsCreators";
import {getAuthErrorMessage, getIsAuth, getIsAuthLoading} from "../services/selectors/authSelector";
import MessageWindow from "../components/MessageWindow";
import {validateEmail} from "../utils/services";


const Auth = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isAuth = useAppSelector(state => getIsAuth(state))
    const isLoading = useAppSelector(state => getIsAuthLoading(state))
    const errorMessage = useAppSelector(state => getAuthErrorMessage(state))
    const [inputValues, setInputValues] = useState({
        email: "",
        password: ""
    })
    const [validationErrors, setValidationErrors] = useState({
        email: "",
        password: ""
    })
    const {pathname} = useLocation()
    const isRegister = pathname === routes.register
    const [isOpenErrorMessageWindow, setIsOpenErrorMessageWindow] = useState(false)
    const toggleIsOpenErrorMessageWindow = () => {
        setIsOpenErrorMessageWindow(prev => !prev)
    }
    useEffect(() => {
        if (errorMessage) {
            setIsOpenErrorMessageWindow(true)
        }
    }, [errorMessage])
    useEffect(() => {
        if (isAuth) navigate(routes.profile)
    }, [isAuth])
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "email") {
            setValidationErrors({...validationErrors, email: ""})
            if (!validateEmail(e.target.value)) {
                setValidationErrors({...validationErrors, email: "Введён не email"})
            }
        } else {
            setValidationErrors({...validationErrors, password: ""})
            if (e.target.value.length < 6) {
                setValidationErrors({...validationErrors, password: "Пароль должен быть не менее 6 символов"})
            }
        }
        setInputValues({...inputValues, [e.target.name]: e.target.value})
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isRegister) {
            dispatch(fetchRegister(inputValues))
        } else {
            dispatch(fetchLogin(inputValues))
        }
    };
    return (
        <Container component="div" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    {isRegister
                        ? "Регистрация"
                        : "Вход"}

                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        onChange={handleInputChange}
                        value={inputValues.email}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        error={!!validationErrors.email}
                        helperText={validationErrors.email}
                    />
                    <TextField
                        onChange={handleInputChange}
                        value={inputValues.password}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Пароль"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        error={!!validationErrors.password}
                        helperText={validationErrors.password}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                    />
                    <LoadingButton
                        loading={isLoading}
                        loadingIndicator="Загрузка…"
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        disabled={!!validationErrors.email
                        || !!validationErrors.password
                        || inputValues.password.length === 0
                        || inputValues.email.length === 0}
                    >
                        {isRegister
                            ? "Регистрация"
                            : "Войти"}
                    </LoadingButton>
                    <Grid container>
                        <Grid item>
                            {isRegister
                                ? (<Link to={routes.login}>
                                    {"Есть аккаунт? Войти"}
                                </Link>)
                                : (<Link to={routes.register}>
                                    {"Нет аккаунта? Зарегистрироваться"}
                                </Link>)}
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <MessageWindow isOpenModal={isOpenErrorMessageWindow}
                           handleToggleOpen={toggleIsOpenErrorMessageWindow}
                           message={errorMessage}/>
        </Container>
    );
};

export default Auth;