import {useRef, useState} from 'react'
import { Formik } from 'formik'
import {
  ActivityIndicator,
  Platform,
  Image,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import * as Yup from 'yup'
import AsyncStorage from '@react-native-async-storage/async-storage'

//import INTECH from '../../assets/Intech.png'
import INTECH from '@/assets/Intech.png'
import { useAuth } from '@/context/auth_provider/useAuth'
import {
  ButtonPrimaryStyled,
  ButtonPrimaryTextStyled,
  Container,
  ErroStyled,
  InputStyled,
  SubTitle,
  SubTitle2,
  Title,
} from './styles'

interface ILoginInit {
  email?: string,
  password?: string
}

const Login = () => {
  const [authError, setAuthError] = useState<boolean>(false);
  const [authKey, setAuthKey] = useState<number>(0);
  const initialValues: ILoginInit = {};
  const auth = useAuth();
  const ref_input2 = useRef(null);
  

  const schema = Yup.object().shape({
    email: Yup.string().email('Digite um email válido!').required('Campo obrigatório!'),
    password: Yup.string().required('Campo obrigatório!'),
  });

  const onSubmit = async (values: ILoginInit) => {
    if (values.email && values.password) {
      await AsyncStorage.removeItem('idclient');
      try {
        await auth.authenticate(values.email, values.password);
        setAuthError(false);
        setAuthKey((prev) => prev + 1);
      } catch (error) {
        setAuthError(true);
        setAuthKey((prev) => prev + 1);
      }
    }
  };

  if (auth.carregando) {
    return (
      <Container>
        <ActivityIndicator size="small" color="#0a2e46" />
      </Container>
    )
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={150}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container contentContainerStyle={{alignItems: 'center'}}>
          <Image
            source={INTECH}
            style={{
              width: 200,
              height: 200,
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: 100
            }}
          />

          <Title>
            ISmartF
          </Title>

          <SubTitle>
            Versão 1.0.0.1 - 2024
          </SubTitle>

          <SubTitle2>
            @intechSistemas
          </SubTitle2>

          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={(values) => onSubmit(values)}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
            <>
              {authError && authKey > 0 && (
                <ErroStyled>E-mail ou senha inválidos!</ErroStyled>
              )}

              <InputStyled
                placeholder='Informe seu usuário'
                placeholderTextColor='#4F4F4F'
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                returnKeyType = {"next"}
                onSubmitEditing={() => { ref_input2.current?.focus(); }}
                blurOnSubmit={false}
              />
              {errors.email && touched.email && <Text style={{color: 'red'}}>{errors.email}</Text>}

              <InputStyled
                placeholder='Informe sua senha'
                placeholderTextColor='#4F4F4F'
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                ref={ref_input2}
                onSubmitEditing={() => handleSubmit()}
                secureTextEntry
              />
              {errors.password && touched.password && <Text style={{color: 'red'}}>{errors.password}</Text>}

              <ButtonPrimaryStyled
                onPress={() => handleSubmit()}
              >
                <ButtonPrimaryTextStyled>
                  Entrar
                </ButtonPrimaryTextStyled>
              </ButtonPrimaryStyled>
            </>
            )}
          </Formik>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export { Login }
export default Login
