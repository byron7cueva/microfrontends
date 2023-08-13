export type MessageProps = {
    name: string;
}

export default function Message({name}: MessageProps): JSX.Element {
    return <p>Hola {name} bienvenido </p>
}