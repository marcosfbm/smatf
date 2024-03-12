import styled from 'styled-components/native'

export const KeyboardView = styled.KeyboardAvoidingView`
  background-color: #111111;
`

export const Container = styled.ScrollView`
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: #111111;
`

export const Title = styled.Text`
  color: #ffffff;
  margin-top: 17px;
  font-size: 18px;
  font-weight: 700;
  line-height: 20px;
  text-align: center;
`

export const SubTitle = styled.Text`
  color: #CECECE;
  margin-top: 10px;
  font-size: 14px;
  font-weight: 700;
  line-height: 15px;
  text-align: center;
`

export const SubTitle2 = styled.Text`
  color: #CECECE;
  margin-top: 10px;
  font-size: 12px;
  font-weight: 700;
  line-height: 13px;
  text-align: center;
`

export const InputStyled = styled.TextInput`
  color: white;
  font-size: 14px;
  line-height: 15px;
  border: 2px solid #4F4F4F;
  border-radius: 12px;
  padding-left: 16px;
  height: 60px;
  width: 300px;
  box-sizing: border-box;
  margin-top: 16px;
`

export const ButtonPrimaryStyled = styled.TouchableOpacity`
  width: 300px;
  height: 60px;
  background-color: #FFFFFF;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
`

export const ButtonPrimaryTextStyled = styled.Text`
    color: #333333;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 20px;
`

export const ErroStyled = styled.Text`
  color: red;
  margin-top: 17px;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  text-align: center;
`