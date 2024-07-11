const actionNameCreator = (namespace: string) => (name: string) =>
  `${namespace}/${name}`;

export default actionNameCreator;
