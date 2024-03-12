import { TextInput, TextInputProps } from "react-native";
import colors from "tailwindcss/colors";

type InputProps = TextInputProps & {
  multLines?: boolean
};

export function Input({multLines, ...rest}: InputProps){
  return <TextInput 
    multiline={multLines? multLines : false}
    textAlignVertical="top"
    placeholderTextColor={colors.slate[400]}
    className={multLines ? "h-32 bg-slate-800 rounded-md px-4 py-3 font-body text-sm text-white" :
              "h-12 bg-slate-800 rounded-md px-4 py-3 font-body text-sm text-white" }
  {...rest} />
}