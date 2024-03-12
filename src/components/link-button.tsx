import { Link, LinkProps } from "expo-router";

type LinkButtonProps = LinkProps<String> & {
  title: string
}

export function LinkButton({title, ...rest}: LinkButtonProps){
  return (
    <Link className="text-slate-300 text-center text-base font-body" {...rest}>
      {title}
    </Link>
  )
}