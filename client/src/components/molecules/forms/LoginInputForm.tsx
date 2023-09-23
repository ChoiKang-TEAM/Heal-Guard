import React, { useState } from 'react'
import * as yup from 'yup'

import { User } from 'src/types/interface/user/userInterface'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Box,
  Button,
  Container,
  Grid,
  Input,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import ValidationInput from 'src/components/atoms/inputs/ValidationInput'

const LoginInputForm = () => {
  const [fields, setFields] = useState<User>({
    userId: '',
    password: '',
  })

  const schema = yup.object().shape({
    userId: yup
      .string()
      .email('이메일 형식으로 입력해주세요.')
      .required('아이디를 입력해주세요.'),
    password: yup.string().required('비밀번호를 입력해주세요.'),
  })

  return <ValidationInput schema={schema} name={'userId'} />
}

export default LoginInputForm
