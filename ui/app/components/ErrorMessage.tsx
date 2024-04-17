'use client'
interface Props{
    text: any;
}
const ErrorMessage:React.FC<Props> = ({text}) => {
    return (
        <button className="btn btn-xs btn-error text-xs text-white ml-auto px-10">{text}</button>
    )
}

export default ErrorMessage