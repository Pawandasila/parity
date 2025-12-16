export const getEnvLockTemplate = ({
  runtime,
  version,
  os,
}: {
  runtime: string;
  version: string;
  os: string;
}) => `runtime:
  name: ${runtime}
  version: ${version}

os: ${os}

env:
  APP_NAME: required
  DEBUG: optional
`;
