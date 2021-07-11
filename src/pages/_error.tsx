function Error(props: any) {
  return (
    <p>
      {props.statusCode
        ? `An error ${props.statusCode} occurred on server`
        : "An error occurred on client"}
    </p>
  );
}

Error.getInitialProps = (props: any) => {
  const statusCode = props.res
    ? props.res.statusCode
    : props.err
    ? props.err.statusCode
    : 404;
  return { statusCode };
};

export default Error;
