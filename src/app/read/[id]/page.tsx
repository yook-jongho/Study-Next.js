type ReadProps = {
    params: {
        id: string;
    };
};

export default function Read(props: ReadProps) {
    return (
        <>
            <h1>Read {props.params.id}</h1>
        </>
    );
}
